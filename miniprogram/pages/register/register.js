// pages/register/register.js
const db = wx.cloud.database()
var app = getApp();

let plugin = requirePlugin('routePlan');
let key = 'PW3BZ-MYGWG-X7DQF-I7K26-EBFRJ-ICBTC'; //使用在腾讯位置服务申请的key
let referer = '莞城实验小学综合服务平台'; //调用插件的app的名称
let endPoint = JSON.stringify({ //终点
  'name': '东莞市莞城实验小学',
  'latitude': 23.037998,
  'longitude': 113.752963,
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Students: Array,
    diatance: Number,
    ClassInChinese: '',
  },

  navigateToroutePlan: function name(params) {
    wx.vibrateShort();
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  bindToapply: function (event) {
    wx.vibrateShort();
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },

  toapply: function name(params) {
    console.log(params)
    var Name = params.currentTarget.dataset.item.Name;
    wx.vibrateShort();
    wx.navigateTo({
      url: '/pages/apply/apply?Name=' + Name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      ClassInChinese: app.globalData.ClassInChinese,
    })
    wx.cloud.callFunction({
      name: 'getStudents',
      data: {
        Class: app.globalData.Class
      },
      success: res => {
        wx.showToast({
          title: '连接成功',
        })
        this.setData({
          Students: res.result.data,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '连接失败',
        })
        console.error('[云函数] [getStudents] 调用失败：', err)
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success: res => {
        var longitude = res.longitude
        var latitude = res.latitude
        wx.request({
          url: 'https://restapi.amap.com/v3/distance', //api
          method: 'GET',
          data: {
            key: 'b3524cc502a4fc39c0d2a2e5cb97b516', //webkey
            origins: longitude + ',' + latitude, //经纬度
            type: '0',
            destination: '113.752963,23.037998'
          },
          success: res => {
            this.setData({
              distance: res.data.results[0].distance,
            })
          }
        })
      }
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
    this.onShow();
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

  },

})