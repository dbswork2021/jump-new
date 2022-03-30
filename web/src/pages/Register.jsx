import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import 'assets/css/login.css';
import { RegisterApi } from 'utils/api';

const Register = () => {
  const onFinish = (values) => {
    RegisterApi(values).then((res) => {
      console.log(res);
      localStorage.__web_token = res.data.token;
      window.location.reload();
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
          <Form.Item
            name="confirm"
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="safeCode"
            rules={[{ required: true, message: '请输入安全码!' }]}
          >
            <Input placeholder="安全码" prefix={<SafetyOutlined />} />
          </Form.Item>

          <Form.Item name="remember">
            <Link to="/login">已有账号？立即登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
