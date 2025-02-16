import styled from "styled-components";
import SettingImage from "./setting.svg";
import Button from "../atoms/Button";

type HeaderProps = {
  title: string;
  userName?: string; // ユーザー名（任意）
  textColor?: string;
  showBackButton?: boolean; // 戻るボタンの表示切り替え
  showSettingsButton?: boolean; // 設定ボタンの表示切り替え
};

const Header: React.FC<HeaderProps> = ({
  title,
  userName,
  textColor = "white",
  showBackButton = false,
  showSettingsButton = true,
}) => {
  /* スタイル定義 */
  const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #8cb33e;
  `;

  const StyledHeader = styled.h1`
    color: ${textColor};
    margin: 0;
    font-size: 24px;
  `;

  const StyledUserName = styled.span`
    font-weight: bold;
    color: ${textColor};
    margin-right: 10px;
  `;

  const StyledImg = styled.img`
    width: 20px;
    height: auto;
    margin-left: 10px;
  `;

  const UserSection = styled.div`
    display: flex;
    align-items: center;
  `;

  return (
    <HeaderContainer>
      {/* 戻るボタン */}
      {showBackButton && (
        <Button
          label="戻る"
          type="button"
          onClick={() => window.history.back()}
        />
      )}

      {/* タイトル */}
      <StyledHeader>{title}</StyledHeader>

      {/* ユーザー情報＆設定ボタン */}
      <UserSection>
        {userName && <StyledUserName>{userName}</StyledUserName>}
        {showSettingsButton && <StyledImg src={SettingImage} alt="設定" />}
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
