var app = getApp()
function downloadSaveFiles(obj) {
  // console.info("准备下载。。。"); 
  let that = this;
  let success = obj.success; //下载成功 
  let fail = obj.fail; //下载失败 
  let urls = obj.urls; //下载地址 数组，支持多个 url下载 [url1,url2] 
  let urlsLength = urls.length; // 有几个url需要下载 
  let test = new Array()
  let bookpic = new Array()
  bookpic.length = urls.length
  for (let i = 0; i < urlsLength; i++) {
    wx.downloadFile({
      url: urls[i],
      success: function (res) {
        //console.dir(res); //一个文件下载保存成功 

        bookpic[i] = res.tempFilePath
        test.push(res.tempFilePath)
        if (test.length == urlsLength) {
          //如果所有的url 才算成功 
          if (success) {
            success(bookpic)
          }
        }
      },
      fail: function (e) {
        console.info("下载失败");
        if (fail) {
          fail(e);
        }
      }
    })
  }
}

module.exports = {
  downloadSaveFiles: downloadSaveFiles
}