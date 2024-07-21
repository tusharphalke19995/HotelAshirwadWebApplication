import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../src/assets/ashootel.jpeg";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BedIcon from "@mui/icons-material/Bed";
import classNames from "classnames";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const listButtonStyle = {
  minWidth: "26px",
  svg: {
    width: "20px",
    height: "20px",
  },
};

const subMenuListButtonStyle = {
  minWidth: "18px",
  svg: {
    width: "15px",
    height: "15px",
    marginBottom: "-1px",
  },
};

const iconStyles = {
  fontSize: "16px",
};

const Sidebar = ({ handleSidebarOpen }) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);

  const toggleRoomMenu = () => {
    setIsRoomOpen(!isRoomOpen);
  };



  const handleClick = () => {
    setOpen(!open);
  };

  const getActiveListItem = (key) => {
    switch (key) {
      case "home":
        return pathname === "/";
        break;
      case "userList":
        return pathname === "/userList";
        break;
      case "maincourse":
        return pathname === "/maincourse";
        break;
      case "starter":
        return pathname === "/starter";
        break;
      case "dssert":
        return pathname === "/dssert";
        break;
      case "breakfast":
        return pathname === "/breakfast";
        break;
      case "deluxeroom":
        return pathname === "/deluxeroom";
      case "standardroom":
        return pathname === "/standardroom";
      default:
        return false;
        break;
    }
  };

  const getGenerateDataActive = () => {
    return (
      pathname === "/scheduleparameters" ||
      pathname === "/productionparameters" ||
      pathname === "/changeoverparameters"
    );
  };

  return (
    <div
      className={classNames({
        [classes.sidebarContainer]: true,
        [classes.smSidebarStyle]: smScreen,
      })}
    >
      <Box className={classes.logoContainer} display="flex" alignItems="center">
        <img
          src={Logo}
          alt="Hotel Ashirwad Logo"
          className={classes.logoImage}
        />
        <Typography variant="h6" className={classes.logoText}>
          Hotel Ashirwad
        </Typography>
      </Box>
      <div>
        {smScreen && (
          <Box className={classes.backIconContainer}>
            <ArrowBackIcon onClick={handleSidebarOpen} />
          </Box>
        )}
        <List sx={{ paddingTop: "12px" }}>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]: getActiveListItem("home"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("home") ? (
                    <DashboardIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]: getActiveListItem("home"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/userList")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("userList"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("userList") ? (
                    <PeopleAltIcon />
                  ) : (
                    <PeopleAltIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"User List"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]: getActiveListItem("userList"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/dssert")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("dssert"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("dssert") ? (
                    <RestaurantIcon />
                  ) : (
                    <RestaurantIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Dssert"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]: getActiveListItem("dssert"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/maincourse")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("maincourse"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("maincourse") ? (
                    <RamenDiningIcon />
                  ) : (
                    <RamenDiningIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Maincourse"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]:
                      getActiveListItem("maincourse"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/starter")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("starter"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("starter") ? (
                    <BrunchDiningIcon />
                  ) : (
                    <BrunchDiningIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Starter"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]: getActiveListItem("starter"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/breakfast")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("breakfast"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  {getActiveListItem("breakfast") ? (
                    <FreeBreakfastIcon />
                  ) : (
                    <FreeBreakfastIcon />
                  )}
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Breakfast"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]:
                      getActiveListItem("breakfast"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* Room Parent Menu */}
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton onClick={toggleRoomMenu}>
              <ListItemIcon sx={listButtonStyle}>
                <RoomServiceIcon />
              </ListItemIcon>
              <ListItemText
                primary="Rooms"
                classes={{
                  primary: classes.listItemText,
                }}
              />
              {isRoomOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={isRoomOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                onClick={() => navigate("/layout/deluxeroom")}
                className={classNames(classes.nested, {
                  [classes.activeListItemButton]:
                    getActiveListItem("deluxeroom"),
                })}
              >
                <ListItemIcon sx={listButtonStyle}>
                  <BedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Deluxe Room"
                  classes={{
                    primary: classes.listItemText,
                  }}
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate("/layout/standardroom")}
                className={classNames(classes.nested, {
                  [classes.activeListItemButton]:
                    getActiveListItem("standardroom"),
                })}
              >
                <ListItemIcon sx={listButtonStyle}>
                  <BedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Standard Room"
                  classes={{
                    primary: classes.listItemText,
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
         
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
