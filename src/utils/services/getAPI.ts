import http from '../http';
import genAPI from './genAPI';

export default (api: AnyObject) => genAPI(api, http);
