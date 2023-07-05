import React, { useState } from "react";
import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState();
  const user = useSelector((state) => state.user.currentUser);
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    navigate("/");
    logoutUser(dispatch);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Happy Fund</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <SettingsIcon />
          </div> */}

          <img
            src={user.avt}
            alt=""
            className="topAvatar"
            onClick={(e) => handleMenu(e)}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={(e) => handleSignOut(e)}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
