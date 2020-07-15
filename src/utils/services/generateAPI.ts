import { axiosMethods } from '../axios';
import genAPI from './genAPI';

export default (api: AnyObject) => genAPI(api, axiosMethods);
