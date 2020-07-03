const stringToDomElement = (html: string) => {
  const wrapMapTable = [1, '<table>', '</table>'];
  const wrapMapOption = [1, "<select multiple='multiple'>", '</select>'];
  const wrapMapTr = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
  const wrapMap: AnyObject = {
    option: wrapMapOption,
    optgroup: wrapMapOption,
    legend: [1, '<fieldset>', '</fieldset>'],
    area: [1, '<map>', '</map>'],
    param: [1, '<object>', '</object>'],
    thead: wrapMapTable,
    tbody: wrapMapTable,
    tfoot: wrapMapTable,
    colgroup: wrapMapTable,
    caption: wrapMapTable,
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: wrapMapTr,
    th: wrapMapTr,
    body: [0, '', ''],
    default: [1, '<div>', '</div>'],
  };
  const match = /<\s*\w.*?>/g.exec(html);
  let element = document.createElement('div');
  if (match != null) {
    const tag = match[0]
      .replace(/</g, '')
      .replace(/>/g, '')
      .split(' ')[0];
    if (tag.toLowerCase() === 'body') {
      // const dom = document.implementation.createDocument(
      //   'http://www.w3.org/1999/xhtml',
      //   'html',
      //   null,
      // );
      const body = document.createElement('body');
      // keeping the attributes
      element.innerHTML = html.replace(/<body/g, '<div').replace(/<\/body>/g, '</div>');
      const attrs = element.firstChild?.attributes || [];
      body.innerHTML = html;
      for (let i = 0; i < attrs.length; i++) {
        body.setAttribute(attrs[i].name, attrs[i].value);
      }
      return body;
    }
    const map = wrapMap[tag] || wrapMap.default;
    element.innerHTML = map[1] + html + map[2];
    // Descend through wrappers to the right content
    let j = map[0] + 1;
    /* eslint no-plusplus:0 */
    while (j--) {
      element = (element.lastChild as unknown) as HTMLDivElement;
    }
  } else {
    element.innerHTML = html;
    element = (element.lastChild as unknown) as HTMLDivElement;
  }
  return element;
};

export default stringToDomElement;
