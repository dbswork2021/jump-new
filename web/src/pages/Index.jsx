import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommonDataApi } from '../utils/api';

const Index = () => {
  const { id } = useParams();
  useEffect(() => {
    let model = {
      ip: sessionStorage.getItem('ip'),
      browser: getBrowser(),
      system: getOS(),
      id,
    };

    CommonDataApi(model).then((res) => {
      window.location.href = res.data.url;
    });
  });
  const getBrowser = () => {
    let ua = navigator.userAgent.toLocaleLowerCase();
    let browserType = null;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
      browserType = 'IE浏览器';
    } else if (ua.match(/firefox/) != null) {
      browserType = '火狐浏览器';
    } else if (ua.match(/MicroMessenger/i) != null) {
      browserType = '微信';
    } else if (ua.match(/Edg/) != null) {
      browserType = 'Edge浏览器';
    } else if (ua.match(/ucbrowser/) != null) {
      browserType = 'UC浏览器';
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
      browserType = 'opera浏览器';
    } else if (ua.match(/bidubrowser/) != null) {
      browserType = '百度浏览器';
    } else if (ua.match(/metasr/) != null) {
      browserType = '搜狗浏览器';
    } else if (
      ua.match(/tencenttraveler/) != null ||
      ua.match(/qqbrowse/) != null
    ) {
      browserType = 'QQ浏览器';
    } else if (ua.match(/maxthon/) != null) {
      browserType = 'maxthon';
    } else if (ua.match(/chrome/) != null) {
      browserType = '谷歌浏览器';
    } else if (ua.match(/safari/) != null) {
      browserType = 'Safari浏览器';
    } else {
      browserType = '其他浏览器';
    }
    return browserType;
  };

  const getOS = () => {
    let ua = navigator.userAgent.toLocaleLowerCase();
    let osType = null;
    if (ua.match(/windows nt/) != null) {
      osType = 'windows';
    } else if (ua.match(/android/) != null) {
      osType = '安卓';
    } else if (ua.match(/iphone/)) {
      osType = 'IPhone';
    } else if (ua.match(/ipad/)) {
      osType = 'IPAD';
    } else if (ua.match(/mac/)) {
      osType = 'MAC';
    } else {
      osType = 'Linux';
    }
    return osType;
  };
  return <div></div>;
};

export default Index;
