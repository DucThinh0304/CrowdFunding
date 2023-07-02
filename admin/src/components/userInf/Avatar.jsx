import { userRequest } from "../../requestMethods";
import { useEffect, useState } from "react";
import NoAvt from "../../asset/NoAvt.png";
import { CircularProgress } from "@mui/material";
import "./avatar.css";

const Avatar = ({ id }) => {
  const [avt, setAvt] = useState("");
  const [loading, setLoading] = useState(true);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await userRequest.get(`/users/public/${ID}`);
        setAvt(data.data.avt);
        setLoading(false);
      } catch (err) {
        setAvt("");
      }
    };
    getAvt(ID);
    return () => {
      setAvt([]);
    };
  }, []);
  return loading === true ? (
    <div>
      <CircularProgress />
    </div>
  ) : avt !== "" ? (
    <div>
      <img className="avt" src={avt} />
    </div>
  ) : (
    <div>
      <img className="avt" src={NoAvt} />
    </div>
  );
};

const Username = ({ id }) => {
  const [username, setUsername] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await userRequest.get(`/users/public/${ID}`);
        data.data.name === ""
          ? setUsername(data.data.username)
          : setUsername(data.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getAvt(ID);
    return () => {
      setUsername([]);
    };
  }, []);
  return <div>{username}</div>;
};

const Campaign = ({ id }) => {
  const [campaign, setCampaign] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await userRequest.get(`/campaign/find/${ID}`);
        setCampaign(data.data.title);
      } catch (err) {
        console.log(err);
      }
    };
    getAvt(ID);
    return () => {
      setCampaign("");
    };
  }, [id]);
  return <div>{campaign}</div>;
};

export { Avatar, Username, Campaign };
