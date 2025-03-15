import React, { useState } from "react";
import styled from "styled-components";
import SettingImage from "./setting.svg";
import Button from "../atoms/Button";

type HeaderProps = {
  title: string;
  userName?: string;
  textColor?: string;
  onMenuClick?: (menu: string) => void; // ✅ 追加
};

const Header: React.FC<HeaderProps> = ({
  title,
  userName,
  textColor = "white",
  onMenuClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuClick) onMenuClick("menu"); // ✅ 外部からメニュー開閉を制御可能に
  };

  return (
    <HeaderContainer>
      <StyledHeader textColor={textColor}>{title}</StyledHeader>

      <UserSection>
        {userName && (
          <StyledUserName textColor={textColor}>{userName}</StyledUserName>
        )}
        <StyledImg src={SettingImage} alt="設定" onClick={toggleMenu} />

        {isMenuOpen && (
          <DropdownMenu>
            <Button
              label="プロフィール設定"
              type="button"
              onClick={() => onMenuClick && onMenuClick("settings")}
            />
            <Button
              label="利用規約"
              type="button"
              onClick={() => onMenuClick && onMenuClick("terms")}
            />
            <Button
              label="ログアウト"
              type="button"
              onClick={() => onMenuClick && onMenuClick("logout")}
            />
          </DropdownMenu>
        )}
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;

/* スタイリング */
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #8cb33e;
  position: relative;
`;

const StyledHeader = styled.h1<{ textColor: string }>`
  color: ${(props) => props.textColor};
  margin: 0;
  font-size: 24px;
`;

const StyledUserName = styled.span<{ textColor: string }>`
  font-weight: bold;
  color: ${(props) => props.textColor};
  margin-right: 10px;
`;

const StyledImg = styled.img`
  width: 30px;
  height: auto;
  cursor: pointer;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
`;
