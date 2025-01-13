import Header from "../organisms/Header";

type HomePage = {};

const HomePage = (homePage: HomePage) => {
  return (
    <>
      <Header title='健康管理アプリ' userName='健康 太郎' textColor='white' />
      Home 画面
    </>
  );
};

export default HomePage;
