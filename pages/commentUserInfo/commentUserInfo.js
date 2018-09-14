var app = getApp();
var hostDomain = 'https://www.wanyangculture.com'

Page({
  data: {
    items: [
      { name: 'male', value: '男' },
      { name: 'famale', value: '女' },
    ],
    nickname: null,
    phonenum: null,
    phonenumSta: null,
    weixinnum: null,
    weixinnumSta: null,
    username: null,
    sex: null,
    birthday: null,
    localplace: null,
    signature:null,
    followState:'未关注',
    col_uid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      col_uid:options.col_uid
    })
    console.log(this.data.col_uid)
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
        uid: that.data.col_uid
      },
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {      
        let info = res.data
        console.log(info)
        that.setData({
          nickname:info.nickname,
          username: that.data.col_uid,
          phonenum: that.data.col_uid,
          weixinnum: info.wechat,
          sex: info.sex,
          birthday: info.birthday,
          localplace: info.address,
          signature:info.signature
        })
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

  follow: function () {
    var that = this
    console.log(this.data.followState)
    console.log(that.data.col_uid)
    let uid = app.appData.userinfo[0].phonenum
    console.log(uid)
    //当前用户未关注的情况
    if(this.data.followState == '未关注'){
      wx.request({
        url: hostDomain+ '/php/collect_person.php',
        header:{
          'content-type':'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{
          uid:uid,
          col_uid: that.data.col_uid
        },
        method:'POST',
        success:(res)=>{
          //关注成功
          console.log(res)
          if(res.data == "1"){
            wx.showToast({
              title: '关注成功',
            })
          }
          else{
            wx.showToast({
              title: '该用户已关注！',
            })
          }
          that.setData({
            followState: '已关注'
          })
        }
      })
    }
    //已关注当前用户的情况
    else{
      wx.request({
        url: hostDomain + '/php/cancel_collect_person.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: uid,
          col_uid: that.data.col_uid
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          if (res.data == "1") {
            wx.showToast({
              title: '取消关注成功',
            })
          }
          else{
            wx.showToast({
              title: '还未关注该用户',
            })
          }
          that.setData({
            followState: '未关注'
          })
        }
      })
    }
  }
})