import http from './http';

export const CommonDataApi = (model) => http.post('/common', model);
