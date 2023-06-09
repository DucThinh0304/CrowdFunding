import { Link, useLocation } from "react-router-dom";
import "./user.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublishIcon from "@mui/icons-material/Publish";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get(`/users/find/${page}`)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [page]);
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
  return loading ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh sửa người dùng</h1>
        <Link to="/newUser">
          <button className="userAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.avt} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin tài khoản</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {convertDate(user.birthday)}
              </span>
            </div>
            <span className="userShowTitle">Thông tin liên lạc</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phonenumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Tên</label>
                <input
                  type="text"
                  placeholder={user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder={user.phonenumber}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.avt} alt="" />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Lưu thay đổi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
