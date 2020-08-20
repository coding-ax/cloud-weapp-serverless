// pages/topic/topic.js
const db = wx.cloud.database();
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tiku: [],
        current: null,
        // 是否显示结果
        clicked: false,
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
        rightStyle: `background-color: #2ecc71;color:#fff;`,
        // 标记当前显示的题目
        nowIndex: 0,
        // 用来打印错误信息
        error: '',
        // 标记已经做到的地方
        finishStatus: 0
    },
    // 点击选项
    clickedItem(event) {
        this.setData({
            clicked: true
        })

    },
    // 上一题点击
    prevTick(event) {
        if (this.data.nowIndex === 0) {
            // 已经是第一个
            this.setData({
                error: "当前为第一个",
            })
            return;
        }
        let nowIndex = (this.data.nowIndex - 1);
        let current = this.data.tiku[nowIndex];
        this.setData({
            nowIndex,
            current,
            clicked: true
        })

    },
    // 下一题被点击
    nextTick(event) {
        if (this.data.nowIndex === this.data.tiku.length - 1) {
            // 已经是第一个
            this.setData({
                error: "当前为最后一个",
            })
            return;
        }
        let nowIndex = (this.data.nowIndex + 1);
        let current = this.data.tiku[nowIndex];
        // 小于该进度需要显示答案
        if (nowIndex < this.data.finishStatus) {
            this.setData({
                nowIndex,
                current,
                clicked: true
            })
        }
        // 否则推动进度
        else {
            this.setProgress();
            this.setData({
                nowIndex,
                current,
                clicked: false,
            })
        }

    },
    // 收藏被点击
    pickTick(event) {
        let collection = wx.getStorageSync('collection');
        let current = this.data.current;
        let picked = wx.getStorageSync(collection + "_pick");
        // 没有被收藏 进行收藏
        if (this.data.ops[1].src === "../../images/icons/pick.png") {
            if (picked) {
                picked = JSON.parse(picked)
                picked.picked.push(current)
            }
            else {
                picked = {
                    picked: []
                }
                picked.picked.push(current)
            }
            wx.setStorageSync(collection + "_pick", picked)
            this.data.ops[1].src = "../../images/icons/picked.png"
            this.setData({
                ops: this.data.ops
            }, () => {
                wx.showToast({
                    title: '收藏成功',
                    duration: 1000
                })
            })
        }
        //被收藏了 取消收藏
        else {
            // 被收藏肯定是有的
            picked=JSON.parse(picked)
            picked.picked.remove(current);
            wx.setStorageSync(collection + "_pick", picked)
            this.data.ops[1].src = "../../images/icons/pick.png"
            this.setData({
                ops: this.data.ops
            }, () => {
                wx.showToast({
                    title: '取消收藏',
                    duration: 1000
                })
            })
        }
    },
    // 设置进度
    setProgress() {
        let collection = wx.getStorageSync('collection');
        let collection_status = JSON.parse(wx.getStorageSync(collection + '_progress'));
        collection_status.finished++;
        collection_status.lasted--;
        collection_status.currentPercent = Math.round(collection_status.finished / (collection_status.lasted + collection_status.finished) * 100);
        wx.setStorageSync(collection + '_progress', JSON.stringify(collection_status))
        this.setData({
            finishStatus: this.data.finishStatus + 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        wx.showLoading({
            title: '加载中',
        })
        // 获取当前题库
        let collection = wx.getStorageSync('collection');
        // 未选择就跳转去选择 
        if (!collection) {
            wx.hideLoading({
                success: (res) => { },
            })
            wx.redirectTo({
                url: '/pages/choose/choose',
            })
            return
        }
        // 获取当前题库进度（已经在选择时进行了初始化）
        let collection_status = JSON.parse(wx.getStorageSync(collection + '_progress'));
        // 从数据库获取题库
        let tiku = await db.collection(collection).get();
        tiku = tiku.data[0].tiku;
        // 处理-1
        let nowIndex = collection_status.finished - 1 === -1 ? 0 : collection_status.finished - 1;
        let current = tiku[nowIndex];
        // 设置数据
        this.setData({
            current,
            tiku,
            nowIndex,
            finishStatus: nowIndex
        }, () => {
            setTimeout(() => {
                // 设置防抖
                wx.hideLoading({
                    success: (res) => { },
                })
            }, 300);

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