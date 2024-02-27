import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
// import ViewUser from "../ViewUser";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import Swal from "sweetalert2";
import axios from "axios";
import CustomTable from "../components/mui/Table";

export default function Customer() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [mallReviewDetails, setMallReviewDetails] = useState([]);
    const [query, setQuery] = useState({});

    const columns = [
        {
            field: "user.name",
            headerName: "User Name",
            sortable: true,
            render: (_, elm) => elm.user.name,
        },
        { field: "mall_name", headerName: "Mall Name", sortable: true, render: (_, elm) => elm.mall.name, },
        { field: "email_id", headerName: "Email Id", sortable: true, render: (_, elm) => elm.user.email, },
        { field: "mobile_no", headerName: "Mobile", sortable: true, render: (_, elm) => elm.user.contact, },
        { field: "city", headerName: "City", sortable: true, render: (_, elm) => elm.user.city, },
    ];

    const actions = [
        {
            label: "View Details",
            color: "secondary",
            onClick: (row) => {
                navigate("/customer/review", { state: { reviews: row?.questionAndAnswer } })
            },
            icon: <PreviewOutlinedIcon />,
        },
    ];
    const fetchData = (props) => {
        setQuery({ ...query, ...props });
    };

    useEffect(() => {
        setQuery({ ...query, search: searchTerm });
    }, [searchTerm]);

    useEffect(() => {
        (async () => {
            let apiUrl = `${process.env.REACT_APP_URL}/RatingAndReviews/user`;
            if (query) {
                const queryParams = new URLSearchParams(query);
                apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
            }
            try {
                let data = await axios.get(apiUrl);
                console.log(data.data.RatingAndReviews);
                setMallReviewDetails(data?.data?.RatingAndReviews);
            } catch (error) { }
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
                <CustomTable data={mallReviewDetails} columns={columns} actions={actions} fetchData={fetchData} totalCount={10} />
            </Div>
        </Div>
    );
}
