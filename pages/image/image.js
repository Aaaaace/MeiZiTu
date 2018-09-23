Page({
  data: {
    url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      url: options.url
    });
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
  on_image_long_press: function(event) {
    wx.showModal({
      title: '保存',
      content: '是否保存图片？',
      confirmText: "保存",
      confirmColor: "#844153",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          console.log(event);
          if (event.currentTarget.dataset.url != null) {
            wx.saveFile({
              tempFilePath: event.currentTarget.dataset.url,
              success: function(res) {
                console.log(res);
                wx.showToast({
                  title: '保存成功',
                  duration: 1000
                });
              }
            });
          }
        }
      }
    });
  }
})