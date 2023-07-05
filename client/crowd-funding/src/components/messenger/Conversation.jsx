import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethod";
import NoAvt from "../../asset/NoAvt.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: rgb(245, 243, 243);
  }
`;

const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ConversationName = styled.div`
  font-weight: 500;
`;

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await userRequest("/users/public/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <Container>
      <ConversationImg
        alt=""
        src={user?.avt ? user?.avt : NoAvt}
      ></ConversationImg>
      <ConversationName>
        {user?.name ? user?.name : user?.username}
      </ConversationName>
    </Container>
  );
};

export default Conversation;
