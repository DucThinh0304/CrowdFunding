import { Link, useLocation } from "react-router-dom";
import "./user.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublishIcon from "@mui/icons-material/Publish";
import { useEffect, useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "../../redux/apiCalls";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("user");
  const [file, setFile] = useState("");
  const [isSave, setIsSave] = useState("notsave");
  const [button, setButton] = useState("notsave");
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refBirth = useRef(null);
  const refGender = useRef(null);
  const refRole = useRef(null);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();
  const { isFetching, errorDes } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (user) {
      if (user.isAuthority === true && user.isAdmin === true) setValue("admin");
      if (user.isAuthority === true && user.isAdmin === false)
        setValue("autheticate");
    }
  }, [user]);
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

  const handleSave = (e) => {
    e.preventDefault();
    setIsSave("issave");
    const _id = page;
    const name = refName.current.value ? refName.current.value : user.name;
    const email = refEmail.current.value ? refEmail.current.value : user.email;
    const phone = refPhone.current.value
      ? refPhone.current.value
      : user.phonenumber;
    const birth = refBirth.current.value
      ? refBirth.current.value
      : user.birthday;
    const gender = refGender.current.value
      ? refGender.current.value
      : user.gender;
    const role = refRole.current.value ? refRole.current.value : value;
    let isAdmin = false;
    let isAuthority = false;
    if (role === "admin") {
      isAdmin = true;
      isAuthority = true;
    }
    if (role === "autheticate") {
      isAdmin = false;
      isAuthority = true;
    }
    const birthday = new Date(birth).toISOString();
    console.log(
      _id,
      name,
      email,
      phone,
      gender,
      birthday,
      isAdmin,
      isAuthority
    );
    if (file.name !== undefined) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((avt) => {
              setting(dispatch, {
                _id,
                name,
                email,
                phone,
                gender,
                birthday,
                avt,
                isAdmin,
                isAuthority,
              });
            })
            .then(setIsSave("done"));
        }
      );
    }
    setting(dispatch, {
      _id,
      name,
      email,
      phone,
      gender,
      birthday,
      isAdmin,
      isAuthority,
    }).then(setIsSave("done"));
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (errorDes) setOpen(true);
  }, [errorDes]);

  useEffect(() => {
    if (isSave === "done" && !isFetching) {
      setButton("done");
      setOpenSuccess(true);
    } else if (isFetching) {
      setButton("issave");
    } else setButton("notsave");
  }, [isSave, isFetching]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSave("notsave");
    setButton("notsave");
    setOpenSuccess(false);
  };

  return loading ? (
    <div className="userLoading">
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
                <label>Tên</label>
                <input
                  ref={refName}
                  type="text"
                  placeholder={user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  ref={refEmail}
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  ref={refPhone}
                  type="text"
                  placeholder={user.phonenumber}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Sinh nhật</label>
                <input
                  ref={refBirth}
                  type="date"
                  placeholder={user.birthday}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Giới tính</label>
                <select
                  className="userUpdateInput"
                  value={value}
                  ref={refGender}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="different">Khác</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Quyền</label>
                <select
                  disabled={user.username === "admin" ? true : false}
                  className="userUpdateInput"
                  value={value}
                  ref={refRole}
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option value="user">Người dùng</option>
                  <option value="autheticate">Người dùng đã xác thực</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={preview ? preview : user.avt}
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
              <div className="buttonContainer">
                <button
                  disabled={
                    button === "issave"
                      ? true
                      : button === "done"
                      ? true
                      : false
                  }
                  className="userUpdateButton"
                  onClick={(e) => handleSave(e)}
                >
                  {button === "issave"
                    ? "Đang lưu..."
                    : button === "done"
                    ? "Thành công!"
                    : "Lưu thông tin"}
                </button>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={errorDes}
              />
              <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                message="Cập nhật thành công"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
