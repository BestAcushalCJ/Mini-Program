var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: null,
    info: null,
    items: [
      { name: 'male', value: '男' },
      { name: 'famale', value: '女' },
    ],
    signature: null,
    nickname: null,
    phonenum: null,
    phonenumSta: false,
    weixinnum: null,
    weixinnumSta: false,
    username: null,
    sex: null,
    birthday: null,
    localplace: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: options.id
    })
    console.log(options)
    var that = this

    wx.request({
      url: 'https://www.wanyangculture.com/php/show_person.php',
      method: "POST",
      data: {
        uid: that.data.uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          info: res.data
        })

        that.setData({
          username : res.data.telephone,
          phonenum : res.data.telephone,
          signature : res.data.signature,
          weixinnum : res.data.wechat,
          sex : res.data.sex,
          birthday : res.data.birthday,
          localplace : res.data.address,
          nickname : res.data.nickname,

          // username: app.appData.userinfo[0].username,
          // phonenum: app.appData.userinfo[0].phonenum,
          // weixinnum: app.appData.userinfo[0].weixinnum,
          // phonenumSta: app.appData.userinfo[0].phonenumSta,
          // signature: app.appData.userinfo[0].signature,
          // weixinnumSta: app.appData.userinfo[0].weixinnumSta,
          // sex: app.appData.userinfo[0].sex,
          // birthday: app.appData.userinfo[0].birthday,
          // localplace: app.appData.userinfo[0].localplace,
        })
        if (that.data.nickname == null) {
          that.setData({
            nickname: '用户' + that.data.phonenum
          })
        }
        console.log(that.data.info.nickname)
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

  },
  
  cancel: function () {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/cancel_collect_person.php',//取消关注的接口
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum,
        col_uid: this.data.uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        if(res.data == 1){
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({
            title: '取消关注失败',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})