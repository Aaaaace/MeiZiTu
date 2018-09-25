//api url
var BASE_URL = "https://gank.io/api"
var GET_MEIZI_URL = BASE_URL.concat("/data/福利/10/")
var GET_XIANDU_URL = BASE_URL.concat("/xiandu/data/id/zhihu/count/10/page/")

/**
 * 用于请求并解析一般的页面数据
 * @param thePage 页面对象
 * @param url 请求api的url
 * 待修改
 */
function load_more(thePage, url) {
  console.log("load_more:", url)
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    mask: true,
    duration: 20000
  })
  wx.request({
    url: url,
    dataType: "json",
    header: {
      "Constant-Type": "application/json",
    },
    success: function(res) {
      // console.log(res)
      if (res == null ||
        res.data == null ||
        res.data.results == null ||
        res.data.results.length <= 0) {
        console.log("cant get data")
        return
      }
      // console.log(temp_items)
      var temp_listItems = thePage.data.listItems
      for (var i = 0; i < res.data.results.length; i++) {
        temp_listItems.push({
          title: res.data.results[i].title,
          cover: res.data.results[i].cover,
          site: res.data.results[i].site,
          url: res.data.results[i].url,
          published_at: res.data.results[i].published_at,
          raw: res.data.results[i].raw
        })
      }
      thePage.setData({
        listItems: temp_listItems
      })
      wx.hideToast()
    }
  })
}

//将变量、方法暴露出去
module.exports = {
  BASE_URL: BASE_URL,
  GET_MEIZI_URL: GET_MEIZI_URL,
  GET_XIANDU_URL: GET_XIANDU_URL,
  load_more: load_more
}