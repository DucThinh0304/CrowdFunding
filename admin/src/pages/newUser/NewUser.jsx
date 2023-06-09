import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="nguyenvana" />
        </div>
        <div className="newUserItem">
          <label>Tên người dùng</label>
          <input type="text" placeholder="Nguyễn Văn A" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="nguyenvana@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="0123456789" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="user">Người dùng</option>
            <option value="autheticate">Người dùng đã xác thực</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="newUserButton">Tạo mới</button>
      </form>
    </div>
  );
}
