import React from 'react';

export default ({
  text,
  highlightText = '',
  regExpOption = 'gi',
  highlightClassName = '',
  normalClassName = '',
}) => {
  const regExp = new RegExp(highlightText, regExpOption);
  const textArr = text.split(regExp);
  const elementArr = [];
  let key = 0;
  textArr.forEach((item, index) => {
    elementArr.push(
      <span key={key} className={normalClassName}>
        {item}
      </span>,
    );
    key += 1;
    if (index < textArr.length - 1) {
      elementArr.push(
        <span key={key} className={highlightClassName}>
          {highlightText}
        </span>,
      );
      key += 1;
    }
  });
  return elementArr;
};
