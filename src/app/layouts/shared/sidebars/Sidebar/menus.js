import React from "react";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ScreenLockRotationIcon from "@mui/icons-material/ScreenLockRotation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RunningWithErrorsOutlinedIcon from "@mui/icons-material/RunningWithErrorsOutlined";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import ListIcon from "@mui/icons-material/List";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GridViewIcon from "@mui/icons-material/GridView";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";

const menus = [
  {
    label: "sidebar.menu.home",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/",
    // children: [
    //   {
    //     uri: "/dashboards/misc",
    //     label: "sidebar.menuItem.misc",
    //     type: "nav-item",
    //     icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    //   },
    // ],
  },

  {
    label: "Questions",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/questions",
    // children: [
    //   {
    //     uri: "/grid-views/projects",
    //     label: "sidebar.menuItem.projects",
    //     type: "nav-item",
    //     icon: <GridViewIcon sx={{ fontSize: 20 }} />,
    //   },
    //   {
    //     uri: "/grid-views/users",
    //     label: "sidebar.menuItem.users",
    //     type: "nav-item",
    //     icon: <Grid3x3OutlinedIcon sx={{ fontSize: 20 }} />,
    //   },
    // ],
  },
  {
    label: "Mapped Questions",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/feedback",
  },
  {
    label: "Metrics",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/metric",
  },
  {
    label: "Survey",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/survey",
  },
  {
    label: "Review",
    type: "nav-item",
    icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
    uri: "/review",
  },
];

export default menus;
