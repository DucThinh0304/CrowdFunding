import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import NoAvt from "../asset/NoAvt.png";

const Container = styled.div``;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 14px;
  padding-left: 10px;
  padding-top: 11px;
  cursor: pointer;
`;

const Border = styled.div`
  display: flex;
  border-radius: 50%;
  padding: 1px;
  border: 1px #555 solid;
  justify-content: center;
  align-items: center;
`;

const Avatar = ({ id }) => {
  const [avt, setAvt] = useState("");
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
        setAvt(data.data.avt);
      } catch (err) {
        setAvt("");
      }
    };
    getAvt(ID);
    return () => {
      setAvt([]);
    };
  }, []);
  return avt !== "" ? (
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

const Username = ({ id }) => {
  const [username, setUsername] = useState([]);
  const ID = id;
  useEffect(() => {
    const getAvt = async (ID) => {
      try {
        const data = await publicRequest.get(`/users/public/${ID}`);
        setUsername(data.data.username);
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

export { Avatar, Username };
