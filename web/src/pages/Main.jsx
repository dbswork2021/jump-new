import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

export default function Main() {
  const [menuKey, setMenuKey] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.__web_token) {
      navigate('/login');
    }
    setMenuKey(pathname);
  }, [pathname]);
  const Logout = () => {
    localStorage.removeItem('__web_token');
    navigate('/login');
  };
  return (
    <Layout className="content" style={{ height: '100vh' }}>
      <Header style={{ width: '100%' }}>
        <Menu theme="dark" mode="horizontal" selectedKeys={[menuKey]}>
          <Menu.Item key="/admin">
            <Link to="/admin">主页</Link>
          </Menu.Item>
          <Menu.Item key="/admin/stats">
            <Link to="stats">统计信息</Link>
          </Menu.Item>
          <Menu.Item key="/admin/url">
            <Link to="url">跳转链接</Link>
          </Menu.Item>
          <Menu.Item key="/admin/agent">
            <Link to="agent">代理中心</Link>
          </Menu.Item>
          <Menu.Item key="/admin/user">
            <Link to="user">用户中心</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            style={{ marginLeft: 'auto', color: '#ffffff' }}
          >
            <p onClick={Logout}>退出登录</p>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '10px 30px', background: '#fff' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
