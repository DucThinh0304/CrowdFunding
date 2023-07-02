import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { Avatar, Username } from "../userInf/Avatar";

export default function WidgetLg() {
  const [contributes, setContributes] = useState([]);
  useEffect(() => {
    const getContributes = async () => {
      try {
        const res = await userRequest("/contributes/?new=true");
        setContributes(res.data);
      } catch {}
    };
    getContributes();
  }, []);

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

  const formatter = new Intl.NumberFormat(
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
  );

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Lần chuyển khoản gần nhất</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Người dùng</th>
            <th className="widgetLgTh">Ngày</th>
            <th className="widgetLgTh">Số tiền</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {contributes.map((contribute) => (
            <tr className="widgetLgTr" key={contribute._id}>
              <td className="widgetLgUser">
                <Avatar id={contribute.username} />
                <Username id={contribute.username}></Username>
              </td>
              <td className="widgetLgDate">
                {convertDate(contribute.createdAt)}
              </td>
              <td className="widgetLgAmount">
                {formatter.format(contribute.amount)} đ
              </td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
