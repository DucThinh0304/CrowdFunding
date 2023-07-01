import { CircularProgress } from "@mui/material";
import { DataGrid, viVN } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../../requestMethod";
import { Avatar, UsernameDonate } from "../Avatar";

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircularProgressContainer = styled.div`
  width: 100vw;
  height: 50vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding: 20px;
  width: 50vw;
  flex-direction: column;
`;

const CampaignDonator = () => {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );

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

  useEffect(() => {
    const getUserList = async () => {
      try {
        const resUserList = await publicRequest.get(
          `/contributes/findbyCampaign/${id}`
        );
        setUserList(resUserList.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserList();
  }, []);

  const columns = [
    { field: "_id", headerName: "Mã đơn hàng", width: 220 },
    {
      field: "title",
      headerName: "Tên",
      width: 400,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar id={params.row.username} />
            <UsernameDonate st id={params.row.username}></UsernameDonate>
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số tiền đã ủng hộ",
      width: 160,
      renderCell: (params) => {
        return <div>{formatter.format(params.row.amount)} đ</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày ủng hộ",
      width: 160,
      renderCell: (params) => {
        return <div>{convertDate(params.row.createdAt)}</div>;
      },
    },
  ];

  return loading === true && user !== null ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      <Wrapper>
        <DataGrid
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          rows={userList}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Wrapper>
    </Container>
  );
};

export default CampaignDonator;
