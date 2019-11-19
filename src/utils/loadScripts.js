export const getJS = url => new Promise((resolve, reject) => {
  if (!url) {
    resolve('empty url');
  }
  const scripts = Array.from(document.getElementsByTagName('script'));
  if (scripts.find(script => script.src === url)) {
    resolve(`duplicate: ${url}`);
    return;
  }
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (
        script.readyState === 'loaded'
          || script.readyState === 'complete'
      ) {
        script.onreadystatechange = null;
        resolve(`success: ${url}`);
      }
    };
  } else {
    //Others
    script.onload = function () {
      resolve(`success: ${url}`);
    };
  }

  script.onerror = function () {
    reject(Error(`${url}: load error!`));
  };

  script.src = url;
  document.body.appendChild(script);
});

/*
 * url param example:
 * 'url.js' --> will only load url.js
 * ['url1.js', 'url2.js'] --> will load url1.js first, then url2.js
 * [['url1.js', 'url2.js'], 'url3.js'] --> will load url1.js and url2.js in parallel,
 *                                         and then url3.js
 */
export default async (url, callback) => {
  if (!url) {
    return;
  }
  if (Array.isArray(url)) {
    for (const currentValue of url) {
      if (Array.isArray(currentValue)) {
        /* eslint no-await-in-loop:0 */ /* design to wait to execute one by one */
        await Promise.all(currentValue.map(value => getJS(value)));
      } else if (currentValue) {
        await getJS(currentValue);
      }
    }
  } else {
    await getJS(url);
  }
  if (callback) {
    callback();
  }
};
