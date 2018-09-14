var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'male', value: '男' },
      { name: 'famale', value: '女' },
    ],
    signature: null,
    nickname: null,
    phonenum: null,
    phonenumSta: null,
    weixinnum: null,
    weixinnumSta: null,
    username: null,
    sex: null,
    birthday: null,
    localplace: null,
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
    this.setData({
      username: app.appData.userinfo[0].username,
      phonenum: app.appData.userinfo[0].phonenum,
      weixinnum: app.appData.userinfo[0].weixinnum,
      signature: app.appData.userinfo[0].signature,
      phonenumSta: app.appData.userinfo[0].phonenumSta,
      weixinnumSta: app.appData.userinfo[0].weixinnumSta,
      sex: app.appData.userinfo[0].sex,
      birthday: app.appData.userinfo[0].birthday,
      localplace: app.appData.userinfo[0].localplace,
    })
    if (app.appData.userinfo[0].nickname == null) {
      this.setData({
        nickname: '用户' + app.appData.userinfo[0].phonenum
      })
    } else {
      this.setData({
        nickname: app.appData.userinfo[0].nickname
      })
    }
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

  nicknameInput:function(e){
    app.appData.userinfo[0].nickname = e.detail.value
  },

  signatureInput: function (e) {
    app.appData.userinfo[0].signature = e.detail.value
  },

  localInput: function (e) {
    app.appData.userinfo[0].localplace = e.detail.value
  },

  radioChange: function (e) {
    app.appData.userinfo[0].sex = e.detail.value
  },

  switch1Change: function (e) {
    app.appData.userinfo[0].phonenumSta = e.detail.value
  },

  switch2Change: function (e) {
    app.appData.userinfo[0].weixinnumSta = e.detail.value
  },

  finish: function () {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/change_person_info.php',
      method: "POST",
      data: {
        uid: app.appData.userinfo[0].phonenum,
        nickname: app.appData.userinfo[0].nickname,
        introduction: app.appData.userinfo[0].signature,
        xingbie: app.appData.userinfo[0].sex,
        birthday: app.appData.userinfo[0].birthday,
        address: app.appData.userinfo[0].localplace,
        wechat: app.appData.userinfo[0].weixinnum,
        email: null
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res)
        console.log(app.appData.userinfo[0].sex)
        if(res.data == 1){
          that.setData({
            nickname: app.appData.userinfo[0].nickname,
            username: app.appData.userinfo[0].username,
            phonenum: app.appData.userinfo[0].phonenum,
            weixinnum: app.appData.userinfo[0].weixinnum,
            phonenumSta: app.appData.userinfo[0].phonenumSta,
            weixinnumSta: app.appData.userinfo[0].weixinnumSta,
            sex: app.appData.userinfo[0].sex,
            birthday: app.appData.userinfo[0].birthday,
            localplace: app.appData.userinfo[0].localplace,
          })

          wx.navigateBack({
            delta: 1,
          })

        }else{
          wx.showToast({
            title: '修改失败',
            icon: 'fail',
            duration: 2000
          })
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})