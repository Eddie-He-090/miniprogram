// pages/apply/apply.js
const db = wx.cloud.database()
var app = getApp();
var util = require('../../utils/util.js');

Page({
  mixins: [require('../../mixin/themeChanged')],

  navigateTomsg_success: function name(params) {
    var ID = this.data.ID;
    var Name = this.data.Name;
    var Pick_Location = this.data.array1[this.data.value1];
    wx.navigateTo({
      url: '/pages/msg_success/msg_success?ID=' + ID + '&Name=' + Name + '&Pick_Location=' + Pick_Location,
    })
  },

  navigateTomsg_warn: function name(params) {
    var ID = this.data.ID;
    var Name = this.data.Name;
    var Pick_Location = this.data.array1[this.data.value1];
    wx.navigateTo({
      url: '/pages/msg_warn/msg_warn?ID=' + ID + '&Name=' + Name + '&Pick_Location=' + Pick_Location,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    topTips: false,
    hide: false,
    array1: ['金牛路路口', '向阳路路口', '取消'],
    value1: 0,
    ID: Number, //ID
    Name: '', //Name
    ClassInChinese: '',
  },

  bindPicker1Change: function (e) {
    this.setData({
      value1: e.detail.value
    })
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
    wx.cloud.callFunction({
      name: 'getStudentsByName',
      data: {
        Name: this.data.Name,
        Class: app.globalData.Class,
      },
      success: res => {
        // wx.showToast({
        //   title: '成功',
        // })
        var Time = util.formatTime(new Date());
        if (res.result.data[0] !== undefined) {
          console.log('Verified!')
          this.setData({
            ID: res.result.data[0].ID,
          })
          if (this.data.value1 != 2) {
            console.log('Correct! Update!')
            db.collection(app.globalData.Class).where({
              ID: res.result.data[0].ID
            }).update({
              // data 传入需要局部更新的数据
              data: {
                Pick_Location: this.data.array1[this.data.value1],
                Pick: true,
                Last_Editor: app.globalData.userInfo.nickName,
                Last_Edit_Time: Time,
              }
            })
            wx.vibrateShort();
            this.navigateTomsg_success();
            // .then(console.log)
            // .catch(console.error)
          } else if (this.data.value1 == 2) {
            console.log('Correct! Cancel!')
            db.collection(app.globalData.Class).where({
              ID: res.result.data[0].ID
            }).update({
              // data 传入需要局部更新的数据
              data: {
                Pick_Location: '',
                Pick: false,
                Last_Editor: app.globalData.userInfo.nickName,
                Last_Edit_Time: Time,
              }
            })
            wx.vibrateShort();
            this.navigateTomsg_warn();
            // .then(console.log)
            // .catch(console.error)
          }
        } else {
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
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getStudentsByName] 调用失败：', err)
      }
    })

    // db.collection('Students').where({
    //   Name: this.data.Name,
    // }).get().then(res => {
    //   console.log('从数据库get到的ID和Name：' + res.data[0].ID + res.data[0].Name)
  },



  onError: function (err) {
    // 上报错误
    console.log('error')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.Name != undefined) {
      this.setData({
        Name: options.Name,
      })
    };
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
      ClassInChinese: app.globalData.ClassInChinese,
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