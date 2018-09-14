var app = getApp()
var hostDomain = 'https://www.wanyangculture.com'
const uploadImage = require('../../utils/UploadAliyun.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname: null,
    comment: null,
    tempFilePaths: null,
    btnType: "上传图片"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  booknameInput: function(e){
    this.setData({
      bookname: e.detail.value
    })
  },

  commentInput: function(e){
    this.setData({
      comment: e.detail.value
    })
  },

  //根据bookname提交书评接口还未给出
  submitBtnTap: function(e){
    var that = this
    if(that.data.btnType == "上传图片"){
      wx.chooseImage({
        success: function (res) {
          //封装的上传图片api
          console.log(res.tempFilePaths[0])
          let tempFilePaths = res.tempFilePaths
          uploadImage({
            uid: app.appData.userinfo[0].phonenum,
            filePath: res.tempFilePaths[0],
            dir: 'user/',   //阿里云上保存照片的目录
            success: function (res) {
              that.setData({
                btnType: '提交书评',
                tempFilePaths:tempFilePaths
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        },
      })
    }
    else if(that.data.btnType == "提交书评"){
      let uid = app.appData.userinfo[0].phonenum
      wx.request({
        url: hostDomain + '/php/book_comment.php',
        //提交的数据
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {
          uid: uid,
          bookname: that.data.bookname,
          comment: that.data.comment
        },
        method: "POST",
        success: (res) => {
          wx.navigateBack({           
          })
        }
      })
    }
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