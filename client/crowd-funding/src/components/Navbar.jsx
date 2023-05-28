import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/apiCalls";
import { publicRequest } from "../requestMethod";
import NoAvt from "../asset/NoAvt.png";
import { Menu, MenuItem } from "@mui/material";

const Container = styled.div`
  height: 94px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const ImageLogo = styled.img`
  width: 146px;
  margin: 0px 25px;
`;

const Left = styled.div`
  flex: 1;
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  align-items: left;
  justify-content: flex-start;
`;

const Right = styled.div`
  flex: 1;
  align-items: center;
`;

const WrapLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkText = styled.div`
  cursor: pointer;
  padding: 12px;
  font-size: 14px;
  color: ${(props) => (props.id === "true" ? "#c9366f" : "black")};
  &:hover {
    color: #c9366f;
  }

  font-weight: 500;
  transition: all 0.2s ease;
`;

const Icon = styled.div`
  width: 14px;
  height: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-right: 20px;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Username = styled.div`
  font-size: 18px;
  margin-right: 15px;
  margin-left: 5px;
`;
const Span = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Border = styled.div`
  display: flex;
  border-radius: 50%;
  padding: 1px;
  border: 1px #555 solid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: #c9366f;
    color: white;
  }
`;

const Login = styled.div`
  text-decoration: none;
  cursor: pointer;
  margin: 7px;
  padding: 5px;
  font-size: 14px;
  &:hover {
    background-color: #eee;
  }
  transition: all 0.5s ease;
`;

const Navbar = () => {
  const location = useLocation();
  const [index, setIndex] = useState(1);
  const [anchorEl, setAnchorEl] = useState();
  const [avt, setAvt] = useState(NoAvt);
  const [username, setUsername] = useState("");
  const id = location.pathname.split("/")[1];
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const setColor = () => {
      if (id === "") {
        setIndex(1);
      } else if (id === "all-campaigns") {
        setIndex(2);
      } else if (id === "contact") {
        setIndex(3);
      } else {
        setIndex(4);
      }
    };
    setColor();
  }, [id]);
  const handleSignOut = () => {
    navigate("/");
    logout(dispatch);
  };
  useEffect(() => {
    const getLocalStorage = () => {
      localStorage.getItem("avt")
        ? setAvt(localStorage.getItem("avt"))
        : setAvt(NoAvt);
      localStorage.getItem("name") === ""
        ? setUsername(localStorage.getItem("username"))
        : setUsername(localStorage.getItem("name"));
    };
    if (user) {
      getLocalStorage();
    }
  }, []);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMyAccount = () => {
    navigate("/my-account/support-campaign");
  };
  const handleProfile = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>
              <ImageLogo src="https://crowdfunding.comicola.com/wp-content/uploads/2021/06/comicola_crowdfunding_logo-1.png" />
            </Logo>
          </Link>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <LinkText id={index === 1 ? "true" : "false"}>Trang chủ</LinkText>
          </Link>
          <Link
            to="/all-campaigns"
            style={{ textDecoration: "none", color: "black" }}
          >
            <LinkText id={index === 2 ? "true" : "false"}>
              Toàn bộ các dự án
            </LinkText>
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            <LinkText id={index === 3 ? "true" : "false"}>Liên hệ</LinkText>
          </Link>
        </Center>
        <Right>
          <WrapLogin>
            <Icon>
              <SearchIcon />
            </Icon>
            {user ? (
              <Links>
                <Username>
                  Xin chào,
                  <Span> {username}</Span>
                </Username>
                <Border onClick={(e) => handleClick(e)}>
                  <Image src={avt} />
                </Border>
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
                  <MenuItem onClick={handleProfile}>Hồ sơ</MenuItem>
                  <MenuItem onClick={handleMyAccount}>Tài khoản</MenuItem>
                  <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                </Menu>
              </Links>
            ) : (
              <Links>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Login>
                    <b>Đăng nhập</b>
                  </Login>
                </Link>
                /
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Login>
                    <b>Đăng kí</b>
                  </Login>
                </Link>
              </Links>
            )}
          </WrapLogin>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
