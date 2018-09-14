var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    currentTab: 0,
    booklist: [
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      },
      {
        src: "/pages/images/logo.png",
        text: "黑雪"
      }
    ],
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
    console.log(app.appData.userinfo[0].phonenum)

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
        app.appData.userinfo[0].username = res.data.telephone
        app.appData.userinfo[0].phonenum = res.data.telephone
        app.appData.userinfo[0].signature = res.data.signature
        app.appData.userinfo[0].weixinnum = res.data.wechat
        app.appData.userinfo[0].sex = res.data.sex
        app.appData.userinfo[0].birthday = res.data.birthday
        app.appData.userinfo[0].localplace = res.data.address
        app.appData.userinfo[0].nickname = res.data.nickname

        that.setData({
          username: app.appData.userinfo[0].username,
          phonenum: app.appData.userinfo[0].phonenum,
          weixinnum: app.appData.userinfo[0].weixinnum,
          phonenumSta: app.appData.userinfo[0].phonenumSta,
          signature: app.appData.userinfo[0].signature,
          weixinnumSta: app.appData.userinfo[0].weixinnumSta,
          sex: app.appData.userinfo[0].sex,
          birthday: app.appData.userinfo[0].birthday,
          localplace: app.appData.userinfo[0].localplace,
        })
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

  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value,e)
    app.appData.userinfo[0].sex = e.detail.value
  },

  edit: function () {
    wx.navigateTo({
      url: '../edit/edit',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  }
})