import isFunction from '../../isFunction';

export default response => {
  const {
    config: {
      options: { parseResponse },
    },
  } = response;
  return isFunction(parseResponse) ? parseResponse(response) : response;
};
