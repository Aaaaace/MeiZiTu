// pages/xiandu/xiandu.js
var Constant = require("../../utils/constant.js")
var currentPage = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.listItems.length > 0) {
      return
    }
    var url = Constant.GET_XIANDU_URL + (++currentPage)
    Constant.load_more(this, url)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var url = Constant.GET_XIANDU_URL + (++currentPage)
    Constant.load_more(this, url)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 以下是组件事件
   */
  on_item_tap: function(res){
    var id = res.currentTarget.dataset.id
    for(var i=0,len=this.data.listItems.length;i<len;i++){
      if(this.data.listItems[i].id==id){
        wx.setStorageSync("xiandu_detail", this.data.listItems[i].raw)
        wx.setStorageSync("xiandu_detail_url", this.data.listItems[i].url)
        break
      }
    }
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})