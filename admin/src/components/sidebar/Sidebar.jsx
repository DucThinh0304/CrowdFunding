import "./sidebar.css";

import { Link, useLocation } from "react-router-dom";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import CampaignIcon from "@mui/icons-material/Campaign";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng Điều Khiển</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  page === "" ? "sidebarListItem active" : "sidebarListItem"
                }
              >
                <LineStyleIcon className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Phân tích
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu Nhanh</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={
                  page === "users" || page === "user"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <PermIdentityIcon className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/campaigns" className="link">
              <li
                className={
                  page === "campaigns" || page === "campaign"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <CampaignIcon className="sidebarIcon" />
                Dự án
              </li>
            </Link>
            <Link to="/transactions" className="link">
              <li
                className={
                  page === "transactions" || page === "transaction"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <AttachMoneyIcon className="sidebarIcon" />
                Chuyển khoản
              </li>
            </Link>
            <Link to="/pendings" className="link">
              <li
                className={
                  page === "pendings" || page === "pending"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
              >
                <PendingActionsIcon className="sidebarIcon" />
                Pendings
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
