import "./campaignList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productRows } from "../../dummyData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";

export default function CampaignList() {
  const [data, setData] = useState(productRows);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const checkDay = (check) => {
    return check < 0 ? false : true;
  };
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const date = (day) => {
    return new Date(day);
  };
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );
  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get("/campaign/")
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [page]);

  const handleDelete = (id) => {};

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Dự án",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Hoàn thành",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {Math.round((params.row.donatesum / params.row.donateneed) * 100)}%
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {checkDay(
              Math.round((date(params.row.dayfinish) - today) / oneDay)
            ) === true
              ? Math.round(
                  Math.abs((date(params.row.dayfinish) - today) / oneDay)
                )
              : "0"}{" "}
            ngày còn lại
          </div>
        );
      },
    },
    {
      field: "donatesum",
      headerName: "Số tiền đã quyên góp",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {formatter.format(params.row.donatesum)} ₫
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/campaign/" + params.row._id}>
              <button className="productListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return loading ? (
    <div className="loading">
      <CircularProgress />
    </div>
  ) : (
    <div className="productList">
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
