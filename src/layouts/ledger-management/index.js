/**
 * RD & Company CRM - Ledger Request Management Layout
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
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

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
import { ledgerTableData } from "./data";

const LEDGER_STATUS = {
  PENDING: "pending",
  UPLOADED: "uploaded",
  CONFIRMED: "confirmed",
};

function LedgerManagement() {
  const { user, hasPermission } = useAuth();
  const [menu, setMenu] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleOpenUploadDialog = (ledger = null) => {
    setSelectedLedger(ledger);
    setOpenUploadDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
    setSelectedLedger(null);
    setUploadProgress(0);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  useEffect(() => {
    // Mock data - replace with actual API call
    setLedgers(ledgerTableData.rows);
  }, []);

  const filteredLedgers = ledgers.filter((ledger) => {
    const matchesSearch =
      ledger.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ledger.request_details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || ledger.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    { Header: "Request ID", accessor: "request_id", width: "15%" },
    { Header: "Client Name", accessor: "client_name", width: "20%" },
    { Header: "Request Details", accessor: "request_details", width: "25%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Request Date", accessor: "request_date", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "10%", disableSortBy: true },
  ];

  const rows = filteredLedgers.map((ledger) => ({
    request_id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        #{ledger.request_id}
      </MDTypography>
    ),
    client_name: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {ledger.client_name}
      </MDTypography>
    ),
    request_details: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {ledger.request_details.length > 50
          ? `${ledger.request_details.substring(0, 50)}...`
          : ledger.request_details
        }
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBox
          component="span"
          variant="caption"
          color={
            ledger.status === LEDGER_STATUS.CONFIRMED
              ? "success"
              : ledger.status === LEDGER_STATUS.UPLOADED
              ? "info"
              : "warning"
          }
          fontWeight="medium"
        >
          {ledger.status.toUpperCase()}
        </MDBox>
      </MDBox>
    ),
    request_date: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {new Date(ledger.request_date).toLocaleDateString()}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        {ledger.status === LEDGER_STATUS.PENDING && hasPermission("upload_ledgers") && (
          <MDButton
            variant="text"
            color="info"
            size="small"
            onClick={() => handleOpenUploadDialog(ledger)}
          >
            <Icon>upload</Icon>
          </MDButton>
        )}
        {ledger.status === LEDGER_STATUS.UPLOADED && (
          <MDButton
            variant="text"
            color="success"
            size="small"
            onClick={() => {
              /* Handle confirm */
            }}
          >
            <Icon>check</Icon>
          </MDButton>
        )}
        {ledger.status === LEDGER_STATUS.CONFIRMED && (
          <MDButton
            variant="text"
            color="primary"
            size="small"
            onClick={() => {
              /* Handle download */
            }}
          >
            <Icon>download</Icon>
          </MDButton>
        )}
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
                  Ledger Request Management
                </MDTypography>
                {hasPermission("request_ledgers") && (
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={handleOpenRequestDialog}
                  >
                    <Icon>add</Icon>&nbsp;Request Ledger
                  </MDButton>
                )}
              </MDBox>

              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={8}>
                  <MDInput
                    type="text"
                    placeholder="Search ledger requests..."
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
                      <MenuItem value={LEDGER_STATUS.PENDING}>Pending</MenuItem>
                      <MenuItem value={LEDGER_STATUS.UPLOADED}>Uploaded</MenuItem>
                      <MenuItem value={LEDGER_STATUS.CONFIRMED}>Confirmed</MenuItem>
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
              Ledger Requests List
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

      {/* Request Ledger Dialog */}
      <Dialog open={openRequestDialog} onClose={handleCloseRequestDialog} maxWidth="md" fullWidth>
        <DialogTitle>Request New Ledger</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="Request Details"
                multiline
                rows={4}
                placeholder="Describe what ledger information you need..."
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                fullWidth
                label="Additional Notes"
                multiline
                rows={2}
                placeholder="Any additional information or special requirements..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseRequestDialog} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleCloseRequestDialog} color="info">
            Submit Request
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Upload Ledger Dialog */}
      <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Ledger</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <MDTypography variant="body2" color="text" mb={2}>
                Upload ledger for: {selectedLedger?.client_name}
              </MDTypography>
              <input
                accept=".pdf,.xlsx,.xls,.csv"
                style={{ display: "none" }}
                id="ledger-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="ledger-upload">
                <Button variant="outlined" component="span" fullWidth>
                  <Icon>cloud_upload</Icon>&nbsp;Choose File
                </Button>
              </label>
              {uploadProgress > 0 && (
                <MDBox mt={2}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <MDTypography variant="caption" color="text">
                    Uploading... {uploadProgress}%
                  </MDTypography>
                </MDBox>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseUploadDialog} color="secondary">
            Cancel
          </MDButton>
          <MDButton onClick={handleCloseUploadDialog} color="info" disabled={uploadProgress < 100}>
            Upload
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
        <MenuItem onClick={closeMenu}>Download</MenuItem>
        <MenuItem onClick={closeMenu}>Delete</MenuItem>
      </Menu>
      <Footer />
    </DashboardLayout>
  );
}

export default LedgerManagement;
