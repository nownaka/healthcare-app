import React, { useEffect, useState } from "react";
import styled from "styled-components";

// キャラクター表示のコンテナ
const CharacterContainer = styled.div`
  position: fixed;
  bottom: 0vh;
  right: 0vw;
  z-index: 1000;
  background: transparent;
  padding: 20px;
  max-width: 40vw;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CharacterImage = styled.img`
  width: 25vw;
  height: 25vw;
  max-width: 1000px;
  max-height: 1000px;
  min-width: 300px;
  min-height: 300px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background: #f0f8ff;
  border: 2px solid #4a90e2;
  border-radius: 15px;
  padding: 15px;
  position: relative;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.4;
  color: #333;

  &::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #4a90e2;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #f0f8ff;
  }
`;

const CloseButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-top: 10px;

  &:hover {
    background: #ff5252;
  }
`;

// キャラクター表示の型定義
export interface CharacterDisplayProps {
  message: string;
  imagePath: string;
  audioPath: string;
  onClose: () => void;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  message,
  imagePath,
  audioPath,
  onClose,
}) => {
  const [audio] = useState(new Audio(audioPath));

  useEffect(() => {
    // 音声を再生
    audio.play().catch((error) => {
      console.error("音声の再生に失敗しました:", error);
    });

    // 音声終了時の処理
    const handleAudioEnd = () => {
      // 音声終了後、5秒後に自動で閉じる
      setTimeout(() => {
        onClose();
      }, 5000);
    };

    audio.addEventListener("ended", handleAudioEnd);

    // クリーンアップ
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, onClose]);

  return (
    <CharacterContainer>
      <MessageBubble>{message}</MessageBubble>
      <CharacterImage src={imagePath} alt="ずんだもん" />
      <CloseButton onClick={onClose}>×</CloseButton>
    </CharacterContainer>
  );
};

export default CharacterDisplay;
