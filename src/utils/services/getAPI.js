import http from '../http';
import genAPI from './genAPI';

export default api => genAPI(api, http);
