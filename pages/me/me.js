// pages/me/me.js
var base64 = require("../../utils/base64")
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 个人页面选项列表数据
     */
    infoList: [{
      text: "collections",
      icon: "",
      url: ""
    }, {
      text: "position",
      icon: "",
      url: ""
    }, {
      text: "posts",
      icon: "",
      url: ""
    }, {
      text: "favorite",
      icon: "",
      url: ""
    }],
    settingList: [{
        text: "setting",
        icon: "",
        url: ""
      },
      {
        text: "feedback",
        icon: "",
        url: ""
      }
    ],
    alreadyObtainedUserInfo: false,
    userInfo: {
      avatarUrl: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      icon: base64.icon20
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 获取用户信息
   */
  onGotUserInfo: function(res) {
    console.log(res)
    if (res.detail.errMsg == "getUserInfo:ok") {
      getApp().globalData.userInfo = res.detail.userInfo
      console.log("ok")
      this.setData({
        alreadyObtainedUserInfo: true,
        userInfo: res.detail.userInfo
      })
    }else{
      console.log("rejected")
    }
  }
})