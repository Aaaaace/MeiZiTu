
/**
 * 用于请求并解析一般的页面数据
 * @param thePage 页面对象
 * @param
 */
function load_more(thePage, url) {
  console.log("load_more_meizi")

  var targetPage = ++currentPage // 请求的页数
  var temp_items = itemList
  wx.request({
    url: Constant.GET_MEIZI_URL + targetPage,
    dataType: "json",
    header: {
      "Constant-Type": "application/json"
    },
    success: function (res) {
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