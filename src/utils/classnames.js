import classnames from 'classnames';

export default (styles, _prefix) => {
  const prefix = _prefix || styles.prefix;
  const cx = classnames.bind(styles);
  if (!prefix) return cx;
  const handlePrefix = name => {
    if (name.startsWith(':')) return name.replace(':', '');
    return `${prefix}-${name}`;
  };
  return (...names) =>
    cx(
      names.map(name => {
        if (typeof name === 'string') {
          return handlePrefix(name);
        }
        if (typeof name === 'object') {
          const returnObj = {};
          Object.keys(name).forEach(key => {
            const element = name[key];
            returnObj[handlePrefix(key)] = element;
          });
          return returnObj;
        }
        return '';
      }),
    );
};
