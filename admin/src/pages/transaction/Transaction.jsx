import { Link, useLocation } from "react-router-dom";
import "./transaction.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CampaignIcon from "@mui/icons-material/Campaign";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";

export default function Transaction() {
  const [contribute, setContribute] = useState(null);
  const [user, setUser] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  useEffect(() => {
    const getContribute = async () => {
      userRequest
        .get(`/contributes/findbyId/${page}`)
        .then((res) => {
          setContribute(res.data);
        })
        .catch((err) => console.log(err));
    };
    getContribute();
  }, [page]);

  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get(`/campaign/find/${contribute.campaign}`)
        .then((res) => {
          setCampaign(res.data);
        })
        .catch((err) => console.log(err));
    };
    contribute && getCampaign();
  }, [contribute]);

  useEffect(() => {
    const getUser = async () => {
      userRequest
        .get(`/users/public/${contribute.username}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    };
    contribute && getUser();
  }, [contribute]);

  useEffect(() => {
    console.log(user);
    console.log(contribute);
    console.log(campaign);
    if (user !== null && contribute !== null && campaign !== null)
      setLoading(false);
  }, [contribute, user, campaign]);

  const convertDate = (s) => {
    let date = new Date(s);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return dt + "-" + month + "-" + year;
  };
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );
  return loading ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chi tiết giao dịch</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img className="userShowImg" src={user.avt} />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin giao dịch</span>
            <div className="userShowInfo">
              <VpnKeyIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{contribute._id}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {convertDate(contribute.createdAt)}
              </span>
            </div>
            <div className="userShowInfo">
              <AttachMoneyIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {formatter.format(contribute.amount)} đ
              </span>
            </div>
            <div className="userShowInfo">
              <CreditCardIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{contribute.stripe}</span>
            </div>
            <span className="userShowTitle">Người giao dịch</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phonenumber}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <div className="userShowTop">
            <img className="userShowImg" src={campaign.img} />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{campaign.title}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">
              Thông tin dự án đã chuyển khoản
            </span>
            <div className="userShowInfo">
              <CampaignIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{campaign._id}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {convertDate(campaign.createdAt)}
              </span>
            </div>
            <div className="userShowInfo">
              <AttachMoneyIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {formatter.format(campaign.donatesum)} đ
              </span>
            </div>
            <div className="userShowInfo">
              <AttachMoneyIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {formatter.format(campaign.donateneed)} đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
