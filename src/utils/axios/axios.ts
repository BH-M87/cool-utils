import './libs/setDefaults';
import setAxiosOptions from './libs/setAxiosOptions';

setAxiosOptions();

import getAxiosInstance from './libs/getAxiosInstance';

// add form method to axios
import './libs/form';

export default getAxiosInstance();
