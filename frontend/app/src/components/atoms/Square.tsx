// import React from "react";
// import styled from "styled-components";

// // Styled Component の作成
// const BackgroundBox = styled.div`
//   width: 300px; /* 幅 */
//   height: 200px; /* 高さ */
//   background-color: #f0f0f0; /* 背景色 */
//   border-radius: 20px; /* 角丸 */
//   margin: 20px auto; /* センター寄せ */
//   display: flex; /* 中央寄せの準備 */
//   justify-content: center; /* 横方向中央寄せ */
//   align-items: center; /* 縦方向中央寄せ */
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 影の追加 (オプション) */
// `;

// type Square = {
//   width: string /* 幅 */;
//   height: string /* 高さ */;
//   backgroundColor: string | undefined /* 背景色 */;
//   //   borderRadius: string | undefined /* 角丸 */;
//   //   margin: string | undefined /* センター寄せ */;
//   //   display: string | undefined /* 中央寄せの準備 */;
//   //   justifyContent: string | undefined /* 横方向中央寄せ */;
//   //   alignItems: string | undefined /* 縦方向中央寄せ */;
//   //   boxShadow: string | undefined /* 影の追加 (オプション) */;
// };

// // styled
// const StyledSquare = styled.div<{
//   width: string;
//   height: string;
//   backgroundColor: string | undefined;
// }>`
//   width: ${(props) => props.width}; /* 幅 */
//   height: ${(props) => props.height}; /* 高さ */
//   background-color: ${(props) => props.backgroundColor}; /* 背景色 */
//   border-radius: 20px; /* 角丸 */
//   margin: 20px auto; /* センター寄せ */
//   display: flex; /* 中央寄せの準備 */
//   justify-content: center; /* 横方向中央寄せ */
//   align-items: center; /* 縦方向中央寄せ */
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 影の追加 (オプション) */
// `;

// // メインコンポーネント
// const Square = (square: Square) => {
//   const { width, height, backgroundColor } = square;

//   return (
//     <>
//       <StyledSquare
//         width={width}
//         height={height}
//         backgroundColor={backgroundColor}
//       >
//         <h2>アカウント作成</h2>
//         ニックネームを入力してください
//         {/* <Input
//           type='text'
//           value={password}
//           placeholder='ニックネーム'
//           onChange={undefined}
//         /> */}
//       </StyledSquare>
//     </>
//   );
// };

// export default Square;

import React from "react";

type Square = {
  width?: number;
  height?: number;
  color?: string;
  borderRadius?: number;
};

const Square = ({
  width = 100,
  height = 50,
  color = "blue",
  borderRadius = 0,
}: Square) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x='0'
        y='0'
        width={width}
        height={height}
        rx={borderRadius}
        fill={color}
      />
    </svg>
  );
};

export default Square;
