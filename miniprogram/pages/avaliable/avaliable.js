// pages/avaliable/avaliable.js
const db = wx.cloud.database()
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StudentsPick: Array,
    hideDialog2: false,
    dialog2: false,
    toast: false,
    hideToast: false,
    topTips: false,
    hide: false,
    ID: Number,
    Name: String,
    Pick_Location: String,
    ClassInChinese: '',
  },

  confirmPicked: function name(params) {
    var Time = util.formatTime(new Date());
    db.collection(app.globalData.Class).where({
      ID: this.data.ID
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
    //重新请求数据
    wx.cloud.callFunction({
      name: 'getStudentsPick',
      data: {
        Pick: true,
        Class: app.globalData.Class,
      },
      success: res => {
        // wx.showToast({
        //   title: '连接成功',
        // })
        this.setData({
          StudentsPick: res.result.data,
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

    //closeDialog2
    setTimeout(() => {
      this.setData({
        hideDialog2: true
      });
      setTimeout(() => {
        this.setData({
          dialog2: false,
          hideDialog2: false,
        });
      }, 100);
    }, 100);

    //openToast
    this.setData({
      toast: true
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
    }, 3000);
  },

  open2: function name(params) {
    if (app.globalData.Status != '家长') {
      this.setData({
        ID: params.currentTarget.dataset.item.ID,
        Name: params.currentTarget.dataset.item.Name,
        Pick_Location: params.currentTarget.dataset.item.Pick_Location,
      });
      setTimeout(() => {
        this.setData({
          dialog2: true,
        });
      }, 200);
    } else {
      console.log('else')
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

  closeDialog2: function () {
    setTimeout(() => {
      this.setData({
        hideDialog2: true
      });
      setTimeout(() => {
        this.setData({
          dialog2: false,
          hideDialog2: false,
        });
      }, 100);
    }, 100);
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
      ClassInChinese: app.globalData.ClassInChinese,
    })
    wx.cloud.callFunction({
      name: 'getStudentsPick',
      data: {
        Pick: true,
        Class: app.globalData.Class,
      },
      success: res => {
        wx.showToast({
          title: '连接成功',
        })
        this.setData({
          StudentsPick: res.result.data,
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

  }
})