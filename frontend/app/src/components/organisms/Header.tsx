import styled from "styled-components";
import SettingImage from "./setting.svg"

const StyledHeader = styled.h1`
    color: red;
`
const StyledImg = styled.img`
    width: 20px;
    height: auto;
`

type Header = {

}

const Header = (text: Header) => { 
    const title = "健康管理アプリ(仮)"
    const userName = "山田 太郎"

    return (
        <>
            <StyledHeader>{title}</StyledHeader>
            <StyledImg src={SettingImage} alt={"設定"} />
            {userName}
        </>
    )

}

export default Header