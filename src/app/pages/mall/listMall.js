import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import axios from "axios";
import CustomTable from "../components/mui/Table";
import ViewUser from "./ViewUser";
import Swal from "sweetalert2";
import ToastAlerts from "../components/Toast";

export default function ListMall() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  const [openView, setOpenView] = useState(false);
  const [singleMallDetails, setSingleMallDetails] = useState({});
  const [mallDetails, setMallDetails] = useState({});
  const [query, setQuery] = useState({});

  const columns = [
    { field: "mall_name", headerName: "Mall Name", sortable: true },
    { field: "location", headerName: "Location", sortable: true },
    {
      field: "first_name",
      headerName: "User Name",
      sortable: true,
      render: (_, elm) => elm.first_name + " " + elm.last_name,
    },
    { field: "email_id", headerName: "Email Id", sortable: true },
    { field: "mobile_no", headerName: "Mobile", sortable: true },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      render: (value, elm) =>
        value ? (
          <Button size="small" variant="outlined" color="success">
            Active
          </Button>
        ) : (
          <Button size="small" variant="outlined" color="error">
            Inactive
          </Button>
        ),
      onClick: async (elm) => {
        try {
          let status = elm.status;
          const result = await Swal.fire({
            title: `Change user status to ${status ? "inactive" : "active"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (result.isConfirmed) {
            await axios.patch(`${process.env.REACT_APP_URL}/mall/${elm._id}`, { status: !status });
            showAlert("success", "User status updated successfully.");
            navigate("/mall");
            setQuery({ ...query, search: searchTerm });
            // dispatch(onUserList(query));
          }
        } catch (error) {
          console.error("Error updating user:", error);
          showAlert("error", "Failed to update user.");
        }
      },
    },
    // {
    //   field: "role_id",
    //   headerName: "Role",
    //   render: (value, elm) => value.role_name,
    // },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setSingleMallDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    {
      label: "Edit",
      color: "secondary",
      onClick: (row) => navigate(`/mall-edit/${row._id}`, { state: row }),
      icon: <ModeEditOutlinedIcon />,
    },
    //   {
    //     label: "Change Password",
    //     color: "primary",
    //     onClick: (row) => navigate(`/user/change-password/${row._id}`),
    //     icon: <LockResetOutlinedIcon />,
    //   },
  ];
  const fetchData = (props) => {
    setQuery({ ...query, ...props });
  };

  //   const handleFilter = () => {
  //     setQuery({ ...query, role: selectedRole._id });
  //   };
  //   const handleClearFilter = () => {
  //     setSelectedRole(null);
  //     setQuery({ ...query, role: "" });
  //   };

  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      let apiUrl = `${process.env.REACT_APP_URL}/mall`;
      if (query) {
        const queryParams = new URLSearchParams(query);
        apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
      }
      try {
        let data = await axios.get(apiUrl);
        console.log(data.data.data);
        setMallDetails(data?.data);
      } catch (error) {}
    })();
  }, [query]);

  return (
    <Div
      sx={{
        mt: -4,
        // maxHeight: "89vh",
        // overflowY: "scroll",
        paddingRight: "10px",
      }}
    >
      <Div
        sx={{
          position: "sticky",
          top: 0,
          background: "#F5F7FA",
          zIndex: 10,
        }}
      >
        <Typography variant="h1">Mall Master</Typography>
        <Div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            label="Search"
            value={searchTerm}
            size="small"
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            sx={{ width: 300, mb: 5, mt: 4 }}
            InputProps={{
              endAdornment: (
                <Div sx={{ cursor: "pointer" }}>
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                </Div>
              ),
            }}
          />
          <Div>
            <Button size="small" variant="contained" sx={{ p: 1, pl: 4, pr: 4 }} onClick={() => navigate("/mall-add")}>
              Add Mall
            </Button>
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={mallDetails.data}
          columns={columns}
          setPage={setPage}
          page={page}
          actions={actions}
          fetchData={fetchData}
          totalCount={mallDetails.totalPages || 0}
        />
      </Div>
      {openView && singleMallDetails && <ViewUser openView={openView} setOpenView={setOpenView} data={singleMallDetails} />}
    </Div>
  );
}
