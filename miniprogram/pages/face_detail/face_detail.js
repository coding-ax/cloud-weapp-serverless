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
        list: null,
        showAns: false,
        current: null,
        idx: 0,
        error: ''
    },
    changeShow() {
        this.setData({
            showAns: !this.data.showAns
        })
    },
    nextTick() {
        let length = this.data.current.pages.length;
        let idx = this.data.idx;
        if (idx < length - 1) {
            idx++
            this.setData({
                idx,
                showAns: true
            })
        } else {
            this.setData({
                error: "已经是最后一个了!"
            })
        }

    },
    prevTick() {
        let idx = this.data.idx;
        if (idx > 0) {
            idx--
            this.setData({
                idx,
                showAns: false
            })
        } else {
            this.setData({
                error: "已经是第一个了!"
            })
        }
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
        console.log(current.ans[idx], current.pages[idx])
        this.setData({
            list,
            current,
            idx
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