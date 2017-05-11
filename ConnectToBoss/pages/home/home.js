// 获取应用实例
var app = getApp();

Page({
  // 需要用到的数据
  data: {
    jobList: []
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'https://www.easy-mock.com/mock/5909e0457a878d73716eb24a/Boss/jobList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        // success
        // console.log(res.data.data);
        this.setData({
          jobList: res.data.data,
          jobListBackup: res.data.data
        })
        // console.log(this.data.jobList);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  SearchKeyWord: function(e) {
    // console.log(e);
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../search/search?type=' + type
    })
  },
  bindInput: function(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })

  },
  bindSearch: function(e) {
    // console.log(this.data.searchValue);
    // 调用官方API显示“搜索中”的提示，提高用户体验
    wx.showLoading({
      title: '搜索中',
    })
    let Arr = this.data.jobList;
    let jobCity = [];
    let jobName = [];
    let jobCompany = [];
    for (var i = 0; i < Arr.length; i++) {
      // 页面之间传值的判断
      if (Arr[i].city == this.data.searchValue || this.data.searchValue === undefined
      || Arr[i].title == this.data.searchValue || Arr[i].company == this.data.searchValue) {
        // console.log(e);
        // let index = e.currentTarget.dataset.index;
        wx.navigateTo({
          url: '../search/search?searchValue=' + this.data.searchValue,
          success: (res) => {
            // success
            // wx.showLoading是要自己手动关闭的
              wx.hideLoading()
          }
        })
      }
    }
  }
})
