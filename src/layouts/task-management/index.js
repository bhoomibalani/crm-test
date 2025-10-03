/**
 * RD & Company CRM - Daily Task Management Layout
 */

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Context
import { useAuth } from "contexts/AuthContext";

// Data
import { taskTableData } from "./data";

const TASK_STATUS = {
  PENDING: "pending",
  DONE: "done",
  COMPLETED: "completed"
};

const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent"
};

function TaskManagement() {
  const { user, hasPermission } = useAuth();
  const [menu, setMenu] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenDialog = (task = null) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updated_date: new Date().toISOString() }
          : task
      )
    );
  };

  useEffect(() => {
    // Mock data - replace with actual API call
    setTasks(taskTableData.rows);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assigned_to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case TASK_STATUS.COMPLETED: return "success";
      case TASK_STATUS.DONE: return "info";
      case TASK_STATUS.PENDING: return "warning";
      default: return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case TASK_PRIORITY.URGENT: return "error";
      case TASK_PRIORITY.HIGH: return "warning";
      case TASK_PRIORITY.MEDIUM: return "info";
      case TASK_PRIORITY.LOW: return "success";
      default: return "default";
    }
  };

  const columns = [
    { Header: "Title", accessor: "title", width: "25%" },
    { Header: "Description", accessor: "description", width: "30%" },
    { Header: "Assigned To", accessor: "assigned_to", width: "15%" },
    { Header: "Priority", accessor: "priority", width: "10%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Due Date", accessor: "due_date", width: "10%" },
  ];

  const rows = filteredTasks.map(task => ({
    title: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {task.title}
      </MDTypography>
    ),
    description: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {task.description.length > 50 
          ? `${task.description.substring(0, 50)}...` 
          : task.description
        }
      </MDTypography>
    ),
    assigned_to: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {task.assigned_to}
      </MDTypography>
    ),
    priority: (
      <Chip
        label={task.priority.toUpperCase()}
        color={getPriorityColor(task.priority)}
        size="small"
      />
    ),
    status: (
      <Box display="flex" alignItems="center" gap={1}>
        <Chip
          label={task.status.toUpperCase()}
          color={getStatusColor(task.status)}
          size="small"
        />
        {task.status === TASK_STATUS.PENDING && (
          <MDButton
            size="small"
            color="success"
            onClick={() => handleStatusChange(task.id, TASK_STATUS.DONE)}
          >
            <Icon>check</Icon>
          </MDButton>
        )}
        {task.status === TASK_STATUS.DONE && (
          <MDButton
            size="small"
            color="info"
            onClick={() => handleStatusChange(task.id, TASK_STATUS.COMPLETED)}
          >
            <Icon>done_all</Icon>
          </MDButton>
        )}
      </Box>
    ),
    due_date: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {new Date(task.due_date).toLocaleDateString()}
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Daily Task Management
                </MDTypography>
                {hasPermission("manage_tasks") && (
                  <MDButton 
                    variant="gradient" 
                    color="info" 
                    size="small"
                    onClick={() => handleOpenDialog()}
                  >
                    <Icon>add</Icon>&nbsp;New Task
                  </MDButton>
                )}
              </MDBox>
              
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={4}>
                  <MDInput
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status Filter"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value={TASK_STATUS.PENDING}>Pending</MenuItem>
                      <MenuItem value={TASK_STATUS.DONE}>Done</MenuItem>
                      <MenuItem value={TASK_STATUS.COMPLETED}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Priority Filter</InputLabel>
                    <Select
                      value={priorityFilter}
                      label="Priority Filter"
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Priority</MenuItem>
                      <MenuItem value={TASK_PRIORITY.URGENT}>Urgent</MenuItem>
                      <MenuItem value={TASK_PRIORITY.HIGH}>High</MenuItem>
                      <MenuItem value={TASK_PRIORITY.MEDIUM}>Medium</MenuItem>
                      <MenuItem value={TASK_PRIORITY.LOW}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>

        <Card>
          <MDBox pt={3} px={3}>
            <MDTypography variant="h6" fontWeight="medium">
              Tasks List
            </MDTypography>
          </MDBox>
          <MDBox pt={1} pb={2} px={3}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </MDBox>

      {/* Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTask ? "Edit Task" : "Create New Task"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <MDInput
                fullWidth
                label="Task Title"
                value={selectedTask?.title || ""}
                placeholder="Enter task title..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={selectedTask?.priority || TASK_PRIORITY.MEDIUM}
                  label="Priority"
                >
                  <MenuItem value={TASK_PRIORITY.LOW}>Low</MenuItem>
                  <MenuItem value={TASK_PRIORITY.MEDIUM}>Medium</MenuItem>
                  <MenuItem value={TASK_PRIORITY.HIGH}>High</MenuItem>
                  <MenuItem value={TASK_PRIORITY.URGENT}>Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  value={selectedTask?.assigned_to_id || ""}
                  label="Assigned To"
                >
                  <MenuItem value="1">John Sales</MenuItem>
                  <MenuItem value="2">Sarah Office</MenuItem>
                  <MenuItem value="3">Mike Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedTask?.status || TASK_STATUS.PENDING}
                  label="Status"
                >
                  <MenuItem value={TASK_STATUS.PENDING}>Pending</MenuItem>
                  <MenuItem value={TASK_STATUS.DONE}>Done</MenuItem>
                  <MenuItem value={TASK_STATUS.COMPLETED}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={selectedTask?.description || ""}
                placeholder="Enter task description..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput
                fullWidth
                type="date"
                label="Due Date"
                value={selectedTask?.due_date || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleCloseDialog} color="info">
            {selectedTask ? "Update" : "Create"}
          </MDButton>
        </DialogActions>
      </Dialog>

      <Menu
        id="simple-menu"
        anchorEl={menu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>View Details</MenuItem>
        <MenuItem onClick={closeMenu}>Edit</MenuItem>
        <MenuItem onClick={closeMenu}>Delete</MenuItem>
      </Menu>
      <Footer />
    </DashboardLayout>
  );
}

export default TaskManagement;
