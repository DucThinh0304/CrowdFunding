import { Search } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/apiCalls";
import { Avatar } from "./Avatar";

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
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  font-size: 14px;
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
`;
const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = styled.div`
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  font-size: 14px;
`;

const Navbar = () => {
  const location = useLocation();
  const [color1, setColor1] = useState("black");
  const [color2, setColor2] = useState("black");
  const [color3, setColor3] = useState("black");
  const id = location.pathname.split("/")[1];
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  useEffect(() => {
    const setColor = () => {
      if (id === "") {
        setColor1("#c9366f");
        setColor2("black");
        setColor3("black");
      } else if (id === "all-campaigns") {
        setColor1("black");
        setColor2("#c9366f");
        setColor3("black");
      } else {
        setColor1("black");
        setColor2("black");
        setColor3("#c9366f");
      }
    };
    setColor();
  }, [id]);
  const handleSignOut = () => {
    logout(dispatch);
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
          <Link to="/" style={{ textDecoration: "none", color: color1 }}>
            <LinkText>Trang chủ</LinkText>
          </Link>
          <Link
            to="/all-campaigns"
            style={{ textDecoration: "none", color: color2 }}
          >
            <LinkText>Toàn bộ các dự án</LinkText>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: color3 }}>
            <LinkText>Liên hệ</LinkText>
          </Link>
        </Center>
        <Right>
          <WrapLogin>
            <Icon>
              <Search />
            </Icon>
            {user ? (
              <Links>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <Login onClick={handleSignOut}>
                    <b>Đăng xuất</b>
                  </Login>
                </Link>
                <Avatar id={user ? "" : user._id} />
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
