import "./userList.css";
import { DataGrid, viVN } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRows } from "../../dummyData";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    userRequest
      .delete(`/users/${id}`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setData(data.filter((item) => item.id !== id));
  };
  const getStatus = (isAdmin, isAuthority) => {
    if (isAdmin === true) return "Admin";
    if (isAuthority === true) return "Người tạo dự án";
    else return "Người dùng";
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avt} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {getStatus(params.row.isAdmin, params.row.isAuthority)}
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
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get("/users/")
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [page]);

  return (
    <div className="userList">
      <DataGrid
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        rows={users}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
