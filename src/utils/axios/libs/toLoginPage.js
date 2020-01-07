export default function toLoginPage(loginPageUrl) {
  const urlReg = /^https?:\/\/*/;
  if (loginPageUrl && urlReg.test(loginPageUrl)) {
    window.location.href = loginPageUrl;
  } else if (
    this.commonConfig.notLoginInUrl &&
    history.location.pathname !== this.commonConfig.notLoginInUrl
  ) {
    history.push({
      pathname: this.commonConfig.notLoginInUrl,
      search: `?redirectUrl=${history.location.pathname}${
        history.location.search.substr(1) ? `&${history.location.search.substr(1)}` : ''
      }`,
    });
  }
}
