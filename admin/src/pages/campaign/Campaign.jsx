import { Link, useLocation } from "react-router-dom";
import "./campaign.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { CircularProgress } from "@mui/material";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

export default function Campaign() {
  const [campaign, setCampaign] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  useEffect(() => {
    const getCampaign = async () => {
      userRequest
        .get(`/campaign/find/${page}`)
        .then((res) => {
          setCampaign(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, []);
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
  const checkDay = (check) => {
    return check < 0 ? false : true;
  };
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const date = (day) => {
    return new Date(day);
  };
  return loading ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Dự án</h1>
        <Link to="/newcampaign">
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      <FeaturedInfo
        donateneed={campaign.donateneed}
        donatesum={campaign.donatesum}
        id={campaign._id}
      />
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Hiệu suất dự án" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={campaign.img} alt="" className="productInfoImg" />
            <span className="productName">{campaign.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{campaign._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tổng gây quỹ:</span>
              <span className="productInfoValue">
                {formatter.format(campaign.donatesum)} đ
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Số ngày còn lại:</span>
              <span className="productInfoValue">
                {checkDay(
                  Math.round((date(campaign.dayfinish) - today) / oneDay)
                ) === true
                  ? Math.round(
                      Math.abs((date(campaign.dayfinish) - today) / oneDay)
                    )
                  : "0"}{" "}
                ngày còn lại
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tags:</span>
              <span className="productInfoValue">
                {campaign.tag[0]}, {campaign.tag[1]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tên Dự Án</label>
            <input type="text" placeholder={campaign.title} />
            <label>Miêu Tả</label>
            <textarea
              id="idStock"
              className="textarea"
              placeholder={campaign.description.slice(1, -1)}
            ></textarea>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Có</option>
              <option value="no">Không</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={campaign.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
