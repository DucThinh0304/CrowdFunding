import { useEffect, useRef, useState } from "react";
import { newUser } from "../../redux/apiCalls";
import "./newUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";

export default function NewUser() {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [gender, setGender] = useState("male");
  const [value, setValue] = useState("user");
  const [open, setOpen] = useState(false);
  const refRole = useRef(null);
  const { errorDes } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    let isAdmin = false;
    let isAuthority = false;
    const role = refRole.current.value ? refRole.current.value : "";
    if (role === "admin") {
      isAdmin = true;
      isAuthority = true;
    }
    if (role === "autheticate") {
      isAdmin = false;
      isAuthority = true;
    }
    newUser(dispatch, {
      username,
      name,
      email,
      password,
      phonenumber,
      gender,
      isAuthority,
      isAdmin,
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (errorDes) setOpen(true);
  }, [errorDes]);

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="nguyenvana"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="newUserItem">
          <label>Tên người dùng</label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="nguyenvana@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input
            type="text"
            placeholder="0123456789"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input
              type="radio"
              checked={gender === "male"}
              name="gender"
              id="male"
              value="male"
              onClick={() => setGender("male")}
            />
            <label for="male">Nam</label>
            <input
              type="radio"
              name="gender"
              id="female"
              checked={gender === "female"}
              value="female"
              onClick={() => setGender("female")}
            />
            <label for="female">Nữ</label>
            <input
              type="radio"
              name="gender"
              checked={gender === "different"}
              id="different"
              value="different"
              onClick={() => setGender("different")}
            />
            <label for="different">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            value={value}
            ref={refRole}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="user">Người dùng</option>
            <option value="autheticate">Người dùng đã xác thực</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="newUserButton" onClick={(e) => handleSave(e)}>
          Tạo mới
        </button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorDes}
        />
      </form>
    </div>
  );
}
