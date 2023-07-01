import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStripe, logoutUser } from "../redux/apiCalls";
import NoAvt from "../asset/NoAvt.png";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MainLogo from "../asset/Happy.png";
import { mobile } from "../responsive";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  margin-left: 150px;
  height: 40px;
  width: 40px;
  ${mobile({ display: "none" })}
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
  margin-right: 50px;
  ${mobile({ display: "none" })}
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
  const [anchorElNew, setAnchorElNew] = useState();
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
      } else if (id === "news") {
        setIndex(4);
      } else {
        setIndex(5);
      }
    };
    setColor();
  }, [id]);
  const handleSignOut = () => {
    navigate("/");
    logoutUser(dispatch);
  };

  const open = Boolean(anchorEl);
  const openNew = Boolean(anchorElNew);

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
    navigate("/profile");
  };

  const handleClickNew = (e, user) => {
    setAnchorElNew(e.currentTarget);
    getStripe(dispatch, user._id);
  };

  const handleCloseNew = () => {
    setAnchorElNew(null);
  };

  const checkIsAuthority = () => {
    if (!user) return false;
    return user.isAuthority ? true : false;
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>
              <ImageLogo src={MainLogo} />
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
              {checkIsAuthority() && (
                <>
                  <IconButton onClick={(e) => handleClickNew(e, user)}>
                    <AddCircleIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorElNew}
                    open={openNew}
                    onClose={handleCloseNew}
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
                    <MenuItem onClick={handleProfile}>Dự án mới</MenuItem>
                    <MenuItem onClick={handleMyAccount}>Tin tức mới</MenuItem>
                  </Menu>
                </>
              )}

              <IconButton>
                <SearchIcon />
              </IconButton>
            </Icon>
            {user ? (
              <Links>
                <Username>
                  Xin chào,
                  <Span> {user.name ? user.name : user.username}</Span>
                </Username>
                <Border onClick={(e) => handleClick(e)}>
                  <Image src={user.avt ? user.avt : NoAvt} />
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
