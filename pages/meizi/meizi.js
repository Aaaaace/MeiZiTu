//index.js
//获取应用实例
const app = getApp()
const buttonFadeTimeout = 2000 // 按钮淡出超时（未实现该功能）

Page({
  data: {
    items: [],
    items_empty: []
  },
  onLoad: function() {
    console.log("onLoad")
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      mask: true,
      duration: 500
    })
    load_more(this)
  },
  onReachBottom: function() {
    console.log("onReachBottom")
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      mask: true,
      duration: 500
    })
    load_more(this)
  },
  /*
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    currentPage = 0
    itemList = []
    this.setData({
      items: itemList
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      mask: true,
      duration: 500
    })
    load_more(this)
  },
  onPageScoll: function() {

  },

  // 以下是组件事件
  /**
   *  轻触图片预览，只能预览当前及前十张、后十九共30张图片
   */
  on_item_tap: function(event) {
    //console.log("tap")
    if (event.currentTarget.dataset.url != null) {
      var tempUrls = this.data.items.map(item => item["url"])
      var targetUrls = [] // 将要预览的图片集的urls
      var tapedItemId = parseInt(event.currentTarget.id)
      var endId = tempUrls.length - tapedItemId > 20 ? 20 + tapedItemId : tempUrls.length
      var startId = tapedItemId > 10 ? tapedItemId - 10 : 0
      var targetUrls = tempUrls.slice(startId, endId)
      // 进入图片预览
      wx.previewImage({
        current: event.currentTarget.dataset.url,
        urls: targetUrls
      })
    }
  },

  /**
   * 一键存图，保存未保存过的前10张图或将剩余已加载的图片全部保存
   */
  on_button_tap: function() {
    // 获取权限
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
    })
    // 存图
    var targetNumber = (itemList.length - savedImgNum) > 10 ? 10 : itemList.length - savedImgNum
    for (var id = savedImgNum; id < targetNumber; id++) {
      wx.downloadFile({
        url: itemList[id].url,
        header: {
          "Constant-Type": "image/jpeg"
        },
        success: function(res) {
          console.log("ok")
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(errMsg) {
              console.log("ok2")
            }
          })
        }
      })
    }
    savedImgNum += targetNumber
  },
/*
  长按直接保存
*/
/*on_item_long_press: function(event) {
  if (event.currentTarget.dataset.url != null) {
    wx.saveFile({
      tempFilePath: event.currentTarget.dataset.url,
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          duration: 1000
        })
      }
    })
  }
},*/
})


var Constant = require("../../utils/constant.js")
var currentPage = 0
var savedImgNum = 0 // 已保存的图片数量
var itemList = [] // 保存获取的图片url和其他信息

/**
 * 请求图片
 * @param thePage: page对象
 */
function load_more(thePage) {
  console.log("load_more")

  var targetPage = ++currentPage // 请求的页数
  var temp_items = itemList
  wx.request({
    url: Constant.GET_MEIZI_URL + targetPage,
    dataType: "json",
    header: {
      "Constant-Type": "application/json"
    },
    success: function(res) {
      if (res == null ||
        res.data == null ||
        res.data.results == null ||
        res.data.results.length <= 0) {
        console.log("cant get meizi")
        return
      }
      // console.log(temp_items)
      for (var i = 0; i < res.data.results.length; i++) {
        temp_items.push({
          url: res.data.results[i].url,
          postTime: res.data.results[i].publishedAt.split("T")[0],
          host: res.data.results[i].who
        })
      }
      thePage.setData({
        items: temp_items
      })
    }
  })
}

/**
 * 计时器，用于记录按钮隐去的超时
 */
function timer() {
  var restTime = buttonFadeTimeout
}