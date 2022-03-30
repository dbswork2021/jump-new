import {
  Row,
  Col,
  Upload,
  message,
  Form,
  Button,
  InputNumber,
  DatePicker,
} from 'antd';
import moment from 'moment';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { CompactPicker } from 'react-color';
import { PromotionApi, PromotionEditApi } from 'utils/api';

import 'assets/css/promotion.css';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传png或jpg格式的图片！');
  }
  return isJpgOrPng;
};

const Promotion = () => {
  const [formData, setFormData] = useState({
    qrSize: 70,
    qrX: 40,
    qrY: 40,
    fontSize: 10,
    agentX: 10,
    agentY: 10,
    dateX: 20,
    dateY: 20,
    fileName: '',
    color: '#ffffff',
    delTime: moment(new Date().getTime()),
  });

  useEffect(() => {
    PromotionApi().then((res) => {
      if (res.data.data) {
        let data = {
          ...res.data.data,
          delTime: moment(res.data.data.delTime),
        };
        setFormData(data);
      }
    });
  }, []);
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      const res = info.file.response;
      message.success(res.message);
      const obj = {
        ...formData,
        fileName: res.fileName,
      };
      setFormData(obj);
    }
  };

  const onChange = (value, type) => {
    const obj = { ...formData, [type]: value };
    setFormData(obj);
  };
  const onColorChange = (color) => {
    const obj = { ...formData, color: color.hex };
    setFormData(obj);
  };

  const onFinish = () => {
    const model = {
      ...formData,
      delTime: moment(formData.delTime._d).unix() * 1000,
    };
    PromotionEditApi(model);
  };
  return (
    <div className="promotion">
      <div className="imgBox">
        <Upload
          name="img"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={process.env.REACT_APP_SERVER_PORT + 'uploads'}
          headers={{
            Authorization: `Bearer ${localStorage.__web_token}`,
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {formData.fileName !== '' ? (
            <img
              src={process.env.REACT_APP_SERVER_PORT_FILE + formData.fileName}
              style={{ width: '100%' }}
            ></img>
          ) : (
            ''
          )}
          <div
            className="code"
            style={{ top: formData.qrY + '%', left: formData.qrX + '%' }}
          >
            <QRCode
              id="qrCode"
              value="https://baidu.com"
              size={formData.qrSize} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
              style={{ margin: 'auto' }}
            ></QRCode>
          </div>
          <div
            className="code"
            style={{
              fontSize: formData.fontSize,
              top: formData.agentY + '%',
              left: formData.agentX + '%',
              color: formData.color,
            }}
          >
            文字
          </div>
          <div
            className="code"
            style={{
              fontSize: formData.fontSize,
              top: formData.dateY + '%',
              left: formData.dateX + '%',
              color: formData.color,
            }}
          >
            日期
          </div>
        </Upload>
      </div>
      <div className="promotion-form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="QR大小">
            <InputNumber
              min={70}
              step={5}
              value={formData.qrSize}
              onChange={(value) => onChange(value, 'qrSize')}
            />
          </Form.Item>

          <Form.Item label="QR横坐标">
            <InputNumber
              min={10}
              value={formData.qrX}
              onChange={(value) => onChange(value, 'qrX')}
            />
          </Form.Item>
          <Form.Item label="QR纵坐标">
            <InputNumber
              min={10}
              value={formData.qrY}
              onChange={(value) => onChange(value, 'qrY')}
            />
          </Form.Item>

          <Form.Item label="文字大小">
            <InputNumber
              min={10}
              value={formData.fontSize}
              onChange={(value) => onChange(value, 'fontSize')}
            />
          </Form.Item>

          <Form.Item label="代理名横坐标">
            <InputNumber
              min={10}
              value={formData.agentX}
              onChange={(value) => onChange(value, 'agentX')}
            />
          </Form.Item>
          <Form.Item label="代理名纵坐标">
            <InputNumber
              min={10}
              value={formData.agentY}
              onChange={(value) => onChange(value, 'agentY')}
            />
          </Form.Item>

          <Form.Item label="日期横坐标">
            <InputNumber
              min={10}
              value={formData.dateX}
              onChange={(value) => onChange(value, 'dateX')}
            />
          </Form.Item>
          <Form.Item label="日期纵坐标">
            <InputNumber
              min={10}
              value={formData.dateY}
              onChange={(value) => onChange(value, 'dateY')}
            />
          </Form.Item>
          <Form.Item label="字体颜色">
            <CompactPicker
              color={formData.color}
              onChangeComplete={onColorChange}
            />
          </Form.Item>
          <Form.Item label="过期时间">
            <DatePicker
              value={formData.delTime}
              onChange={(value) => onChange(value, 'delTime')}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Promotion;
