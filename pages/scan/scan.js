var hostDomain = 'https://www.wanyangculture.com'
var app = getApp()
//获得机器位置、捐书和借书接口有问题
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,
    latitude: 0,
    longitude: 0,
    markers: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.调用wx.getLocation系统API,获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02", // 坐标系类型
      // 获取经纬度成功回调
      success: (res) => { // es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象
        this.setData({  // 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });

    // 2.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: '../images/location.png',
            position: {
              left: 20,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '../images/scan.png',
            position: {
              left: res.windowWidth / 2 - 45,
              top: res.windowHeight - 100,
              width: 90,
              height: 90
            },
            clickable: true
          },
          {
            id: 3,
            iconPath: '../images/marker.png',
            position: {
              left: res.windowWidth / 2 - 11,
              top: res.windowHeight / 2 - 45,
              width: 22,
              height: 45
            },
            clickable: false
          }]
        })
      }
    });

    //3.访问服务器，获得共享图书设备的位置并标记
    //目前没有较好的标记图片素材
    wx.request({
      url: 'https://www.easy-mock.com/mock/5aae0ff22b69a0654fe443f3/example/bookPosition',
      data: {},
      method: 'GET',
      success: (res) => {
        this.setData({
          markers: res.data.data
        })
        console.log(this.data.markers)
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
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("Map"); // map地图组件的id：Map
    this.movetoPosition()
  },
  // 定位函数，移动位置到地图中心
  movetoPosition: function () {
    this.mapCtx.moveToLocation();
  },

  bindcontroltap: function (e) {
    var that = this; //获得当前界面副本，这一步不可缺少，在回调函数中不能成功调用自定义函数

    // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第2步设置的id
    switch (e.controlId) {
      //点击定位控件
      case 1: this.movetoPosition(); break;
      case 2:
        //判断用户是否登陆,如果未登陆，切换到登陆界面先进行登陆
        if (app.appData.userinfo[0].Sta == false) {
          wx.navigateTo({
            url: '../logs/logs',
          })
        }
        else {
          /**
           * 
           *           wx.showModal({
            title: '选择功能',
            content: '',
            confirmColor: '#101010',
            cancelText: '投书',
            confirmText: '借/还书',
            success: (res) => {
              if (res.confirm) {
                that.borrowBookScanCode();
              }
              else if (res.cancel) {
                that.donateBookScanCode();
              }
            }
          })
           */
          that.borrowBookScanCode();
        }
    }
  },

  //借书扫码函数
  borrowBookScanCode: function () {
    wx.scanCode({
      success: (res) => {
        wx.showLoading({
          title: '正在校验信息',
          mask: true,
          duration: 200
        })
        //获得扫描结果,现在还没有制作出带有json数据的二维码
        let box_id = "1"
        let door_id = "1"
        let uid = app.appData.userinfo[0].phonenum
        wx.request({
          url: hostDomain +"/php/open_door.php",
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data:{
            box_id: box_id,
            door_id: door_id,
            uid: uid
          },
          method:"POST",
          success: (res)=>{
            if(res.data == 1){
              wx.showToast({
                title: '开门成功',
              })
            }
          }
        })
      }
    })
  },

  //捐书扫码函数
  //逻辑功能：扫描图书条码，通过豆瓣api获取图书信息并显示，并选择是否捐书
  donateBookScanCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        // wx.showLoading({
        //   title: '正在获取图书信息',
        //   mask: true,
        //   duration: 1000
        // })
        console.log("1")
        console.log(res.result)
        wx.request({
          url: 'http://feedback.api.juhe.cn/ISBN',
          data: {
            key: "7c83c1722524a38f79ea763ff26a2828",
            sub: res.result
          },
          method: "GET",
          success: (Res) => {
            //wx.hideLoading()
            console.log("2")
            console.log(Res.data)
            let bookInfoStr = JSON.stringify(Res.data.result)
            wx.navigateTo({
              url: '../donatedBookDetail/donatedBookDetail?bookInfoStr=' + bookInfoStr,
            })
          }
        })
      }
    })
  },

  //移动地图触发函数
  bindregionchange: function (e) {
    var that = this;
    if (e.type == "begin") {
      wx.request({
        url: 'https://www.easy-mock.com/mock/5aae0ff22b69a0654fe443f3/example/bookPosition',
        data: {},
        method: "GET",
        success: (res) => {
          that.setData({
            markers: res.data.data
          })
        }
      })
    }
    //else if(e.type == "end"){
    //  markers = this.data._markers
    //}
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