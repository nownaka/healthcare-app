import React from "react";
import styled from "styled-components";
import CharacterDisplay from "../molecules/CharacterDisplay"; // ← 追加

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 20px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    padding: 6px 10px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

  button {
    flex: 1;
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 5px;

    &:first-child {
      background-color: #007bff;
      color: white;
    }

    &:last-child {
      background-color: #e0e0e0;
    }
  }
`;

type Props = {
  dateLabel: string;
  weight: string;
  sleep: string;
  calories: string;
  exercise: string;
  setWeight: (val: string) => void;
  setSleep: (val: string) => void;
  setCalories: (val: string) => void;
  setExercise: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;

  // 🔽 キャラクター表示用の追加 props
  showCharacter?: boolean;
  characterData?: {
    message: string;
    imagePath: string;
    audioPath: string;
  } | null;
  onCharacterClose?: () => void;
};

const RecordModal: React.FC<Props> = ({
  dateLabel,
  weight,
  sleep,
  calories,
  exercise,
  setWeight,
  setSleep,
  setCalories,
  setExercise,
  onSave,
  onCancel,
  showCharacter,
  characterData,
  onCharacterClose,
}) => {
  return (
    <Overlay>
      <ModalBox>
        <ModalTitle>{dateLabel}</ModalTitle>

        <InputGroup>
          <label>体重 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>睡眠時間 (h)</label>
          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>摂取カロリー (kcal)</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>運動量 (分)</label>
          <input
            type="number"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </InputGroup>

        <ButtonGroup>
          <button onClick={onSave}>保存</button>
          <button onClick={onCancel}>キャンセル</button>
        </ButtonGroup>
      </ModalBox>

      {/* 🔽 キャラクター表示（表示条件と props チェック） */}
      {showCharacter && characterData && onCharacterClose && (
        <CharacterDisplay
          message={characterData.message}
          imagePath={characterData.imagePath}
          audioPath={characterData.audioPath}
          onClose={onCharacterClose}
        />
      )}
    </Overlay>
  );
};

export default RecordModal;
