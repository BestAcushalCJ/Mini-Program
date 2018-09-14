  var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:null,
    name:null,
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
      url: 'https://www.wanyangculture.com/php/show_person_col.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        that.setData({
          uid: res.data
        })
        console.log(that.data)
        var N = new Array();
        if (that.data.uid != "") {
          for (var i = 0; i < that.data.uid.length; i++) {
            wx.request({
              url: 'https://www.wanyangculture.com/php/show_person.php',
              data: {
                uid: that.data.uid[i].col_uid
              },
              header: {//请求头
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'POST',
              success: function (res) {
                N.push(res.data.nickname)
                that.setData({
                  name: N
                })
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        }else{
          that.setData({
            name: null
          })
        }
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
})