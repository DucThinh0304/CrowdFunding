import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changePassword, setting } from "../../redux/apiCalls";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
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

const PasswordContainer = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
`;

const PasswordInput = styled.input`
  padding: 15px;
  flex: 1;
  min-width: 40%;
  font-size: 18px;
  display: inline-block;
  position: relative;
`;

const Label = styled.div``;

const Span = styled.span`
  color: red;
`;

const Password = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [type, setType] = useState("password");
  const [typeNewPassword, setTypeNewPassword] = useState("password");
  const [typeRePassword, setTypeRePassword] = useState("password");
  const user = useSelector((state) => state.user.currentUser);
  const handleClick = (e) => {
    e.preventDefault();
    changePassword(dispatch, user._id, {
      password,
      newPassword,
      rePassword,
    });
  };

  const changeType = () => {
    if (type === "password") setType("text");
    else setType("password");
  };
  const changeTypeNewPassword = () => {
    if (typeNewPassword === "password") setTypeNewPassword("text");
    else setTypeNewPassword("password");
  };
  const changeTypeRePassword = () => {
    if (typeRePassword === "password") setTypeRePassword("text");
    else setTypeRePassword("password");
  };
  return !user ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : (
    <Container>
      <Label>
        Mật khẩu hiện tại <Span>*</Span>
      </Label>
      <PasswordContainer>
        <PasswordInput
          placeholder="Mật khẩu"
          type={type}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "password" ? (
          <VisibilityIcon className="visibility" onClick={() => changeType()} />
        ) : (
          <VisibilityOffIcon
            className="visibility"
            onClick={() => changeType()}
          />
        )}
      </PasswordContainer>
      <Label>
        Mật khẩu mới <Span>*</Span>
      </Label>
      <PasswordContainer>
        <PasswordInput
          placeholder="Mật khẩu"
          type={typeNewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {typeNewPassword === "password" ? (
          <VisibilityIcon
            className="visibility"
            onClick={() => changeTypeNewPassword()}
          />
        ) : (
          <VisibilityOffIcon
            className="visibility"
            onClick={() => changeTypeNewPassword()}
          />
        )}
      </PasswordContainer>
      <Label>
        Nhập lại mật khẩu <Span>*</Span>
      </Label>
      <PasswordContainer>
        <PasswordInput
          placeholder="Mật khẩu"
          type={typeRePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        {typeRePassword === "password" ? (
          <VisibilityIcon
            className="visibility"
            onClick={() => changeTypeRePassword()}
          />
        ) : (
          <VisibilityOffIcon
            className="visibility"
            onClick={() => changeTypeRePassword()}
          />
        )}
      </PasswordContainer>
      <Button onClick={(e) => handleClick(e)}>Đổi mật khẩu</Button>
    </Container>
  );
};

export default Password;
