

function getSelectors (path) {
  //  获取事件选择器
  return path.filter(element => {
    return element !== document && element !== window;
  }).map(element => {
    let selector = ''
    if (element.id) {
      return `${element.nodeName.toLowerCase()}#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
      return `${element.nodeName.toLowerCase()}.${element.className}`
    } else {
      selector = element.nodeName.toLowerCase();
    }
    return selector
  }).reverse().join(' > ')
}

export default function (path) {
  if(Array.isArray(path)){
    console.log(getSelectors(path));
    return getSelectors(path)
  }
}
