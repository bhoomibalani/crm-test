/**
 * RD & Company CRM - Attendance Management Data
 */

export const attendanceTableData = {
  columns: [
    { Header: "Employee", accessor: "user_name", width: "20%" },
    { Header: "Date", accessor: "date", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Check In", accessor: "check_in", width: "15%" },
    { Header: "Check Out", accessor: "check_out", width: "15%" },
    { Header: "Hours", accessor: "hours_worked", width: "10%" },
    { Header: "Actions", accessor: "actions", width: "10%", disableSortBy: true },
  ],

  rows: [
    {
      id: 1,
      user_id: 2,
      user_name: "John Sales",
      date: "2024-01-15",
      status: "present",
      check_in: "2024-01-15T09:00:00Z",
      check_out: "2024-01-15T18:00:00Z",
      hours_worked: 9.0,
      remarks: ""
    },
    {
      id: 2,
      user_id: 3,
      user_name: "Sarah Office",
      date: "2024-01-15",
      status: "present",
      check_in: "2024-01-15T08:30:00Z",
      check_out: "2024-01-15T17:30:00Z",
      hours_worked: 9.0,
      remarks: ""
    },
    {
      id: 3,
      user_id: 5,
      user_name: "Mike Sales",
      date: "2024-01-15",
      status: "late",
      check_in: "2024-01-15T10:15:00Z",
      check_out: "2024-01-15T19:15:00Z",
      hours_worked: 9.0,
      remarks: "Traffic jam on the way"
    },
    {
      id: 4,
      user_id: 2,
      user_name: "John Sales",
      date: "2024-01-14",
      status: "present",
      check_in: "2024-01-14T09:00:00Z",
      check_out: "2024-01-14T18:00:00Z",
      hours_worked: 9.0,
      remarks: ""
    },
    {
      id: 5,
      user_id: 3,
      user_name: "Sarah Office",
      date: "2024-01-14",
      status: "half_day",
      check_in: "2024-01-14T09:00:00Z",
      check_out: "2024-01-14T13:00:00Z",
      hours_worked: 4.0,
      remarks: "Personal appointment"
    },
    {
      id: 6,
      user_id: 5,
      user_name: "Mike Sales",
      date: "2024-01-14",
      status: "absent",
      check_in: null,
      check_out: null,
      hours_worked: 0,
      remarks: "Sick leave"
    },
    {
      id: 7,
      user_id: 2,
      user_name: "John Sales",
      date: "2024-01-13",
      status: "present",
      check_in: "2024-01-13T09:00:00Z",
      check_out: "2024-01-13T18:00:00Z",
      hours_worked: 9.0,
      remarks: ""
    },
    {
      id: 8,
      user_id: 3,
      user_name: "Sarah Office",
      date: "2024-01-13",
      status: "present",
      check_in: "2024-01-13T08:30:00Z",
      check_out: "2024-01-13T17:30:00Z",
      hours_worked: 9.0,
      remarks: ""
    },
    {
      id: 9,
      user_id: 5,
      user_name: "Mike Sales",
      date: "2024-01-13",
      status: "present",
      check_in: "2024-01-13T09:00:00Z",
      check_out: "2024-01-13T18:00:00Z",
      hours_worked: 9.0,
      remarks: ""
    }
  ]
};
