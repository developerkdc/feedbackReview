import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import Swal from "sweetalert2";
import axios from "axios";
import CustomTable from "../components/mui/Table";

export default function Customer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [mallReviewDetails, setMallReviewDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState({});
  const [mallList, setMallList] = useState([]);
  const [selectedMall, setSelectedMall] = useState(null);

  const columns = [
    {
      field: "user.name",
      headerName: "User Name",
      sortable: true,
      render: (_, elm) => elm.user.name,
    },
    {
      field: "mall.name",
      headerName: "Mall Name",
      sortable: true,
      render: (_, elm) => elm.mall.name,
    },
    {
      field: "ratingAvg",
      headerName: "Avg. Rating",
      sortable: true,
      render: (_, elm) => `${elm.ratingAvg} / 5`,
    },
    {
      field: "user.email",
      headerName: "Email Id",
      sortable: true,
      render: (_, elm) => elm.user.email,
    },
    {
      field: "user.gender",
      headerName: "Gender",
      sortable: true,
      render: (_, elm) => elm.user.gender,
    },
    {
      field: "user.profession",
      headerName: "Profession",
      sortable: true,
      render: (_, elm) => elm.user.profession,
    },
    {
      field: "user.dob",
      headerName: "DOB",
      sortable: true,
      render: (_, elm) => {
        const date = new Date(elm.user.dob);
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          // hour12: true,
          timeZone: "Asia/Kolkata", // Indian time zone
        };

        const indianDateTime = date.toLocaleString("en-IN", options);
        return indianDateTime;
      },
    },
    {
      field: "user.contact",
      headerName: "Mobile",
      sortable: true,
      render: (_, elm) => elm.user.contact,
    },
    {
      field: "user.city",
      headerName: "City",
      sortable: true,
      render: (_, elm) => elm.user.city,
    },
    {
      field: "created_at",
      headerName: "Date/Time",
      sortable: true,
      render: (_, elm) => {
        const date = new Date(elm.created_at);
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata", // Indian time zone
        };

        const indianDateTime = date.toLocaleString("en-IN", options);
        return indianDateTime;
      },
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        navigate("/customer/review", { state: { allData: row } });
      },
      icon: <PreviewOutlinedIcon />,
    },
  ];
  const fetchData = (props) => {
    setQuery({ ...query, ...props });
  };
  const handleFilter = () => {
    setQuery({ ...query, mall_id: selectedMall._id });
  };
  const handleClearFilter = () => {
    setSelectedMall(null);
    setQuery({ ...query, mall_id: "" });
  };

  useEffect(() => {
    // console.log("object");
    (async () => {
      try {
        let data = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
        // console.log(data?.data?.data);
        setMallList(data?.data?.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      let apiUrl = `https://feedbackreviewbackend.onrender.com/RatingAndReviews/user`;
      if (query) {
        const queryParams = new URLSearchParams(query);
        apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
      }
      try {
        let data = await axios.get(apiUrl);
        // console.log(data.data.RatingAndReviews);
        setMallReviewDetails(data?.data?.RatingAndReviews);
        setTotalPage(data?.data?.totalPages);
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
        <Typography variant="h1">Customer</Typography>
        <Div sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Div sx={{ width: "20%" }}>
            <Autocomplete
              size="small"
              id="tags-standard"
              options={mallList}
              getOptionLabel={(option) => option.mall_name}
              value={selectedMall}
              onChange={(e, newValue) => {
                setSelectedMall(newValue);
                setQuery({ ...query, page: 0 });
              }}
              renderInput={(params) => <TextField {...params} label="Malls" />}
            />

            <Div sx={{ display: "flex", gap: 1, flex: "1" }}>
              <Button size="small" variant="outlined" sx={{ mt: 1, height: "35px" }} onClick={handleFilter}>
                Apply
              </Button>

              <Button size="small" variant="outlined" sx={{ mt: 1, height: "35px" }} onClick={handleClearFilter}>
                Clear
              </Button>
            </Div>
          </Div>
        </Div>
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
        </Div>
      </Div>
      <Div>
        <CustomTable
          data={mallReviewDetails}
          setPage={setPage}
          page={page}
          columns={columns}
          actions={actions}
          fetchData={fetchData}
          totalCount={totalPage || 0}
        />
      </Div>
    </Div>
  );
}
