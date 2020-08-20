// pages/home/home.js
// 初始化数据库操作
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: [],
        progress: {
            finished: 0,
            lasted: 0,
            currentItem: null,
            currentPercent: 0
        },
        currentCollection: "",
        onLoadFinished: false
    },

    navGo: (event) => {
        console.log(event)
        wx.navigateTo({
            url: event.currentTarget.dataset.route,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 常规首次登录入口
        // 加载题库并进行设置
        wx.showLoading({
            title: '加载中',
        })
        let res = await db.collection("choose").get();
        res = res.data;
        // 加载本地已经选择的记录和进度,没有就直接返回
        let local_status = wx.getStorageSync('collection')
        if (!local_status) {
            this.setData({
                current: res,
                onLoadFinished: true
            }, () => {
                wx.hideLoading({
                    complete: (res) => { },
                })
            })
            return;
        }
        let current = res.filter(item => {
            return item.collection === local_status
        })[0]
        console.log(current)
        // 获取本地进度
        let status = wx.getStorageSync(local_status + "_progress");
        let progress = null;
        let currentCollection = current.collection;
        if (status) {
            console.log("test")
            // 获取到就赋值给progress
            progress = JSON.parse(status);

        }
        else {
            // 没有本地记录，说明需要进行设置
            console.log("fail to get")
            progress = {
                finished: 0,
                lasted: current.length,
                currentItem: current.name,
                currentPercent: 0
            }
            wx.setStorageSync(local_status + "_progress", JSON.stringify(progress))
        }

        this.setData({
            current: res,
            progress,
            currentCollection,
            // 标记加载完成
            onLoadFinished: true
        }, () => {
            wx.hideLoading({
                complete: (res) => { },
            })
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
        // 从修改题库返回处理  设置一个状态记录是否是options完成
        let collection = wx.getStorageSync("collection");
        // 从继续学习返回处理了
        let jindu = wx.getStorageSync(collection + "_progress");
        if (jindu && this.data.progress.lasted !== jindu.lasted) {
            jindu = JSON.parse(jindu)
            this.setData({
                progress: jindu
            })
        }
        if (collection && this.data.onLoadFinished && collection !== this.data.currentCollection) {
            wx.showLoading({
                title: '加载中',
            })
            // 加载本地已经选择的记录和进度
            let current = this.data.current.filter(item => {
                return item.collection === collection
            })[0]
            // 获取本地进度
            let status = wx.getStorageSync(collection + "_progress");
            let progress = null;
            let currentCollection = current.collection;
            if (status) {
                console.log("test")
                // 获取到就赋值给progress
                progress = JSON.parse(status);
            }
            else {
                // 没有本地记录，说明需要进行设置
                console.log("fail to get")
                progress = {
                    finished: 0,
                    lasted: current.length,
                    currentItem: current.name,
                    currentPercent: 0
                }
                wx.setStorageSync(collection + "_progress", JSON.stringify(progress))
            }

            this.setData({
                progress,
                currentCollection,
            }, () => {
                wx.hideLoading({
                    complete: (res) => { },
                })
            })
        }
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