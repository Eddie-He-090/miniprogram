const app = getApp()
Page({
    mixins: [require('../../mixin/themeChanged')],

    data: {
        ID: Number,
        Name: '',
        Pick_Location: '',
        ClassInChinese: '',
    },

    navigateToindex: function name(params) {
        wx.vibrateShort();
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    onLoad: function (options) {
        var ID = options.ID;
        var Name = options.Name;
        var Pick_Location = options.Pick_Location;
        this.setData({
            ID: ID,
            Name: Name,
            Pick_Location: Pick_Location,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            ClassInChinese: app.globalData.ClassInChinese,
        })
    },
});