import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "../../dvhcvn.json";
import { useSelector } from "react-redux";

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

const AddAddress = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {}, [province]);

  const reset = (e) => {
    setWard("");
    setDistrict("");
    setProvince(e.target.value);
  };

  return (
    <Container>
      <Title>Thêm địa chỉ mới</Title>
      <Label>
        Nhập họ và tên <Span>*</Span>
      </Label>
      <Input />
      <Label>
        Tỉnh/Thành phố <Span>*</Span>
      </Label>
      <Select value={province} onChange={(e) => reset(e)}>
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
      <Input />
      <Label>
        Số điện thoại <Span>*</Span>
      </Label>
      <Input />
      <Label>
        Địa chỉ Email <Span>*</Span>
      </Label>
      <Input value={user.email} />
    </Container>
  );
};

export default AddAddress;
