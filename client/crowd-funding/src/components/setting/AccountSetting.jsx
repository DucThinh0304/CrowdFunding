import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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

const Button = styled.button``;

const AccountSetting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const today = new Date();

  return !user ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      <Label>Tên đăng nhập</Label>
      <Input defaultValue={user.username} disabled></Input>
      <ContainerRow>
        <Wrapper position="left">
          <Label name="gender">Giới tính</Label>
          <Select>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="different">Khác</option>
          </Select>
        </Wrapper>
        <Wrapper position="right">
          <Label>Ngày sinh</Label>
          <Input type="date" />
        </Wrapper>
      </ContainerRow>
      <Label>
        Họ và Tên <Span>*</Span>
      </Label>
      <Input
        defaultValue={user.name ? user.name : ""}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      <Label>Địa chỉ Email</Label>
      <Input
        defaultValue={user.email ? user.email : ""}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Label>
        Số điện thoại <Span>*</Span>
      </Label>
      <Input
        defaultValue={user.phonenumber ? user.phonenumber : ""}
        onChange={(e) => setPhone(e.target.value)}
      ></Input>

      <Button>Lưu thông tin</Button>
    </Container>
  );
};

export default AccountSetting;
