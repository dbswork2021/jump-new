import http from './http';

export const LoginApi = (model) => http.post('/login', model);

export const RegisterApi = (model) => http.post('/register', model);

export const UserApi = () => http.get('/user');

export const UserEditApi = (model) => http.put('/user', model);

export const UrlApi = () => http.get('/url');

export const UrlAddApi = (model) => http.post('/url', model);

export const UrlEditApi = (model) => http.put('/url', model);

export const UrlDelApi = (params) => http.delete('/url', { params });

export const AgentApi = () => http.get('/agent');

export const AgentAddApi = (model) => http.post('/agent', model);

export const AgentEditApi = (model) => http.put('/agent', model);

export const AgentDelApi = (params) => http.delete('/agent', { params });

export const PromotionApi = () => http.get('/promotion');

export const PromotionEditApi = (model) => http.post('/promotion', model);

export const StatsApi = (model) => http.put('/stats', model);

export const StatsSearchApi = (model) => http.post('/stats', model);

export const HomeApi = () => http.get('/stats');

export const CommonImgApi = (model) => http.put('/common', model);

export const CommonDataApi = (model) => http.post('/common', model);
