import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import NoAvt from "../asset/NoAvt.png";
import { CircularProgress } from "@mui/material";

const Container = styled.div``;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessengerImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-left: 10px;
`;

const Name = styled.div`
  font-size: 14px;
  padding-left: 10px;
  padding-top: 11px;
  cursor: pointer;
`;

const CommentName = styled.div`
  font-size: 14px;
  padding-left: 10px;
  padding-top: 11px;
  color: gray;
`;

const DonateName = styled.div`
  font-size: 14px;
  padding-left: 10px;
`;

const Border = styled.div`
  display: flex;
  border-radius: 50%;
  padding: 1px;
  border: 1px #555 solid;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const Avatar = ({ id }) => {
  const [avt, setAvt] = useState("");
  const [loading, setLoading] = useState(true);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
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
    <Container>
      <Border>
        <CircularProgress />
      </Border>
    </Container>
  ) : avt !== "" ? (
    <Container>
      <Border>
        <Image src={avt} />
      </Border>
    </Container>
  ) : (
    <Container>
      <Border>
        <Image src={NoAvt} />
      </Border>
    </Container>
  );
};

const MessengerAvatar = ({ id }) => {
  const [avt, setAvt] = useState("");
  const [loading, setLoading] = useState(true);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
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
    <Container>
      <CircularProgress />
    </Container>
  ) : avt !== "" ? (
    <Container>
      <MessengerImage src={avt} />
    </Container>
  ) : (
    <Container>
      <MessengerImage src={NoAvt} />
    </Container>
  );
};

const Username = ({ id }) => {
  const [username, setUsername] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
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
  return (
    <Container>
      <Name>{username}</Name>
    </Container>
  );
};

const UsernameComment = ({ id }) => {
  const [username, setUsername] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
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
  return (
    <Container>
      <CommentName>{username}</CommentName>
    </Container>
  );
};

const UsernameDonate = ({ id }) => {
  const [username, setUsername] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
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
  return (
    <Container>
      <DonateName>{username}</DonateName>
    </Container>
  );
};

export { Avatar, MessengerAvatar, Username, UsernameComment, UsernameDonate };
