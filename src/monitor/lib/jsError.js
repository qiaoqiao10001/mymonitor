import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker';


export function injectJsError () {
  // 监听全局未捕获的错误
  window.addEventListener('error', function (event) {
    console.log(event);
    let lastEvent = getLastEvent(); // 最后一个交互事件
    console.log(lastEvent);
    let log = {
      kind: 'stability', // 监控指标大类
      type: 'error',
      errorType: 'jsError',
      message: event.error.message, // 报错信息
      filename: event.filename,
      position: `${event.lineno}: ${event.colno}`,
      stack: getLine(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : '' // 最后一个操作的元素
    }
    tracker.send(log)
    function getLine (msg) {
      return msg.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
    }
  })
  window.addEventListener('unhandledrejection', (event) => {
    console.log(event);
  })
}