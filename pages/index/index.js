const app = getApp();
const { extend, pullUpLoading } = require("../../pullUpLoading/index.js");
var download = require("../../utils/download.js")

Page(extend(pullUpLoading, {
  data: {
    list: _createData(2),
    index: 1,
    more: true,
    hot: false,
    currentTab: 0,
    books: null,
    current: 0,
    hot_book: null,
    recommend_book: null,
    book_url: null,
    user:[
      {nickname:'fourous', uid:15172189627,count:10},
      { nickname: 'wang', uid: 15232355412, count:9  },
      { nickname: 'hencai', uid: 2323232322, count: 8 },
      { nickname: 'unameca', uid: 45622354231, count: 7 },
      { nickname: 'cajjskk', uid: 5623389542, count: 6 },
      { nickname: 'fjakgl', uid: 5323230565, count: 5 },

    ]
  },
  onLoad() {
    var that = this
    wx.request({
      url: 'https://www.wanyangculture.com/php/hot_book.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        id: 'list_hot'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          hot_book: res.data,
        })

        //将图片的url放到数组中
        var book_url_0 = new Array()
        for (var i in that.data.hot_book) {
          let id = that.data.hot_book[i].bookid
          let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
          console.log(i)
          book_url_0.push(url)
          console.log(book_url_0)
        }

        //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
        download.downloadSaveFiles({
          urls: book_url_0,
          success: function (res) {
            let hot_book_0 = that.data.hot_book
            for (var j in hot_book_0) {
              hot_book_0[j].tag = res[j]
            }
            that.setData({
              hot_book: hot_book_0
            })
          },
          fail: function (e) {
            console.info("下载失败");
          }
        })


        //将appData中的值赋给热销书数组中的tag
        
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })

    wx.request({
      url: 'https://www.wanyangculture.com/php/hot_book.php',
      method: "POST",//get为默认方法/POST
      header: {//请求头
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        id: 'list_recommend'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          recommend_book: res.data
        })

        var book_url_0 = new Array()
        for (var i in that.data.recommend) {
          let id = that.data.recommend_book[i].bookid
          let url = "https://www.wanyangculture.xyz/book/" + String(id) + ".jpg"
          book_url_0.push(url)
        }

        //调用封装方法实现多图片的下载，而且在appData中的数据顺序是正确的
        download.downloadSaveFiles({
          urls: book_url_0,
          success: function (res) {
            let recommend_book_0 = that.data.recommend_book
            for (var j in recommend_book_0) {
              recommend_book_0[j].tag = res[j]
            }
            that.setData({
              recommend_book: recommend_book_0
            })
          },
          fail: function (e) {
            console.info("下载失败");
          }
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })




    console.log("page start");
  },

  // onShow(){
  //   var that = this
  //   let hot_book_0 = that.data.hot_book
  //   for (var j in hot_book_0) {
  //     hot_book_0[j].tag = app.appData.bookpic[j]
  //   }
  //   console.log("hhh")
  //   console.log(hot_book_0)
  //   that.setData({
  //     hot_book: hot_book_0
  //   })
  // },
  
  fetchData() {
    const _this = this;
    const delay = 3000;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(_createData(20));
      }, delay);
    });
  },
  pullUpLoadingEvent() {
    const _this = this;

    _this.startPullUpLoading(startTime => {
      _this.fetchData()
        .then(_list => {
          _this.setData({ list: [..._this.data.list, ..._list] });
          _this.stopPullUpLoading();
        })
        .catch(errMsg => {
          console.log(errMsg);
        });
    });
  },

  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
}));

function _createData(count) {
  let data = new Array(count);
  return data;
}

// function downloadSaveFiles(obj) {
//   // console.info("准备下载。。。"); 
//   let that = this;
//   let success = obj.success; //下载成功 
//   let fail = obj.fail; //下载失败 
//   let urls = obj.urls; //下载地址 数组，支持多个 url下载 [url1,url2] 
//   let savedFilePaths = new Map();
//   let urlsLength = urls.length; // 有几个url需要下载 
//   for (let i = 0; i < urlsLength; i++) {
//     downloadSaveFile({
//       url: urls[i],
//       success: function (res) {
//         //console.dir(res); //一个文件下载保存成功 
      
//         savedFilePaths.set(res.id, res);
//         console.info("savedFilePath:%s", savedFilePath);
//         if (savedFilePaths.size == urlsLength) {
//           //如果所有的url 才算成功 
//           if (success) {
//             success(savedFilePaths)
//           }
//         }
//       },
//       fail: function (e) {
//         console.info("下载失败");
//         if (fail) {
//           fail(e);
//         }
//       }
//     })
//   }
// }

// module.exports = {
//   downloadSaveFiles: downloadSaveFiles
// }


