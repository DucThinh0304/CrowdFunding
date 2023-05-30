import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { DataGrid, viVN } from "@mui/x-data-grid";
import "../../CSS/DataGrid.css";

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 75%;
  height: 500px;
`;

const Favorite = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const resCampaign = await publicRequest.get("/campaign");
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
      field: "amount",
      headerName: "Số tiền đã ủng hộ",
      width: 160,
      renderCell: (params) => {
        return <div>{formatter.format(params.row.amount)} đ</div>;
      },
    },
    {
      field: "action",
      headerName: "Xem thông tin",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/campaign/" + params.row.id}>
              <button className="campaignCheck">Đến dự án</button>
            </Link>
          </>
        );
      },
    },
  ];

  const mergedData = () => {
    let array = [];
    if (!user.support || !campaigns) return array;
    user.favorite.map((a) => {
      campaigns.map((b) => {
        if (a.id === b._id) array.push({ ...a, ...b });
      });
    });
    return array;
  };

  return loading === true && user !== null ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      {user.support.length > 0 ? (
        <DataGrid
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          rows={mergedData()}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
        />
      ) : (
        <div>Bạn chưa ủng hộ dự án nào</div>
      )}
    </Container>
  );
};
export default Favorite;
