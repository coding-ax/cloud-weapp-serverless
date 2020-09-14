// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        avatar: "",
        nickname: ""
    },
    getUserInfo(e) {
        // 设置授权信息
        this.setData({
            avatar: e.detail.userInfo.avatarUrl,
            nickname: e.detail.userInfo.nickName,
            isLogin: true
        });
    },
    clearStorage() {
        // 清除缓存
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '清除中',
                    })
                    wx.clearStorageSync();
                    wx.hideLoading({
                        success: (res) => { },
                    })
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 登录态判断
        wx.getUserInfo({
            complete: (res) => {
                console.log(res);
                if (res.userInfo != undefined) {
                    this.setData({
                        avatar: res.userInfo.avatarUrl,
                        nickname: res.userInfo.nickName,
                        isLogin: true
                    });
                }
            },
        })
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