import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setting } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const ContainerRow = styled.div`
  display: flex;
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

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 5px;
  font-size: 14px;
`;

const Label = styled.div``;

const Span = styled.span`
  color: red;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccountSetting = () => {
  const refId = useRef(null);
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const refGender = useRef(null);
  const refBirth = useRef(null);
  const [file, setFile] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const _id = refId.current.value;
    const name = refName.current.value;
    const email = refEmail.current.value;
    const phone = refPhone.current.value;
    const gender = refGender.current.value;
    const birth = refBirth.current.value;
    const birthday = new Date(birth).toISOString();
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
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((avt) => {
            setting(dispatch, {
              _id,
              name,
              email,
              phone,
              gender,
              birthday,
              avt,
            });
          });
        }
      );
    }
    setting(dispatch, {
      _id,
      name,
      email,
      phone,
      gender,
      birthday,
    });
  };

  const date = (day) => {
    return new Date(day).toISOString().substring(0, 10);
  };

  return !user ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      <Label>Avatar</Label>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/png, image/gif, image/jpeg"
      ></Input>
      <Label>Tên đăng nhập</Label>
      <Input defaultValue={user.username} disabled></Input>
      <Label>ID</Label>
      <Input defaultValue={user._id} ref={refId} disabled></Input>
      <ContainerRow>
        <Wrapper position="left">
          <Label name="gender">Giới tính</Label>
          <Select
            id="selectedBox"
            ref={refGender}
            value={user.gender === "" ? "male" : user.gerder}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="different">Khác</option>
          </Select>
        </Wrapper>
        <Wrapper position="right">
          <Label>Ngày sinh</Label>
          <Input
            type="date"
            ref={refBirth}
            defaultValue={date(user.birthday)}
          />
        </Wrapper>
      </ContainerRow>
      <Label>
        Họ và Tên <Span>*</Span>
      </Label>
      <Input defaultValue={user.name ? user.name : ""} ref={refName}></Input>
      <Label>Địa chỉ Email</Label>
      <Input defaultValue={user.email ? user.email : ""} ref={refEmail}></Input>
      <Label>
        Số điện thoại <Span>*</Span>
      </Label>
      <Input
        defaultValue={user.phonenumber ? user.phonenumber : ""}
        ref={refPhone}
      ></Input>
      <ButtonWrapper>
        <Button onClick={(e) => handleClick(e)}>Lưu thông tin</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default AccountSetting;
