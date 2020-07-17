// miniprogram/pages/add/add.js
// pages/apply/apply.js
const db = wx.cloud.database()
var app = getApp();
var util = require('../../utils/util.js');

Page({
  mixins: [require('../../mixin/themeChanged')],

  navigateTomsg_success: function name(params) {
    var ID = this.data.ID;
    var Name = this.data.Name;
    wx.navigateTo({
      url: '/pages/msg_success copy/msg_success copy?ID=' + ID + '&Name=' + Name,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    topTips: false,
    hide: false,
    ID: Number, //ID
    Name: '', //Name
    ClassInChinese: String,
  },

  bindKeyInput1: function (e) {
    this.setData({
      ID: e.detail.value
    })
  },

  bindKeyInput2: function (e) {
    this.setData({
      Name: e.detail.value
    })
  },

  bindSureTap: function (e) {
    if (isNaN(this.data.ID) || this.data.Name == '') {
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
      var Time = util.formatTime(new Date());
      db.collection(app.globalData.Class).add({
          data: {
            ID: Number(this.data.ID),
            Name: this.data.Name,
            Pick: false,
            Pick_Location: '',
            Last_Editor: app.globalData.userInfo.nickName,
            Last_Edit_Time: Time,
          }
        })
        .then(res => {
          // console.log(res)
          wx.vibrateShort();
          this.navigateTomsg_success();
        })
    }
  },

  onError: function (err) {
    // 上报错误
    console.log('error')
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
    this.setData({
      ClassInChinese: app.globalData.ClassInChinese
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