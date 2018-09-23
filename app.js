//app.js
App({
  onLaunch: function(options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取权限
    wx.authorize({
      scope: 'scope.userLocation',
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      }
    })
  },

  globalData: {
    userInfo: null,
    systemInfo: null
  },

  onShow: function(options) {

  },
  onHide: function() {

  },
  // 小程序发生脚本错误，或者 api 调用失败时触发
  onError: function(error) {
    console.log(error)
  },
  // 小程序要打开的页面不存在时触发
  onPageNotFound: function(msg) {
    console.log("onPageNotFound:" + msg["path"] + "不存在") // 显示不存在的页面路径
    wx.redirectTo({
      url: 'pages/meizi/meizi',
    })
  }
})