// pages/choose/choose.js
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        radioItems: [

        ],
        // 当前已经选择
        currentCollection: ""
    },
    radioChange: function (e) {
        console.log(e)
        let current = this.data.radioItems.filter((item) => {
            return item.value === e.detail.value
        })

        wx.showModal({
            title: "确认修改",
            content: `确定选择${current[0].name}吗?`,
            cancelColor: '#707070',
            success: (res) => {
                // 设置新存储情况
                if (res.confirm) {
                    wx.setStorageSync('collection', current[0].value)
                    wx.navigateBack()
                }
                else if (res.cancel) {
                    this.data.radioItems.forEach(item=>{
                        item.checked = false
                    })
                    this.setData({
                        radioItems:this.data.radioItems
                    })
                }
            }

        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // loading start 
        wx.showLoading({
            title: '加载中',
        })
        // 从数据库读取当前可用题库并设置
        let res = await db.collection("choose").get();
        console.log(res.data)
        let temp = res.data.map((item, index) => {
            return {
                _id: item._id,
                name: item.name,
                value: item.collection,
            }
        })
        // 获取当前本地缓存数据
        let current = wx.getStorageSync("collection");
        // 设置数据
        this.setData({
            radioItems: temp,
            currentCollection: current
        }, () => {
            wx.hideLoading({
                complete: (res) => { },
            });
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