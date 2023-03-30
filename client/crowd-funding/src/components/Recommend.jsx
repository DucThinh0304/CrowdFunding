import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
  
`;
const VideoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;


const Video = styled.video`
    width: 100vw;
    z-index: 2;
    height: 720px;
    object-fit: cover;
`;

const Source = styled.source`
  
`;

const FilterVideo = styled.div`
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const ImageAddress = styled.a`
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    
`

const Image = styled.img`
  max-width: 100%;
  cursor: pointer;
`;

const TextContainer = styled.div`
  padding: 70px 0px 80px 0px;  
  background: linear-gradient(90deg, #8d072f 5%,#ff5997 80%);
  display:flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  text-align:center;
  font-size: 36px;
  color: white;
  font-weight: 500;
  height: 153px;
  display:flex;
`;

const Recommend = () => {
  return (
    <Container>
        <VideoContainer>
                <Video autoPlay muted loop>
                    <Source type="video/mp4" src="https://crowdfunding.comicola.com/wp-content/uploads/2022/11/hoathinhtho2_resize.mp4"/>
                </Video>
                <FilterVideo/>
                <ImageAddress>
                    <Image src='https://crowdfunding.comicola.com/wp-content/uploads/2022/11/thobaymau_call_to_action_btn_resize.png'/>
                </ImageAddress>
        </VideoContainer>
        <TextContainer>
            <Text>
                Nền tảng gây quỹ cộng đồng<br/>
                cho các dự án văn hóa sáng tạo
            </Text>
        </TextContainer>
    </Container>
  )
}

export default Recommend