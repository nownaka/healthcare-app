import React from "react";
import styled from "styled-components";

type DropdownMenuProps = {
  onNavigate: (path: string) => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onNavigate,
}) => {
  return (
    <MenuContainer>
      <MenuItem onClick={() => onNavigate("/home")}>🏠 ホーム</MenuItem>
      <MenuItem onClick={() => onNavigate("/settings")}>⚙️ 設定</MenuItem>
      <MenuItem onClick={() => onNavigate("/terms")}>📄 利用規約</MenuItem>
      <MenuItem onClick={() => onNavigate("/logout")}>🚪 ログアウト</MenuItem>
    </MenuContainer>
  );
};

export default DropdownMenu;

/* スタイリング */
const MenuContainer = styled.div`
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

const MenuItem = styled.button`
  background: none;
  border: none;
  text-align: left;
  padding: 8px 12px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background: #f4f4f4;
  }
`;
