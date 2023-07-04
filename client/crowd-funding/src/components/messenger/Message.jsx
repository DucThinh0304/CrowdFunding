import React from "react";
import { format, register } from "timeago.js";
import styled from "styled-components";

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
  const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ["just now", "mới đây"],
      ["%s seconds ago", "%s giây trước"],
      ["1 minute ago", "1 phút trước"],
      ["%s minutes ago", "%s phút trước"],
      ["1 hour ago", "in 1 hour"],
      ["%s hours ago", "in %s hours"],
      ["1 day ago", "in 1 day"],
      ["%s days ago", "in %s days"],
      ["1 week ago", "in 1 week"],
      ["%s weeks ago", "in %s weeks"],
      ["1 month ago", "in 1 month"],
      ["%s months ago", "in %s months"],
      ["1 year ago", "in 1 year"],
      ["%s years ago", "in %s years"],
    ][index];
  };
  register("my-locale", localeFunc);
  return own ? (
    <MessagesOwn>
      <MessageTop>
        <MessageImg />
        <MessageTextOwn>{message.text}</MessageTextOwn>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </MessagesOwn>
  ) : (
    <Messages>
      <MessageTop>
        <MessageText>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </Messages>
  );
};

export default Message;
