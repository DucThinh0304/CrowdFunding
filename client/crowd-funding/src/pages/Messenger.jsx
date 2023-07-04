import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { userRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  height: calc(100vh - 98px);
  display: flex;
`;

const ChatMenu = styled.div`
  flex: 3.5;
`;

const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 10px;
  border: none;
  border-bottom: 1px solid gray;
`;

const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const ChatBox = styled.div`
  flex: 5.5;
`;

const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  height: 100%;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;

const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatMessageInput = styled.textarea`
  width: 95%;
  height: 90px;
  font-size: 16px;
  resize: vertical;
`;

const ChatSubmitButton = styled.button`
  width: 10%;
  height: 60px;
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;

const ChatOnline = styled.div`
  flex: 3;
`;

const ChatOnlineWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await userRequest("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await userRequest("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ChatMenu>
          <ChatMenuWrapper>
            <ChatMenuInput placeholder="Tìm kiếm" />
          </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
          <ChatBoxWrapper>
            {currentChat ? (
              <>
                <ChatBoxTop></ChatBoxTop>
                <ChatBoxBottom>
                  <ChatMessageInput placeholder="Nhập ở đây...."></ChatMessageInput>
                  <ChatSubmitButton>Gửi</ChatSubmitButton>
                </ChatBoxBottom>
              </>
            ) : (
              <NoConversationText>
                Chọn một người để nhắn tin
              </NoConversationText>
            )}
          </ChatBoxWrapper>
        </ChatBox>
        <ChatOnline>
          <ChatOnlineWrapper></ChatOnlineWrapper>
        </ChatOnline>
      </Wrapper>
    </Container>
  );
};

export default Messenger;
