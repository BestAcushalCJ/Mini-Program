var Util = require('../../utils/util.js')
var app = getApp()
var hostDomain = 'https://www.wanyangculture.com'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null,
    current: 0,
    collectStatu: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetComments()
  },

  //获得相关书评数据
  GetComments: function () {
    var that = this
    wx.showLoading({
      title: '书评加载中',
      mask: true,
      duration: 1000
    })
    //调用获取书评接口获得最新书评
    //需要提供uid参数
    wx.request({
      url: hostDomain + '/php/show_new_comment.php',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data:{
        uid: app.appData.userinfo[0].phonenum
      },
      success: (res) => {
        //显示第一条书评对于当前用户的收藏状态
        let tempComments = res.data
        console.log(tempComments)
        this.setData({
          collectStatu: (tempComments[0].state)==0?0:1
        })
        //将时间戳格式的时间转化为年月日的格式
        for(let i = 0; i <50; i++){
          if(tempComments[i] != null)
          {
            tempComments[i].comment_time = Util.formatTime(new Date(tempComments[i].comment_time * 1000))
          }
          else break
        }
        //下载书评配图，图片名字格式为uid.jpg
        let downloadComment_uid = tempComments[0].uid
        let url = "https://www.wanyangculture.xyz/user/"+String(downloadComment_uid)+".jpg"
        wx.downloadFile({
          url: url,
          success: (res) => {
            let temp = res.tempFilePath
            let current = that.data.current
            tempComments[current].img_url = temp
            console.log(tempComments)
            that.setData({
              comments: tempComments
            })
          }
        })
        wx.hideLoading()
      }
    })
  },


  //滑动事件的触发函数，需要一直更新current，用于表示相应书评信息的数组下标
  handleChange: function (e) {
    var that = this
    let current = e.detail.current
    let commentCount = this.data.comments.length
    if (current == commentCount) {
      this.GetComments()
      //刷新返回第一个item
      this.setData({
        current: 0
      })
    }
    //更新当前的下标,更新书评的收藏状态
    else{
      this.setData({
        current: current,
        collectStatu: that.data.comments[current].state
      })
      let tempComments = that.data.comments
      let downloadComment_uid = tempComments[current].uid
      let url = "https://www.wanyangculture.xyz/user/" + String(downloadComment_uid) + ".jpg"
      wx.downloadFile({
        url: url,
        success: (res) => {
          let temp = res.tempFilePath
          let current = that.data.current
          tempComments[current].img_url = temp
          that.setData({
            comments: tempComments
          })
        }
      })
    }
  },

  //收藏按钮触发事件
  bindCollectTap: function (){
    var that = this
    let uid = app.appData.userinfo[0].phonenum   //当前用户id
    let current = this.data.current
    let comment_uid = this.data.comments[current].uid  //书评作者id
    let commentid = this.data.comments[current].commentid
    console.log(comment_uid)
    console.log(commentid)
    console.log(this.data.collectStatu)
    //收藏书评
    if (this.data.collectStatu == 0){
      wx.request({
        url: hostDomain + '/php/collect_comment.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          uid: uid,
          commentid: commentid
        },
        method:'POST',
        success: (res) =>{
          console.log(res)
          if(res.data == "1"){
            wx.showToast({
              title: '收藏成功',
            })
            let tempComment = that.data.comment
            tempComment[current].state =1
            that.setData({
              collectStatu: 1,
              comment:tempComment
            })
          }
          else{
            wx.showToast({
              title: '请不要重复收藏',
            })
          }
        }
      })
    }
    //取消收藏书评
    else if(this.data.collectStatu == 1){
      wx.request({
        url:  hostDomain + '/php/cancel_collect_comment.php',
        data:{
          uid: uid,
          commentid: commentid
        },
        method: 'POST',
        success: (res) =>{
          console.log(res)
          if(res.data == 1){
            wx.showToast({
              title: '取消收藏成功',
            })
            let tempComment = that.data.comment
            tempComment[current].state = 0
            that.setData({
              collectStatu: 0,
              comment: tempComment
            })
          }
          else{
            wx.showToast({
              title: '还未收藏本书评',
            })
          }
        }
      })
    }
    //同时上传服务器收藏状态更新状态

  },

  bindEditBtnTap: function () {
    wx.navigateTo({
      url: '../commentWriting/commentWriting',
    })
  },

  bindAuthorTap: function(){
    let tempComemnt = this.data.comments
    let current = this.data.current
    let col_uid = tempComemnt[current].uid
    wx.navigateTo({
      url: '../commentUserInfo/commentUserInfo?col_uid='+col_uid,
    })
  },

  bindReputationTap: function(){
    let tempComemnt = this.data.comments
    let current = this.data.current
    let commentid = tempComemnt[current].commentid
    wx.navigateTo({
      url: '../commentComment/commentComment?commentid='+commentid,
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
    // let loginSta = app.appData.userinfo[0].sta  //获取当前登陆状态
    // if (!loginSta) {
    //   wx.navigateTo({
    //     url: '../logs/logs?pageSource=1',
    //   })
    // }
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