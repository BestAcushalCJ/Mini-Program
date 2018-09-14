var app = getApp()
var Util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reputations: null,
    reputationStr:"",
    commentid:null,
    userpic:"../images/user1.png"
  },

  bindCommentInput: function(e){
    this.setData({
      reputationStr:e.detail.value
    })
  },

//提交书评
  toSubmit: function(){
    if(this.data.reputationStr == null){
      wx.showToast({
        title: '评论内容不能为空',
        icon:"none"
      })
    }
    else{
      var that = this
      let uid = app.appData.userinfo[0].phonenum
      wx.request({
        url: 'https://www.wanyangculture.com/php/cmt_cmt.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: uid,
          commentid: that.data.commentid,
          reputationStr: that.data.reputationStr
        },
        method: "POST",
        success: (res) => {
          console.log(res.data)
          if(res.data == "1"){
            that.setData({
              reputationStr: ""
            })
            that.GetComments()
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到当前的commentid
    this.setData({
      commentid:options.commentid
    })
    //获取评论
    this.GetComments()
  },

  GetComments: function(){
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/ret_cmt_cmt.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        commentid: that.data.commentid
      },
      method: "POST",
      success: (res) => {
        let tempComments = res.data
        for (let i = 0; i < 20; i++) {
          if (tempComments[i] != null) {
            tempComments[i].cmt_time = Util.formatTime(new Date(tempComments[i].cmt_time * 1000))
          }
          else break
        }
        that.setData({
          reputations: tempComments
        })
      }
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