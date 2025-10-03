/**
 * RD & Company CRM - Ledger Management Data
 */

export const ledgerTableData = {
  columns: [
    { Header: "Request ID", accessor: "request_id", width: "15%" },
    { Header: "Client Name", accessor: "client_name", width: "20%" },
    { Header: "Request Details", accessor: "request_details", width: "25%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Request Date", accessor: "request_date", width: "15%" },
    { Header: "Actions", accessor: "actions", width: "10%", disableSortBy: true },
  ],

  rows: [
    {
      id: 1,
      request_id: "LED-001",
      client_id: 1,
      client_name: "Client ABC",
      request_details: "Monthly ledger statement for January 2024 with detailed transaction breakdown",
      status: "pending",
      request_date: "2024-01-15",
      requested_by: 4,
      uploaded_date: null,
      uploaded_by: null,
      file_path: null
    },
    {
      id: 2,
      request_id: "LED-002",
      client_id: 2,
      client_name: "Client XYZ",
      request_details: "Quarterly ledger summary Q4 2023",
      status: "uploaded",
      request_date: "2024-01-10",
      requested_by: 6,
      uploaded_date: "2024-01-12",
      uploaded_by: 1,
      file_path: "/ledgers/led-002-q4-2023.pdf"
    },
    {
      id: 3,
      request_id: "LED-003",
      client_id: 3,
      client_name: "Client DEF",
      request_details: "Annual ledger statement 2023 with tax calculations",
      status: "confirmed",
      request_date: "2024-01-05",
      requested_by: 4,
      uploaded_date: "2024-01-08",
      uploaded_by: 1,
      file_path: "/ledgers/led-003-annual-2023.pdf"
    },
    {
      id: 4,
      request_id: "LED-004",
      client_id: 1,
      client_name: "Client ABC",
      request_details: "Custom ledger report for specific product line",
      status: "pending",
      request_date: "2024-01-14",
      requested_by: 4,
      uploaded_date: null,
      uploaded_by: null,
      file_path: null
    },
    {
      id: 5,
      request_id: "LED-005",
      client_id: 2,
      client_name: "Client XYZ",
      request_details: "Weekly ledger update for current transactions",
      status: "uploaded",
      request_date: "2024-01-13",
      requested_by: 6,
      uploaded_date: "2024-01-14",
      uploaded_by: 1,
      file_path: "/ledgers/led-005-weekly-update.pdf"
    }
  ]
};
