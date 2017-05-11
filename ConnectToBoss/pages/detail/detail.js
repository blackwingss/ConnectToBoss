// pages/detail/detail.js
Page({
  data: {
      detail: {}
    },
    
  onLoad: function (options) {
    let index = parseInt(options.index);
    // 页面初始化 options为页面跳转所带来的参数对象
    wx.request({
      url: 'https://www.easy-mock.com/mock/5909e0457a878d73716eb24a/Boss/detail',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data.data[index].map);
        this.setData({
          detail: res.data.data[index]
        })
      }
    }); 
    // 获取当前位置经纬度
    
    
  },
  onReady: function () {
    // 创建地图上下文
    this.mapCtx = wx.createMapContext('map') 
    // 将地图中心位置移动到当前所在位置  
    this.mapCtx.moveToLocation()
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})