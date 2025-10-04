/**
 * RD & Company CRM - Sales Person Reporting Layout
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
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
import { salesReportTableData } from "./data";

function SalesReporting() {
  const { user, hasPermission } = useAuth();
  const [menu, setMenu] = useState(null);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenDialog = (report = null) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
    setSelectedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReport = () => {
    // Handle report submission
    console.log("Submitting report:", selectedReport);
    handleCloseDialog();
  };

  useEffect(() => {
    // Mock data - replace with actual API call
    setReports(salesReportTableData.rows);
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.remarks.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !dateFilter || report.visit_date === dateFilter;
    const matchesClient = clientFilter === "all" || report.client_id.toString() === clientFilter;

    return matchesSearch && matchesDate && matchesClient;
  });

  const columns = [
    { Header: "Date", accessor: "visit_date", width: "15%" },
    { Header: "Client", accessor: "client_name", width: "20%" },
    { Header: "New Order", accessor: "new_order", width: "15%" },
    { Header: "Order Value", accessor: "order_value", width: "15%" },
    { Header: "Visit Photo", accessor: "visit_photo", width: "15%" },
    { Header: "Remarks", accessor: "remarks", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "5%", disableSortBy: true },
  ];

  const rows = filteredReports.map((report) => ({
    visit_date: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {new Date(report.visit_date).toLocaleDateString()}
      </MDTypography>
    ),
    client_name: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {report.client_name}
      </MDTypography>
    ),
    new_order: (
      <MDBox ml={-1}>
        <MDBox
          component="span"
          variant="caption"
          color={report.new_order ? "success" : "text"}
          fontWeight="medium"
        >
          {report.new_order ? "Yes" : "No"}
        </MDBox>
      </MDBox>
    ),
    order_value: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        ${report.order_value?.toLocaleString() || "-"}
      </MDTypography>
    ),
    visit_photo: (
      <Box display="flex" alignItems="center">
        {report.visit_photo ? (
          <Avatar
            src={report.visit_photo}
            alt="Visit Photo"
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={() => window.open(report.visit_photo, "_blank")}
          />
        ) : (
          <MDTypography variant="caption" color="text">
            No Photo
          </MDTypography>
        )}
      </Box>
    ),
    remarks: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {report.remarks.length > 30 ? `${report.remarks.substring(0, 30)}...` : report.remarks}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDButton variant="text" color="dark" size="small" onClick={() => handleOpenDialog(report)}>
          <Icon>edit</Icon>
        </MDButton>
        <MDButton variant="text" color="error" size="small">
          <Icon>delete</Icon>
        </MDButton>
      </MDBox>
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
                  Sales Person Reporting
                </MDTypography>
                {hasPermission("manage_reports") && (
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={() => handleOpenDialog()}
                  >
                    <Icon>add</Icon>&nbsp;New Report
                  </MDButton>
                )}
              </MDBox>

              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={4}>
                  <MDInput
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <MDInput
                    type="date"
                    label="Date Filter"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Client Filter</InputLabel>
                    <Select
                      value={clientFilter}
                      label="Client Filter"
                      onChange={(e) => setClientFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Clients</MenuItem>
                      <MenuItem value="1">Client ABC</MenuItem>
                      <MenuItem value="2">Client XYZ</MenuItem>
                      <MenuItem value="3">Client DEF</MenuItem>
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
              Sales Reports
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

      {/* Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedReport ? "Edit Sales Report" : "Create New Sales Report"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <MDInput
                fullWidth
                type="date"
                label="Visit Date"
                value={selectedReport?.visit_date || ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Visited Client</InputLabel>
                <Select value={selectedReport?.client_id || ""} label="Visited Client">
                  <MenuItem value="1">Client ABC</MenuItem>
                  <MenuItem value="2">Client XYZ</MenuItem>
                  <MenuItem value="3">Client DEF</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>New Order</InputLabel>
                <Select value={selectedReport?.new_order ? "yes" : "no"} label="New Order">
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput
                fullWidth
                label="Order Value ($)"
                type="number"
                value={selectedReport?.order_value || ""}
                placeholder="Enter order value"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="Remarks"
                multiline
                rows={3}
                value={selectedReport?.remarks || ""}
                placeholder="Enter visit remarks and details..."
              />
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="body2" color="text" mb={1}>
                Visit Photo
              </MDTypography>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="visit-photo-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="visit-photo-upload">
                <Button variant="outlined" component="span" fullWidth>
                  <Icon>camera_alt</Icon>&nbsp;Upload Visit Photo
                </Button>
              </label>
              {selectedImage && (
                <Box mt={2}>
                  <Avatar
                    src={selectedImage}
                    alt="Visit Photo Preview"
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleSubmitReport} color="info">
            {selectedReport ? "Update" : "Submit"}
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

export default SalesReporting;
