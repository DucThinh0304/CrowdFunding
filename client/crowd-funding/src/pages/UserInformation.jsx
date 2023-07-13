import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../requestMethod";
import { CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import "../CSS/Icon.css";
import { DataGrid, viVN } from "@mui/x-data-grid";
import NoAvt from "../asset/NoAvt.png";
import { useDispatch, useSelector } from "react-redux";
import { text } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div``;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  margin: 50px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserCampaign = styled.div`
  flex: 1;
  padding: 20px;
  margin: 50px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Button = styled.button`
  margin-top: 5px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  :hover {
    background-color: #0505bd;
  }
`;

const UserInformation = () => {
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);
  const [user, setUser] = useState();
  const [campaigns, setCampaigns] = useState([]);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isFetching } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      publicRequest
        .get(`/users/find/${page}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    };
    getUser();
  }, [page]);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const resCampaign = await publicRequest.get(
          `/campaign/userfind/${page}`
        );
        setCampaigns(resCampaign.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCampaigns();
  }, [page]);

  useEffect(() => {
    if (user && campaigns) setLoading(false);
  }, [user, campaigns]);

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
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Tên dự án",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="campaignListItem">
            <img className="campaignListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Xem thông tin",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/campaign/" + params.row._id}>
              <button className="campaignCheck">Đến dự án</button>
            </Link>
          </>
        );
      },
    },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    if (!currentUser.followings) {
      setWaiting(true);
      const id = currentUser._id;
      const userId = page;
      text(dispatch, id, { userId }).then(setWaiting(false));
    } else if (currentUser.followings.includes(page) === false) {
      setWaiting(true);
      const id = currentUser._id;
      const userId = page;
      text(dispatch, id, { userId }).then(setWaiting(false));
    } else {
      navigate("/messenger");
    }
  };

  useEffect(() => {
    if (currentUser.followings.includes(page) && waiting === false)
      navigate("/messenger");
  }, [currentUser, waiting]);

  return loading ? (
    <LoadingContainer className="LoadingContainer">
      <CircularProgress />
    </LoadingContainer>
  ) : (
    <Container>
      <Navbar />
      <Wrapper>
        <UserContainer>
          <UserShow>
            <UserShowTop>
              <UserShowImg
                src={user.avt ? user.avt : NoAvt}
                alt=""
                className="userShowImg"
              />
              <UserShowTopTitle>
                <UserShowUsername>{user.name}</UserShowUsername>
                <Button onClick={(e) => handleClick(e)}>Nhắn tin</Button>
              </UserShowTopTitle>
            </UserShowTop>
            <UserShowBottom>
              <UserShowTitle>Thông tin tài khoản</UserShowTitle>
              <UserShowInfo>
                <PermIdentityIcon className="userShowIcon" />
                <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <CalendarTodayIcon className="userShowIcon" />
                <UserShowInfoTitle>
                  {convertDate(user.birthday)}
                </UserShowInfoTitle>
              </UserShowInfo>
              <UserShowTitle>Thông tin liên lạc</UserShowTitle>
              <UserShowInfo>
                <PhoneAndroidIcon className="userShowIcon" />
                <UserShowInfoTitle>{user.phonenumber}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <MailOutlineIcon className="userShowIcon" />
                <UserShowInfoTitle>{user.email}</UserShowInfoTitle>
              </UserShowInfo>
            </UserShowBottom>
          </UserShow>
          <UserCampaign>
            {campaigns.length > 0 ? (
              <DataGrid
                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                rows={campaigns}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
              />
            ) : (
              <div>Người dùng này chưa có dự án nào được duyệt</div>
            )}{" "}
          </UserCampaign>
        </UserContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UserInformation;
