import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  ListItemIcon,
  Divider,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import classes from "./Header.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMutation, useQuery } from "react-query";
import { queryKeys } from "../../constants";
import moment from "moment";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = ({ handleSidebarOpen = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const navigate = useNavigate();



  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/");
  };

  return (
    <div className={classes.headerContainer}>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <MenuIcon sx={{ cursor: "pointer" }} onClick={handleSidebarOpen} />
        
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <IconButton>
          <Badge
            badgeContent={ 0}
            color="error"
          >
          </Badge>
        </IconButton>
        <AccountCircleIcon  sx={{
            color: "var(--text-color)",
            cursor: "pointer",
            height:"40px",
            width:"40px"
          }}
            onClick={handleLogout}/>
      </Box>
    </div>
  );
};

export default Header;
