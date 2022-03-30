import { Table, Tag, Button, Form, Input, Drawer, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { AgentApi, AgentAddApi, AgentEditApi, AgentDelApi } from 'utils/api';

const { Column } = Table;

const Agent = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [urlsSource, setUrlsSource] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    AgentApi().then((res) => {
      let arr = [];
      let urlsArr = [];
      res.data.data.forEach((element) => {
        arr.push({
          ...element,
          key: element._id,
          nick: element.urls.map((item) => item.nick),
          urls: element.urls.map((item) => item._id),
          downurl:
            'http://' + window.location.host + '/#/download/' + element._id,
          createTime: new Date(element.createTime).toLocaleString(),
        });
      });
      res.data.urls.forEach((element) => {
        urlsArr.push({
          ...element,
          key: element._id,
          label: element.nick,
          value: element._id,
        });
      });
      setUrlsSource(urlsArr);
      setDataSource(arr);
    });
  };
  const onAdd = (values) => {
    AgentAddApi(values).then((res) => {
      form.resetFields();
      init();
    });
  };

  const onEdit = (text) => {
    editForm.setFieldsValue(text);
    setVisible(true);
  };

  const onDel = (key) => {
    const params = { id: key };
    AgentDelApi(params).then(() => {
      const newDataSource = dataSource.filter((item) => item.key !== key);
      setDataSource(newDataSource);
    });
  };

  const onClose = () => {
    editForm.resetFields();
    setVisible(false);
  };
  const onFinish = (values) => {
    AgentEditApi(values).then((res) => {
      init();
      editForm.resetFields();
      setVisible(false);
    });
  };
  return (
    <div>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onAdd}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入代理名称!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="代理名称" />
        </Form.Item>
        <Form.Item
          name="urls"
          style={{ width: '600px' }}
          rules={[{ required: true, message: '请选择代理的跳转链接!' }]}
        >
          <Select mode="multiple" options={urlsSource} placeholder="跳转链接" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              添加
            </Button>
          )}
        </Form.Item>
      </Form>
      <Table dataSource={dataSource}>
        <Column title="昵称" dataIndex="name" key="name" />
        <Column
          title="链接标识"
          dataIndex="nick"
          key="nick"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column title="下载地址" dataIndex="downurl" key="downurl" />
        <Column title="时间" dataIndex="createTime" key="createTime" />
        <Column
          title="操作"
          key="action"
          align="right"
          render={(_, text) => (
            <div>
              <Button
                type="primary"
                style={{ marginRight: '3px' }}
                onClick={() => onEdit(text)}
              >
                编辑
              </Button>
              <Button type="primary" danger onClick={() => onDel(text.key)}>
                删除
              </Button>
            </div>
          )}
        />
      </Table>
      <Drawer
        title="编辑代理"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Form form={editForm} name="horizontal_login" onFinish={onFinish}>
          <Form.Item style={{ display: 'none' }} name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入代理名称!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="代理名称" />
          </Form.Item>
          <Form.Item
            name="urls"
            rules={[{ required: true, message: '请选择代理的跳转链接!' }]}
          >
            <Select
              mode="multiple"
              options={urlsSource}
              placeholder="跳转链接"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Agent;
