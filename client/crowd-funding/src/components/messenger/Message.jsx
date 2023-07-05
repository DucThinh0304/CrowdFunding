import React from "react";
import { format, register } from "timeago.js";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Avatar, MessengerAvatar } from "../Avatar";

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MessageTop = styled.div`
  display: flex;
`;

const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
`;

const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const MessageBottomN = styled.div`
  font-size: 12px;
  margin-top: 10px;
  margin-left: 10px;
`;

const MessagesOwn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-end;
`;

const MessageTextOwn = styled.p`
  background-color: rgb(245, 241, 241);
  color: black;
  padding: 10px;
  border-radius: 20px;
  max-width: 300px;
`;

const Message = ({ message, own }) => {
  const user = useSelector((state) => state.user.currentUser);

  const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ["mới đây", "mới đây"],
      ["%s giây trước", "%s giây trước"],
      ["1 phút trước", "1 phút trước"],
      ["%s phút trước", "%s phút trước"],
      ["1 tiếng trước", "1 tiếng trước"],
      ["%s tiếng trước", "%s tiếng trước"],
      ["1 ngày trước", "in 1 day"],
      ["%s ngày trước", "in %s days"],
      ["1 tuần trước", "in 1 week"],
      ["%s tuần trước", "in %s weeks"],
      ["1 tháng trước", "in 1 month"],
      ["%s tháng trước", "in %s months"],
      ["1 năm trước", "in 1 year"],
      ["%s năm trước", "in %s years"],
    ][index];
  };
  register("my-locale", localeFunc);
  return own ? (
    <MessagesOwn>
      <MessageTop>
        <MessageImg src={user.avt} />
        <MessageTextOwn>{message.text}</MessageTextOwn>
      </MessageTop>
      <MessageBottom>{format(message.createdAt, "my-locale")}</MessageBottom>
    </MessagesOwn>
  ) : (
    <Messages>
      <MessageTop>
        <MessengerAvatar id={message.sender} />
        <MessageText>{message.text}</MessageText>
      </MessageTop>
      <MessageBottomN>{format(message.createdAt, "my-locale")}</MessageBottomN>
    </Messages>
  );
};

export default Message;
