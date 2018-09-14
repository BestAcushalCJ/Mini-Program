// pages/personoption/sharebook/sharebook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  donateBookScanCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        // wx.showLoading({
        //   title: '正在获取图书信息',
        //   mask: true,
        //   duration: 1000
        // })
        console.log("1")
        console.log(res.result)
        wx.request({
          url: 'http://feedback.api.juhe.cn/ISBN',
          data: {
            key: "7c83c1722524a38f79ea763ff26a2828",
            sub: res.result
          },
          method: "GET",
          success: (Res) => {
            //wx.hideLoading()
            console.log("2")
            console.log(Res.data)
            let bookInfoStr = JSON.stringify(Res.data.result)
            wx.navigateTo({
              url: '../donatedBookDetail/donatedBookDetail?bookInfoStr=' + bookInfoStr,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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