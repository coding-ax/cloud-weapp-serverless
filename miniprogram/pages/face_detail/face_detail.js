// pages/face_detail/face_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ops: [{
            title: "上一题",
            src: "../../images/icons/pre.png",
            func: "prevTick"
        },
        {
            title: "收藏",
            src: "../../images/icons/pick.png",
            func: "pickTick"
        },
        {
            title: "下一题",
            src: "../../images/icons/nex.png",
            func: "nextTick"
        }
        ],
        list:null,
        current:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let list = wx.getStorageSync('face_list')
        let current = list.filter(item => {
            return item.id === options.id
        })[0]
        let idx = options.index
        this.setData({
            list,
            current
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