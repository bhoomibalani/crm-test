/**
 * RD & Company CRM - User Management Layout
 */

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

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

// Data
import { userTableData } from "./data";

function UserManagement() {
  const [menu, setMenu] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    setUsers(userTableData.rows);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { Header: "Name", accessor: "name", width: "25%" },
    { Header: "Email", accessor: "email", width: "30%" },
    { Header: "Role", accessor: "role", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "15%", disableSortBy: true },
  ];

  const rows = filteredUsers.map((user) => ({
    name: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {user.name}
      </MDTypography>
    ),
    email: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {user.email}
      </MDTypography>
    ),
    role: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {user.role.replace("_", " ").toUpperCase()}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBox
          component="span"
          variant="caption"
          color={user.status === "active" ? "success" : "error"}
          fontWeight="medium"
        >
          {user.status}
        </MDBox>
      </MDBox>
    ),
    actions: (
      <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <MDBox mr={1}>
          <MDButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
        </MDBox>
        <MDButton variant="text" color="dark" onClick={openMenu}>
          <Icon>more_vert</Icon>
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
                  User Management
                </MDTypography>
                <MDButton variant="gradient" color="info" size="small">
                  <Icon>add</Icon>&nbsp;Add User
                </MDButton>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>

        <Card>
          <MDBox pt={3} px={3}>
            <MDTypography variant="h6" fontWeight="medium">
              Users List
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
        <MenuItem onClick={closeMenu}>Action</MenuItem>
        <MenuItem onClick={closeMenu}>Another action</MenuItem>
        <MenuItem onClick={closeMenu}>Something else</MenuItem>
      </Menu>
      <Footer />
    </DashboardLayout>
  );
}

export default UserManagement;
