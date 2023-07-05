import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { io } from "socket.io-client";
import Conversation from "../components/messenger/Conversation";
import Message from "../components/messenger/Message";
import ChatOnline from "../components/messenger/ChatOnline";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Break = styled.hr`
  border: #eee 1px solid;
`;

const Wrapper = styled.div`
  height: calc(100vh - 116px);
  display: flex;
`;

const ChatMenu = styled.div`
  flex: 3.5;
  border-right: #eee solid 1px;
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
  width: 80%;
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
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #c9366f;
  color: white;
`;

const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;

const ChatOnlineContainer = styled.div`
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
        const res = await userRequest.get("/conversations/" + user._id);
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
        const res = await userRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await userRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Container>
      <Navbar />
      <Break />
      <Wrapper>
        <ChatMenu>
          <ChatMenuWrapper>
            <ChatMenuInput placeholder="Tìm kiếm" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
          <ChatBoxWrapper>
            {currentChat ? (
              <>
                <ChatBoxTop>
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </ChatBoxTop>
                <ChatBoxBottom>
                  <ChatMessageInput
                    placeholder="Nhập ở đây...."
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></ChatMessageInput>
                  <ChatSubmitButton onClick={handleSubmit}>
                    Gửi
                  </ChatSubmitButton>
                </ChatBoxBottom>
              </>
            ) : (
              <NoConversationText>
                Chọn một người để nhắn tin
              </NoConversationText>
            )}
          </ChatBoxWrapper>
        </ChatBox>
        <ChatOnlineContainer>
          <ChatOnlineWrapper>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </ChatOnlineWrapper>
        </ChatOnlineContainer>
      </Wrapper>
    </Container>
  );
};

export default Messenger;
