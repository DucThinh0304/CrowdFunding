import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userRequest, publicRequest } from "../../requestMethod";
import StripeCheckout from "react-stripe-checkout";
import MainLogo from "../../asset/Happy.png";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, UsernameComment } from "../Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { addComment } from "../../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding: 20px;
  width: 50vw;
  flex-direction: column;
`;
const LoadingContainer = styled.div`
  width: 100vw;
  height: 50vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const UserComment = styled.div`
  border-radius: 5px;
  border: 1px solid #ebebf1;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  background-color: #fff;
  margin-left: 50px;
  width: 100%;
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const ButtonContaner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 40%;
  font-weight: 700;
  margin-top: 20px;
  background-color: transparent;
  text-transform: uppercase;
  color: #0275d8;
  padding: 18px 30px;
  border: 1px solid #c9366f;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c9366f;
    color: white;
  }
  transition: all 0.5s ease;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;
const Label = styled.div`
  margin: 10px 0px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const TextArea = styled.textarea`
  padding: 5px;
  font-size: 14px;
  height: 200px;
  border: 0.1px solid lightgray;
  resize: vertical;
`;

const CampaignComment = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const refDescription = useRef(null);

  useEffect(() => {
    const getCampaign = async () => {
      publicRequest
        .get("/campaign/find/" + id)
        .then((res) => {
          setCampaign(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getCampaign();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id;
    const content = refDescription.current.value;
    const star = stars;
    const time = new Date();
    addComment(dispatch, id, {
      userId,
      content,
      star,
      time,
    });
    setLoading(true);
    setStars(0);
    publicRequest
      .get("/campaign/find/" + id)
      .then((res) => {
        setCampaign(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return loading ? (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  ) : (
    <Container>
      <Wrapper>
        <Label>Có {campaign.comments} lượt đánh giá</Label>
        {campaign.comment.length !== 0 ? (
          campaign.comment.map((comment) => (
            <CommentContainer>
              <Avatar id={comment.userId} />
              <UserComment>
                <UsernameComment id={comment.userId} />
                <div>{comment.content}</div>
                <Rating name="read-only" readOnly value={comment.star} />
              </UserComment>
            </CommentContainer>
          ))
        ) : (
          <div>Hiện chưa có nhận xét nào</div>
        )}
        <Title>Thêm nhận xét</Title>
        <Label>Đánh giá của bạn</Label>
        <Rating
          value={stars}
          onChange={(event, newValue) => {
            setStars(newValue);
          }}
        />
        <Label>Nhận xét của bạn</Label>
        <TextArea ref={refDescription}></TextArea>
        <ButtonContaner>
          <Button onClick={(e) => handleSubmit(e)}>Gửi nhận xét</Button>
        </ButtonContaner>
      </Wrapper>
    </Container>
  );
};

export default CampaignComment;
