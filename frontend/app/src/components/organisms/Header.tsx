import styled from "styled-components";
import SettingImage from "./setting.svg";

type Header = {
  title: string;
  userName: string;
  textColor: string;
};

const Header = (header: Header) => {
  const { title, userName, textColor } = header;

  /* style */
  const StyledHeader = styled.h1`
    color: ${textColor};
  `;
  const StyledUserName = styled.span`
    font-weight: bold;
    color: ${textColor};
  `;
  const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #8cb33e;
  `;

  const StyledImg = styled.img`
    width: 20px;
    height: auto;
    margin-right: 10px;
  `;

  const UserSection = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `;

  return (
    <HeaderContainer>
      <StyledHeader>{title}</StyledHeader>
      <UserSection>
        <StyledImg src={SettingImage} alt={"設定"} />
        <StyledUserName>{userName}</StyledUserName>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
