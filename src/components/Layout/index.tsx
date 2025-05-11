import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './index.less';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout className="main-layout">
      <Header>
        <div className="header-content">
          Anime Search
        </div>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer>
        Anime Search ©{new Date().getFullYear()} Created with ❤️
      </Footer>
    </Layout>
  );
};

export default MainLayout; 