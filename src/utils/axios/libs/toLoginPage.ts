import axios, { Options } from 'axios';

export default function toLoginPage(loginPageUrl?: string, _notLoginInUrl?: string) {
  const options = axios.defaults.options;
  const { notLoginInUrl = '' } = options as Options;
  window.location.href =
    loginPageUrl ||
    `${_notLoginInUrl || notLoginInUrl}?redirectUrl=${location.pathname}${
      location.search.substr(1) ? `&${location.search.substr(1)}` : ''
    }`;
}
