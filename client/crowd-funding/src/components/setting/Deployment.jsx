import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../../requestMethod";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { DataGrid, viVN } from "@mui/x-data-grid";

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
`;

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
`;

const Deployment = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const resCampaign = await userRequest.get(
          `/campaign/userfind/${user._id}`
        );
        setCampaigns(resCampaign.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCampaigns();
  }, []);
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

  return loading === true ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      {campaigns.length > 0 ? (
        <DataGrid
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          rows={campaigns}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
        />
      ) : (
        <div>Bạn chưa có dự án nào đang chờ duyệt</div>
      )}{" "}
    </Container>
  );
};

export default Deployment;
