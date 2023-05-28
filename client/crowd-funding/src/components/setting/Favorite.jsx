import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { getCampaign } from "../../redux/apiCalls";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaign.campaigns);

  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const getSetting = async () => {
      userRequest
        .get(`/users/setting/${user._id}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getSetting();
  }, []);

  useEffect(() => {
    getCampaign(dispatch);
  }, [dispatch]);

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
    if (!data.support || !campaigns) return array;
    data.favorite.map((a) => {
      campaigns.map((b) => {
        console.log(b);
        if (a.id === b._id) array.push({ ...a, ...b });
      });
    });
    return array;
  };

  console.log(mergedData());

  return loading === true && data !== null ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      {data.support.length > 0 ? (
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