// miniprogram/pages/form_radio/form_radio.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTips: false,
    hide: false,
    Status: String,
    userInfo: {},
    items: [{
        name: '0',
        value: '一（1）班'
      },
      {
        name: '1',
        value: '一（2）班',
      },
      {
        name: '2',
        value: '二（1）班',
      },
      {
        name: '3',
        value: '三（1）班',
      },
      {
        name: '4',
        value: '四（1）班',
      },
      {
        name: '5',
        value: '五（1）班',
      },
      {
        name: '6',
        value: '六（1）班',
      },
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    app.globalData.ClassInChinese = this.data.items[e.detail.value].value;
    app.globalData.value = e.detail.value;
  },

  switchTab: function name(params) {
    if (isNaN(app.globalData.value)) {
      this.setData({
        topTips: true
      });
      setTimeout(() => {
        this.setData({
          hide: true
        });
        setTimeout(() => {
          this.setData({
            topTips: false,
            hide: false,
          });
        }, 300);
      }, 3000);
    } else {
      app.globalData.Class = app.globalData.array[app.globalData.value];
      switch (app.globalData.Status) {
        case "家长":
          wx.vibrateShort();
          wx.switchTab({
            url: '/pages/index/index',
          })
          break;
        case "老师":
          wx.vibrateShort();
          wx.switchTab({
            url: '/pages/index/index',
          })
          break;
        case "管理员":
          wx.vibrateShort();
          wx.switchTab({
            url: '/pages/index/index',
          })
          break;
        default:
          break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.value=Number;
    this.setData({
      Status: app.globalData.Status,
      userInfo: app.globalData.userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})