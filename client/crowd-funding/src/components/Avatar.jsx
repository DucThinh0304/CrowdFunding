import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";

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

const Avatar = ({ id }) => {
  const [avt, setAvt] = useState([]);
  useEffect(() => {
    const getAvt = async () => {
      try {
        const data = await publicRequest.get(`/users/public/${id}`);
        setAvt(data.data.avt);
      } catch (err) {
        console.log(err);
      }
    };
    getAvt();
    return () => {
      setAvt([]);
    };
  }, []);
  return (
    <Container>
      <Image
        src={
          avt === ""
            ? "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
            : avt
        }
      />
    </Container>
  );
};

const Username = ({ id }) => {
  const [username, setUsername] = useState([]);
  useEffect(() => {
    const getAvt = async () => {
      try {
        const data = await publicRequest.get(`/users/public/${id}`);
        setUsername(data.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getAvt();
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
