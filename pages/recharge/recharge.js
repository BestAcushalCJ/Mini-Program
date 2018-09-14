Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sta1: false,
    Sta2: false,
    Sta3: false,
    Sta4: false,
    money:0,
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

  five:function(){
    this.setData({
      Sta1: true,
      Sta2: false,
      Sta3: false,
      Sta4: false,
      money: 5,
    })
  },

  ten: function () {
    this.setData({
      Sta1: false,
      Sta2: true,
      Sta3: false,
      Sta4: false,
      money: 10,
    })
  },

  twenty: function () {
    this.setData({
      Sta1: false,
      Sta2: false,
      Sta3: true,
      Sta4: false,
      money: 20,
    })
  },

  fifty: function () {
    this.setData({
      Sta1: false,
      Sta2: false,
      Sta3: false,
      Sta4: true,
      money: 50,
    })
  }
})