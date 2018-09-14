var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion:null
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

  },

  suggest: function (e) {
    this.setData({
      suggestion: e.detail.value
    })
  },

  suggestion:function(){
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/sug_fedback.php',
      data: {//发送给后台的数据
        uid: app.appData.userinfo[0].phonenum,
        sug: that.data.suggestion
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",//get为默认方法/POST
      success: function (res) {
        console.log(res)
        if(res.data == 1){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({
            title: '提交失败',
            icon: 'clear',
            duration: 2000
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})