import { axiosMethods } from '../axios';
import genAPI from './genAPI';

export default api => genAPI(api, axiosMethods);
