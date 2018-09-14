var app = getApp()
var download = require("../../utils/download.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    bookpicture:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/show_lend.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        uid : app.appData.userinfo[0].phonenum
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list:res.data
        })

        var book_url_0 = new Array()
        for (var i in that.data.list) {
          let id = that.data.list[i].bookid
          let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
          book_url_0.push(url)
        }

        //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
        download.downloadSaveFiles({
          urls: book_url_0,
          success: function (res) {
            that.setData({
              bookpicture:res
            })
          },
          fail: function (e) {
            console.info("下载失败");
          }
        })



      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
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