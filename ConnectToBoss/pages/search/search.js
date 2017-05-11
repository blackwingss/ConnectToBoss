// 获取应用实例
var app = getApp();

Page({
  // 需要用到的数据
  data: {
    jobList: []
  },
  // 页面载入完成执行
  // options是其他页面传递过来的参数
  onLoad: function (options) {
    let searchValue = options.searchValue;
    let type = options.type;
    // ES6语法，可省略赋值号
    this.setData({
      searchValue,
      type
    })
    // 官方API用以发出https请求
    wx.request({
      url: 'https://www.easy-mock.com/mock/5909e0457a878d73716eb24a/Boss/jobList',
      data: {},
      method: 'GET',
      success: (res) => {
        let searchArr = res.data.data;
        // 定义好容器用来存放结果
        let resultArr = [];
        // 循环匹配搜索结果
        for(let i = 0; i < searchArr.length; i++) {
          if(searchValue === searchArr[i].city) {
            // 将搜索结果放入定义好的容器内
            resultArr.push(searchArr[i]);
            this.setData({
              jobList: resultArr
            })
          }else if(searchValue === searchArr[i].title) {
            resultArr.push(searchArr[i]);
            this.setData({
              jobList: resultArr
            })
          }else if(searchValue === searchArr[i].company) {
            resultArr.push(searchArr[i]);
            this.setData({
              jobList: resultArr
            })
          } else if(type === searchArr[i].title) {
            resultArr.push(searchArr[i]);
            this.setData({
              jobList: resultArr
            })
            // 这是一个值为undefined的字符串...对，你没看错，因为开发工具调试时显示字符串不会加上
            // 双引号，这里卡了不少时间调试
          }else if(searchValue === 'undefined'){
            this.setData({
              jobList: res.data.data,
              jobListBackup: res.data.data
            })
          }
        }
      }
    });
    // console.log(this.data.jobList)
  },
  // 跳到详情页
  moveTodetail: function (e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
      success: function (res) {
        // success
        // console.log('success');

      }
    })
  },
  // 获取输入的值
  bindInput: function (e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail.value
    })
    // 当搜索框归为空时再把前面jobList的备份赋值回jobList
    if(e.detail.value == '') {
      this.setData({
        jobList: this.data.jobListBackup
      })
    }
  },
  // 搜索页的搜索匹配
  bindSearch: function () {
    let Arr = this.data.jobList;
    let jobCity = [];
    let jobName = [];
    let jobCompany = [];
    for (var i = 0; i < Arr.length; i++) {
      switch (this.data.searchValue) {
        case Arr[i].city:
          jobCity.push(Arr[i]);
          this.setData({
            jobList: jobCity
          })
          break;
        case Arr[i].title:
          jobName.push(Arr[i]);
          this.setData({
            jobList: jobName
          })
          break;
        case Arr[i].company:
          jobCompany.push(Arr[i]);
          this.setData({
            jobList: jobCompany
          })
          break;
      }
    }
  }
})
