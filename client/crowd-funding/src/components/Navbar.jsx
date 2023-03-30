import { Search } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
  height: 94px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const ImageLogo = styled.img`
  width: 146px;
  margin: 0px 25px;
`;

const Left = styled.div`
  flex:1;
`;

const Center = styled.div`
  flex:2;
  display: flex;
  align-items: left;
  justify-content: flex-start;
`;

const Right = styled.div`
  flex:1;
  align-items: center;
`;


const WrapLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  font-size: 14px;
  align-content: space-between;
  &:hover{
    color: #c9366f;
  }
  font-weight: 500;
  transition: all 0.2s ease;
  color: ${props => Number(props.Id) === 2 ? '#c9366f' : 'black'};
`;

const Icon = styled.div`
  width: 14px;
  height: 14px;
  justify-content: center;
  align-items: center;
  display:flex;
  cursor: pointer;
`

const Login = styled.a`
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  font-size: 14px;
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <ImageLogo src="https://crowdfunding.comicola.com/wp-content/uploads/2021/06/comicola_crowdfunding_logo-1.png"/>
          </Logo >
        </Left>
        <Center>
          <Link Id={1}>Trang chủ</Link>
          <Link Id={2}>Toàn bộ các dự án</Link>
          <Link Id={3}>Liên hệ</Link>
        </Center>
        <Right>
          <WrapLogin>
            <Icon>
              <Search />
            </Icon>
            <Login>
              <b>Đăng nhập</b>
            </Login>/<Login>
              <b>Đăng xuất</b>
            </Login>
          </WrapLogin>
        </Right>
      </Wrapper>
    </Container>
  );
}


export default Navbar