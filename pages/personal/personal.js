var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: null,
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
    var that = this

    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          info: res.data
        })
        app.appData.userinfo[0].nickname = res.data.nickname
        if (app.appData.userinfo[0].nickname == null) {
          that.setData({
            nickname: '用户' + app.appData.userinfo[0].phonenum
          })
        } else {
          that.setData({
            nickname: app.appData.userinfo[0].nickname
          })
        }
        console.log(that.data.info.nickname)
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
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

  wallet: function () {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  borrow: function () {
    wx.navigateTo({
      url: '/pages/borrow/borrow',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  share: function () {
    wx.navigateTo({
      url: '../personoption/sharebook/sharebook',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  collectbook: function () {
    wx.navigateTo({
      url: '../personoption/collectbook/collectbook',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  collectbookcom: function () {
    wx.navigateTo({
      url: '../personoption/collectbookcom/collectbookcom',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  friend: function () {
    wx.navigateTo({
      url: '/pages/friend/friend',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  follow: function () {
    wx.navigateTo({
      url: '/pages/follow/follow',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  clear: function () {
    wx.navigateTo({
      url: '/pages/clear/clear',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  contact: function () {
    wx.navigateTo({
      url: '/pages/contact/contact',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  sharemybook:function(){
    wx.navigateTo({
      url: '../personoption/sharemybook/sharemybook',
    })
  },
  usercommit:function(){
    wx.navigateTo({
      url: '../personoption/usercommit/usercommit',
    })
  },

  suggestion: function () {
    wx.navigateTo({
      url: '/pages/suggestion/suggestion',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  logout:function(){
    
    app.appData.userinfo[0].username = null
    app.appData.userinfo[0].phonenum = null
    app.appData.userinfo[0].signature = null
    app.appData.userinfo[0].weixinnum = null
    app.appData.userinfo[0].sex = null
    app.appData.userinfo[0].birthday = null
    app.appData.userinfo[0].localplace = null
    app.appData.userinfo[0].nickname = null
    app.appData.userinfo[0].password = null 
    app.appData.userinfo[0].Sta = false 
    app.appData.userinfo[0].phonenumSta = true
    app.appData.userinfo[0].weixinnumSta = true
    
    wx.redirectTo({
      url: '../logs/logs',
    })
  }
})