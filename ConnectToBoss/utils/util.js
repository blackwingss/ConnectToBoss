function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 格式化日期
 * @param  {[type]} tmstap [description]
 * @return {[type]}        [description]
 */
function formatDate(tmstap) {
    var date = new Date(tmstap * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1
    var day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
}

/**
 * 添加/删除数组中的元素
 * @param  {[array]} 数组
 * @param  {[object]} 数组中已经存在就删除，否则添加
 * @return {[void]}
 */
function toggleValueOfArray(array, value) {
    if (!Array.isArray(array)) return;
    var index = !Array.isArray(value)
                ? array.indexOf(value)
                : array.map(function(val) {
                    return val.toString();
                }).indexOf(value.toString());
    if (index > -1) {
        array.splice(index, 1);
    } else {
        array.push(value);
    }
}

/**
 * 判断两个数组是否相等（数组中的每个元素都相等）
 * @param  {array}  第一个数组
 * @param  {array}  第二个数组
 * @return {boolean} 两个数组是否相等
 */
function is2ArraysEqual(arr1, arr2) {
    return (Array.isArray(arr1) && Array.isArray(arr2)) && (arr1.toString() === arr2.toString());
}

/**
 * log group
 * @param  {[string]} group name, or message when msg is undefined.
 * @param  {[object]} message you wanna log.
 * @return {[void]}
 */
function logGroup(groupName, msg) {
    console.group(msg ? groupName : 'Log@' + Date.now());
    console.log(msg || groupName);
    console.groupEnd();
}

/**
 * [Model description]
 * @param {[type]} presenter [description]
 */
var Model = function(presenter) {
    this.presenter = presenter;
    this.t = Date.now();
    this.map = {};
}
Model.prototype = {
    get: function(url) {
        var prs = this.presenter;
        var self = this;
        this.map[url] = this.t;

        var req = {
            url: url,
            method: 'GET',
            success: function(e) {
                var res = e.data;
                var tag = self.map[req.url];
                if (res.state == 1) {
                    prs.onGetData(res.data, tag);
                } else {
                    prs.onError && prs.onError(res.msg, tag);
                }
            },
            fail: function(e) {
                console.log(e);
                prs.onFail && prs.onFail(e);
            }
        };
        wx.request(req);
        return this;
    },
    setPresenter: function(presenter) {
        this.presenter = presenter;
        return this;
    },
    tag: function(t) {
        this.t = t;
        return this;
    }
}
var model = new Model();

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    toggleValueOfArray: toggleValueOfArray,
    is2ArraysEqual: is2ArraysEqual,
    logGroup: logGroup,
    get: function(presenter, url, tag) {
        tag && model.tag(tag);
        return model.setPresenter(presenter).get(url);
    },
    host: 'https://wg.wg-global.com'
}
