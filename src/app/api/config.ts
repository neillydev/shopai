const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment ? 'http://localhost:9000/api' : 'http://droppy.ai/api';

export { baseURL };