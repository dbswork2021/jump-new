import { Row, Col, Upload, message, Button } from 'antd';
import QRCode from 'qrcode.react';
import domToImg from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { CommonImgApi } from 'utils/api';
import 'assets/css/promotion.css';
import { Layout, Menu } from 'antd';
import { useParams } from 'react-router-dom';

const { Header, Content } = Layout;

const Download = () => {
  const [formData, setFormData] = useState({
    qrSize: 70,
    qrX: 40,
    qrY: 40,
    fontSize: 10,
    agentX: 10,
    agentY: 10,
    dateX: 20,
    dateY: 20,
    color: '#ffffff',
    fileName: '',
  });
  const [data, setData] = useState({
    text: '',
    date: '',
    url: '',
  });
  const { id } = useParams();

  useEffect(() => {
    CommonImgApi({ id }).then((res) => {
      setFormData(res.data.sets);
      setData(res.data.data);
    });
  }, []);

  const download = () => {
    const node = document.getElementById('download');
    domToImg.toBlob(node).then((blob) => {
      saveAs(blob, `宣传图-${id}`);
      message.success('下载成功！');
    });
  };
  return (
    <Layout className="content" style={{ height: '100vh' }}>
      <Header style={{ width: '100%' }}>
        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content style={{ padding: '10px 30px', background: '#fff' }}>
        <div className="promotion">
          <div className="imgBox" id="download">
            <Upload
              name="img"
              listType="picture-card"
              className="avatar-uploader"
              disabled
              showUploadList={false}
            >
              {formData.fileName !== '' ? (
                <img
                  src={
                    process.env.REACT_APP_SERVER_PORT_FILE + formData.fileName
                  }
                  style={{ display: 'block', width: '100%' }}
                  alt="avatar"
                ></img>
              ) : (
                ''
              )}
              <div
                className="code"
                style={{
                  top: formData.qrY + '%',
                  left: formData.qrX + '%',
                }}
              >
                <QRCode
                  id="qrCode"
                  value={data.url}
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
                {data.text}
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
                {data.date}
              </div>
            </Upload>
          </div>
          <div className="promotion-form">
            <Button type="primary" onClick={download}>
              下载
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Download;
