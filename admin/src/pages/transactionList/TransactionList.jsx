import "./transactionList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { productRows } from "../../dummyData";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";
import { Campaign, Username } from "../../components/userInf/Avatar";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

export default function TransactionList() {
  const [data, setData] = useState(productRows);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[1];
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
        .get("/contributes/")
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [page]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Dự án đã đóng góp",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <Campaign id={params.row.campaign} />
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Người dùng",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <Username id={params.row.username} />
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
            {formatter.format(params.row.amount)} ₫
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
            <Link to={"/transaction/" + params.row._id}>
              <button className="productListEdit">Chi tiết</button>
            </Link>
            <RotateLeftIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return loading ? (
    <div className="productList">
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
