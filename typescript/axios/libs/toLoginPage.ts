import axios from 'axios';
import { history } from 'umi';

export default function toLoginPage(loginPageUrl: string) {
  const urlReg = /^https?:\/\/*/;
  const { options = { notLoginInUrl: undefined } } = axios.defaults;
  if (loginPageUrl && urlReg.test(loginPageUrl)) {
    window.location.href = loginPageUrl;
  } else if (
    options.notLoginInUrl &&
    history.location.pathname !== options.notLoginInUrl
  ) {
    history.push({
      pathname: options.notLoginInUrl,
      search: `?redirectUrl=${history.location.pathname}${
        history.location.search.substr(1)
          ? `&${history.location.search.substr(1)}`
          : ''
      }`,
    });
  }
}
