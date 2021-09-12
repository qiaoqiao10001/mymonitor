let host = 'cn-guangzhou.log.aliyuncs.com';
// let host = 'cn-guangzhou-intranet.log.aliyuncs.com'
let project = 'zqmonitor';
let logstores = 'zqmonitor-store'
let userAgent = require('user-agent')
function getExtraData () {
  return {
    title: document.title,
    url: location.url,
    timestamp: new Date().toLocaleString(),
    userAgent: userAgent.parse(navigator.userAgent).name
  }
}
class SendTracker {
  constructor() {
    // ProjectName.Endpoint/logstores/logstoreName/track
    this.url = `http://${project}.${host}/logstores/${logstores}/track`;  // 上报路径
    this.xhr = new XMLHttpRequest();
  }
  send (data = {}) {
    let extraData = getExtraData();
    let log = { ...extraData, ...data }
    // `
    // {
    //   "__topic__": "topic",
    //   "__source__": "source",
    //   "__logs__": [
    //     {
    //       "key1": "value1",
    //       "key2": "value2"
    //     },
    //     {
    //       "key1": "value1",
    //       "key2": "value2"
    //     }
    //   ],
    //   "__tags__": {
    //     "tag1": "value1",
    //     "tag2": "value2"
    //   }
    // }
    // `
    let postlog = {
      "__logs__": [
        {
          ...log
        },
      ],
    }
    let postlog2 = JSON.stringify(postlog)
    console.log(postlog2);
    // for(let key in log){
    //   if(typeof log[key] === 'number'){
    //     log[key] = `${log[key]}`
    //   }
    // }

    console.log('log', log);
    this.xhr.open('POST', this.url, true);
    this.xhr.setRequestHeader('Content-type', 'application/json')
    this.xhr.setRequestHeader('x-log-apiversion', '0.6.0')
    this.xhr.setRequestHeader('x-log-bodyrawsize', postlog2.length)
    // this.xhr.setRequestHeader('x-log-compresstype', 'lz4')
    this.xhr.onload = function (response) {
      console.log(response);
    }
    this.xhr.onerror = function (response) {
      console.log(response);
    }
    this.xhr.send(postlog2);
  }
}

export default new SendTracker();