import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addPending } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PendingCampaign from "./PendingCampaign";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BorderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const Border = styled.div`
  border-radius: 10px;
  border: #eee solid 1px;
  padding: 50px;
  width: 80%;
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  margin-left: 25%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const ContainerRow = styled.div`
  display: flex;
`;

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  height: 268px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${(props) =>
    props.position === "left" ? "0px 10px 0px 0px" : "0px 0px 0px 10px"};
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 5px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 5px;
  font-size: 14px;
  height: 200px;
  border: 0.1px solid lightgray;
  resize: vertical;
`;

const Label = styled.div``;

const Span = styled.span`
  color: red;
`;

const ButtonContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  display: flex;
`;

const Button = styled.button`
  width: 400px;
  font-weight: 700;
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

const LoadingContainer = styled.div`
  display: flex;
  width: 400px;
  background-color: transparent;
  border: 1px solid #c9366f;
  border-radius: 5px;
  transition: all 0.5s ease;
  cursor: not-allowed;
  align-items: center;
  justify-content: center;
`;

const UpdatePending = () => {
  const refName = useRef(null);
  const refTag = useRef(null);
  const refDonateNeed = useRef(null);
  const refDayFinish = useRef(null);
  const refDonateAmount = useRef(null);
  const refDescription = useRef(null);
  const [file, setFile] = useState("");
  const [isSave, setIsSave] = useState("notsave");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.user);
  const handleClick = (e) => {
    try {
      e.preventDefault();
      setIsSave("issave");
      const title = refName.current.value;
      const tag = refTag.current.value.split(",");
      const donateneed = refDonateNeed.current.value;
      const day = refDayFinish.current.value;
      const dayfinish = new Date(day).toISOString();
      const donateamounts = refDonateAmount.current.value.split(",");
      const description = refDescription.current.value;
      const username = user._id;
      if (file.name !== undefined) {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((img) => {
                addPending(dispatch, {
                  title,
                  username,
                  tag,
                  donateneed,
                  dayfinish,
                  donateamounts,
                  description,
                  img,
                });
              })
              .then(setIsSave("done"));
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (isSave === "done" && !isFetching) navigate("/profile");
  }, [isSave, isFetching]);
  return (
    <Container>
      <Navbar />
      <TitleContainer>
        <Title>Chỉnh sửa dự án</Title>
      </TitleContainer>
      <BorderContainer>
        <Border>
          <PendingCampaign />
        </Border>
      </BorderContainer>
      <ContainerInput>
        <Label>
          Hình ảnh dự án <Span>*</Span>
        </Label>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/png, image/gif, image/jpeg"
        ></Input>
        <Label>
          Tên dự án <Span>*</Span>
        </Label>
        <Input ref={refName}></Input>
        <Label>
          tag <Span>*</Span>
        </Label>
        <Input ref={refTag}></Input>
        <ContainerRow>
          <Wrapper position="left">
            <Label name="gender">
              Số tiền cần <Span>*</Span>
            </Label>
            <Input ref={refDonateNeed} />
          </Wrapper>
          <Wrapper position="right">
            <Label>
              Ngày kết thúc <Span>*</Span>
            </Label>
            <Input type="date" ref={refDayFinish} />
          </Wrapper>
        </ContainerRow>
        <Label>
          Mức ủng hộ <Span>*</Span>
        </Label>
        <Input ref={refDonateAmount}></Input>
        <Label>
          Miêu tả dự án <Span>*</Span>
        </Label>
        <TextArea ref={refDescription}></TextArea>
        <ButtonContainer>
          {isSave === "issave" ? (
            <LoadingContainer>
              <CircularProgress
                style={{ marginTop: "6px", marginBottom: "6px" }}
              ></CircularProgress>
            </LoadingContainer>
          ) : (
            <Button onClick={(e) => handleClick(e)}>Lưu cập nhật</Button>
          )}
        </ButtonContainer>
      </ContainerInput>
      <Footer />
    </Container>
  );
};

export default UpdatePending;
