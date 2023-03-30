import React from 'react'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHandshakeAngle, faChartPie, faGear, faTruckLoading } from '@fortawesome/free-solid-svg-icons'



const Container = styled.div`
    background-color: #f2f2f2;
    padding: 70px 60px;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const Left = styled.div`
    flex: 1;
    padding: 0px 15px;
    justify-content: flex-end ;
    align-items: center;
    display: flex;
`;

const TextContainer = styled.div`
    max-width: 540px;
    width: 21vw;
    margin: 0px 15px;
    background-color: white;
    padding: 80px 70px 30px; 
`;

const Title = styled.h3`
    color: #C9366F;
    font-size: 36px;
    font-weight: 300;
    flex-direction: column;
    display: flex;
    line-height: 1.44em;
    margin-bottom: 20px;
`;

const Text = styled.p`
    line-height: 1.7em;
    font-size: 21px;
    font-weight: 300;
    margin-bottom: 40px;
`;

const Right = styled.div`
    flex: 1;
    padding: 0px 15px;
`;

const InstructionContainer = styled.div`
    width: 452.55px;
    padding: 0px 15px;
`;

const InstructionTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

`;

const InstructionBottom = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

const Instruction = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    margin: 0px 15px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #C9366F;
  font-size: 60px;
  font-weight: 900;
  box-sizing: inherit;
  text-align: center;
`;

const InstructionTitle = styled.h3`
  text-align: center;
  font-size: 18px;
  margin: 10px 0px;
`;

const InstructionDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin: 10px 0px;
`;

const Howto = () => {
  return (
    <Container>
        <Left>
            <TextContainer>
                <Title>Làm sao để có được dự án crowdfunding thành công?</Title>
                <Text>Một vài bí kíp nho nhỏ đến từ kinh nghiệm quản lý dự án crowdfunding của chúng tôi.</Text>
            </TextContainer>
        </Left>
        <Right>
            <InstructionContainer>
                <InstructionTop>
                    <Instruction>
                        <Icon icon={faHandshakeAngle}/>
                        <InstructionTitle>Hợp tác & hỗ trợ</InstructionTitle>
                        <InstructionDesc>Hãy xem những người ủng hộ như đối tác tiềm năng của bạn</InstructionDesc>
                    </Instruction>
                    <Instruction>
                        <Icon icon={faChartPie}/>
                        <InstructionTitle>Chi tiết về chi tiêu</InstructionTitle>
                        <InstructionDesc>Thông tin cụ thể về cách sử dụng nguồn vốn</InstructionDesc>
                    </Instruction>
                </InstructionTop>
                <InstructionBottom>
                    <Instruction>
                        <Icon icon={faGear}/>
                        <InstructionTitle>Tập trung sản xuất</InstructionTitle>
                        <InstructionDesc>Dành hết thời gian cho đứa con tinh thần của mình</InstructionDesc>
                    </Instruction>
                    <Instruction>
                        <Icon icon={faTruckLoading}/>
                        <InstructionTitle>Bàn giao đúng hạn</InstructionTitle>
                        <InstructionDesc>Đúng hạn giúp bạn tăng uy tín và nhận được sự tin tưởng</InstructionDesc>
                    </Instruction>
                </InstructionBottom>
            </InstructionContainer>
        </Right>
    </Container>
  )
}

export default Howto