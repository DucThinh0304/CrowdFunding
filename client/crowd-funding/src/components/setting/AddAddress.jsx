import React, { useState } from "react";
import styled from "styled-components";
import data from "../../dvhcvn.json";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 20px;
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

const AddAddress = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = (e) => {
    setWard("");
    setDistrict("");
    setProvince(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    addAddress(dispatch, {
      name,
      businessName,
      address,
      phonenumber: phone,
      email,
      province,
      district,
      ward,
      username: `${user._id}`,
    });
    navigate("/my-account/address");
  };

  return (
    <Container>
      <Title>Thêm địa chỉ mới</Title>
      <Label>
        Nhập họ và tên <Span>*</Span>
      </Label>
      <Input onChange={(e) => setName(e.target.value)} />
      <Label>Nhập tên công ty (không bắt buộc)</Label>
      <Input onChange={(e) => setBusinessName(e.target.value)} />
      <Label>
        Tỉnh/Thành phố <Span>*</Span>
      </Label>
      <Select value={province} onChange={(e) => handleReset(e)}>
        <option value="" disabled>
          Chọn tỉnh/thành phố
        </option>
        {data.data.map((city) => (
          <option key={city.level1_id + "_city"} value={city.id}>
            {city.name}
          </option>
        ))}
      </Select>
      <Label>
        Quận/Huyện <Span>*</Span>
      </Label>
      <Select value={district} onChange={(e) => setDistrict(e.target.value)}>
        <option value="" disabled>
          Chọn quận/huyện
        </option>
        {province !== "" ? (
          data.data
            .find((city) => city.name === province)
            .level2s.map((district) => (
              <option
                key={district.level2_id + "_district"}
                value={district.id}
              >
                {district.name}
              </option>
            ))
        ) : (
          <option></option>
        )}
      </Select>
      <Label>
        Xã/Phường/Thị trấn <Span>*</Span>
      </Label>
      <Select value={ward} onChange={(e) => setWard(e.target.value)}>
        <option value="" disabled>
          Chọn Xã/Phường/Thị trấn
        </option>
        {district !== "" ? (
          data.data
            .find((city) => city.name === province)
            .level2s.find((city) => city.name === district)
            .level3s.map((ward) => (
              <option key={ward.level3_id + "ward"} value={ward.id}>
                {ward.name}
              </option>
            ))
        ) : (
          <option></option>
        )}
      </Select>
      <Label>
        Địa chỉ <Span>*</Span>
      </Label>
      <Input onChange={(e) => setAddress(e.target.value)} />
      <Label>
        Số điện thoại <Span>*</Span>
      </Label>
      <Input onChange={(e) => setPhone(e.target.value)} />
      <Label>
        Địa chỉ Email <Span>*</Span>
      </Label>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        defaultValue={user.email}
      />
      <Button onClick={(e) => handleSave(e)}>Lưu thông tin</Button>
    </Container>
  );
};

export default AddAddress;
