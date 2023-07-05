import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest, userRequest } from "../../requestMethod";
import NoAvt from "../../asset/NoAvt.png";

const Container = styled.div``;

const ChatOnlineFollowing = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;

const ChatOnlineImgContainer = styled.div`
  position: relative;
  margin-right: 10px;
`;

const ChatOnlineImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
`;

const ChatOnlineBadge = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: 2px;
  right: 2px;
`;

const ChatOnlineName = styled.span``;

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [followings, setFollowings] = useState([]);
  const [onlineFollowings, setOnlineFollowings] = useState([]);

  useEffect(() => {
    const getFollowings = async () => {
      const res = await publicRequest.get("/users/followings/" + currentId);
      setFollowings(res.data);
    };

    getFollowings();
  }, [currentId]);

  useEffect(() => {
    setOnlineFollowings(followings.filter((f) => onlineUsers?.includes(f._id)));
  }, [followings, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await publicRequest.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      {onlineFollowings.map((o) => (
        <ChatOnlineFollowing key={o._id} onClick={() => handleClick(o)}>
          <ChatOnlineImgContainer>
            <ChatOnlineImg
              className="chatOnlineImg"
              src={o?.avt ? o.avt : NoAvt}
              alt=""
            />
            <ChatOnlineBadge></ChatOnlineBadge>
          </ChatOnlineImgContainer>
          <ChatOnlineName className="chatOnlineName">
            {o?.name ? o?.name : o?.username}
          </ChatOnlineName>
        </ChatOnlineFollowing>
      ))}
    </Container>
  );
};

export default ChatOnline;
