// pages/face/face.js
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 有哪些题库
    tiku: [],
    // 当前题库
    currentTiku: null,
    // 是否选择了题库(控制显示)
    choosed: false,
    // 题目
    list: []
  },

  chooseTiku(e) {
    console.log(e.currentTarget.dataset.value)
    // 获取参数（下标）
    let currentClick = e.currentTarget.dataset.value;
    let name = e.currentTarget.dataset.name;
    // 显示是否确定
    wx.showModal({
      title: '提示',
      content: `确定是否选择${name}?`,
      success: (res) => {
        if (res.confirm) {
          // this.data.
          this.setData({
            currentTiku: this.data.tiku[currentClick].collection
          }, () => {
            wx.setStorageSync('face_collection', this.data.tiku[currentClick].collection)
            this.updateCurrent()
          })

        } else if (res.cancel) {
          return;
        }
      }
    })

  },
  // 更新题库
  async updateCurrent() {
    wx.showLoading({
      title: '加载中',
    });
    let currentTiku = this.data.currentTiku;
    console.log(currentTiku)
    let list = await db.collection(currentTiku).get()
    list = list.data[0]
    // 处理请求到的数据，适应当前数据结构
    list = list.items.map((item, idx) => {
      return {
        id: "widget" + idx,
        name: item,
        open: false,
        pages: list[item].map(smallItem => { return smallItem.title }),
        ans: list[item].map(smallItem => { return smallItem.ans})
      }
    })
    console.log(list)
    this.setData({
      list,
      choosed: true
    }, () => {
      wx.setStorageSync('face_list', this.data.list)
      wx.hideLoading({
        success: (res) => { },
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: async function (options) {
    // 加载数据库题库列表
    let tiku = await db.collection("face").get();
    tiku = tiku.data
    tiku = tiku.map(item => {
      item['choosed'] = false;
      return item;
    })
    console.log(tiku)
    this.setData({
      tiku
    })
    //从本地读取
    let collection = wx.getStorageSync('face_collection');
    // console.log(collection)
    if (collection) {
      this.setData({
        currentTiku: collection
      },()=>{
        this.updateCurrent()
      })
    }
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