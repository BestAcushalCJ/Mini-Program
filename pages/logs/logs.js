
var app = getApp();
var Util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum:null,
    password:null,
    logs:[]
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

  // click:function(){
  //   app.appData.userinfo = {username:this.data.username,password:this.data.password}
  //   console.log(app.appData.userinfo)
  //   wx.switchTab({
  //     url: '../personal/personal',
  //   })
  // },

  register:function(){
    wx.navigateTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  usernameInput: function (e) {
    this.setData({
      phonenum: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    wx.switchTab({
      url: '../scan/scan',
    })
    if (this.data.phonenum == null || this.data.password == null) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
      wx.request({
        url: 'https://www.wanyangculture.com/php/loginweixin.php',
        data: {//发送给后台的数据
          zhanghao : that.data.phonenum,
          password : that.data.password
        },
        header: {//请求头
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",//get为默认方法/POST
        success: function (res) {
          if (res.data == "1"){
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            app.appData.userinfo[0].phonenum = that.data.phonenum
            app.appData.userinfo[0].password = that.data.password
            app.appData.userinfo[0].Sta = true
            wx.switchTab({
              url: '../personal/personal',
            })
          }else if(res.data == "2"){
            wx.showToast({
              title: '密码不正确',
              icon: 'loading',
              duration: 2000
            })
          }else if(res.data == "0"){
            wx.showToast({
              title: '用户不存在',
              icon: 'loading',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '用户名和密码不匹配',
              icon: 'loading',
              duration: 2000
            })
          }
          console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
          // that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          //   logs: res.data.result
          // })
        },
        fail: function (err) { },//请求失败
        complete: function () { }//请求完成后执行的函数
      })
    }
  },

  register:function(){
    wx.navigateTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  forget:function(){
    wx.navigateTo({
      url: '../forget/forget',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})