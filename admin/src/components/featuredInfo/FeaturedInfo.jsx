import "./featuredInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo({ donatesum, donateneed, id }) {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );
  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get(`/contributes/count/${id}`)
        .then((res) => {
          setNumber(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [id]);
  return loading ? (
    <div className="featuredLoading">
      <CircularProgress />
    </div>
  ) : (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Số tiền thu được</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatter.format(donatesum)} đ</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số tiền cần</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {formatter.format(donateneed)} đ
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số người đã ủng hộ</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{number} người</span>
        </div>
      </div>
    </div>
  );
}
