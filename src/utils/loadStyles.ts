const getStyle = (url: string) => {
  const links = Array.from(document.getElementsByTagName('link'));
  if (links.find(link => link.href === url)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
};
export default (url?: string) => {
  if (!url) {
    return;
  }
  if (Array.isArray(url)) {
    url.forEach(value => {
      getStyle(value);
    });
  } else {
    getStyle(url);
  }
};
