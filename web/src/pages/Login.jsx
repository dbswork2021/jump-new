import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'assets/css/login.css';
import { LoginApi } from 'utils/api';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    LoginApi(values).then((res) => {
      localStorage.__web_token = res.data.token;
      navigate('/admin');
    });
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="logo"></div>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="用户名" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号？立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
