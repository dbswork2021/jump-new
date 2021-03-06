import { Table, Button, Form, Input, Drawer } from 'antd';
import { UserOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { UrlApi, UrlAddApi, UrlEditApi, UrlDelApi } from 'utils/api';

const { Column } = Table;

const Url = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    UrlApi().then((res) => {
      let arr = [];
      res.data.forEach((element) => {
        arr.push({
          ...element,
          key: element._id,
          createTime: new Date(element.createTime).toLocaleString(),
        });
      });
      setDataSource(arr);
    });
  }, []);

  const onAdd = (values) => {
    UrlAddApi(values).then((res) => {
      form.resetFields();
      let arr = [...dataSource];
      arr.unshift({
        ...res.data.data,
        key: res.data.data._id,
        createTime: new Date(res.data.data.createTime).toLocaleString(),
      });
      setDataSource(arr);
    });
  };

  const onEdit = (text) => {
    editForm.setFieldsValue(text);
    setVisible(true);
  };

  const onDel = (key) => {
    const params = { id: key };
    UrlDelApi(params).then(() => {
      const newDataSource = dataSource.filter((item) => item.key !== key);
      setDataSource(newDataSource);
    });
  };

  const onClose = () => {
    editForm.resetFields();
    setVisible(false);
  };
  const onFinish = (values) => {
    UrlEditApi(values).then((res) => {
      console.log(res);

      let arr = [...dataSource];
      const index = dataSource.map((item) => item._id).indexOf(values._id);
      arr.splice(index, 1, {
        ...res.data.data,
        key: res.data.data._id,
        createTime: new Date(res.data.data.createTime).toLocaleString(),
      });
      setDataSource(arr);
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
          name="nick"
          rules={[{ required: true, message: '?????????????????????!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="????????????" />
        </Form.Item>
        <Form.Item
          name="url"
          style={{ width: '600px' }}
          rules={[{ required: true, message: '?????????????????????!' }]}
        >
          <Input prefix={<ShareAltOutlined />} placeholder="????????????" />
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
              ??????
            </Button>
          )}
        </Form.Item>
      </Form>
      <Table dataSource={dataSource}>
        <Column title="??????" dataIndex="nick" key="nick" />
        <Column title="??????" dataIndex="url" key="url" />
        <Column title="??????" dataIndex="createTime" key="createTime" />
        <Column
          title="??????"
          key="action"
          align="right"
          render={(_, text) => (
            <div>
              <Button
                type="primary"
                style={{ marginRight: '3px' }}
                onClick={() => onEdit(text)}
              >
                ??????
              </Button>
              <Button type="primary" danger onClick={() => onDel(text.key)}>
                ??????
              </Button>
            </div>
          )}
        />
      </Table>
      <Drawer
        title="????????????"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Form form={editForm} name="horizontal_login" onFinish={onFinish}>
          <Form.Item style={{ display: 'none' }} name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="nick"
            rules={[{ required: true, message: '?????????????????????!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="????????????" />
          </Form.Item>
          <Form.Item
            name="url"
            rules={[{ required: true, message: '?????????????????????!' }]}
          >
            <Input prefix={<ShareAltOutlined />} placeholder="????????????" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                ??????
              </Button>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Url;
