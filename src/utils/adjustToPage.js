export default (totalCount, pageSize, toPage) => {
  if (totalCount - pageSize * (toPage - 1) === 1 && toPage > 1) {
    return toPage - 1;
  }
  return toPage;
};
