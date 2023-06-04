import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../../requestMethod";
import { Link, useLocation } from "react-router-dom";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";

const Container = styled.div`
  width: 75%;
`;

const CircularProgressContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 50px;
`;
const Label = styled.div``;

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

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  transition: all 0.5s ease;
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InformationWrapper = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-weight: 700;
`;

const PhoneNumber = styled.div``;

const Location = styled.div``;

const ButtonSetting = styled.button`
  font-weight: 500;
  background-color: transparent;
  text-transform: uppercase;
  color: #0275d8;
  padding: 15px 8px;
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

const Address = () => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const subpage = location.pathname.split("/")[3];

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const resAddress = await userRequest.get(`/addresses/find/${user._id}`);
        setAddresses(resAddress.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAddresses();
  }, [user._id]);

  return loading ? (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  ) : addresses.length === 0 ? (
    <Container>
      <Label>Bạn chưa có địa chỉ nào</Label>
      <Button>Thêm địa chỉ</Button>
    </Container>
  ) : subpage === "add-address" ? (
    <Container>
      <AddAddress />
    </Container>
  ) : subpage === "edit-address" ? (
    <Container>
      <EditAddress />
    </Container>
  ) : (
    <Container>
      {addresses.map((address) => (
        <AddressContainer key={address._id}>
          <AddressWrapper>
            <InformationWrapper>
              <Name>{address.name}</Name> |
              <PhoneNumber>{address.phonenumber}</PhoneNumber>
            </InformationWrapper>
            <Location>
              {address.province}, {address.district}, {address.ward}
            </Location>
            <Location>{address.address}</Location>
          </AddressWrapper>
          <Link to={`./edit-address/${address._id}`}>
            <ButtonSetting>Sửa lại địa chỉ</ButtonSetting>
          </Link>
        </AddressContainer>
      ))}
      <Link to="./add-address">
        <Button>Thêm địa chỉ mới</Button>
      </Link>
    </Container>
  );
};

export default Address;
