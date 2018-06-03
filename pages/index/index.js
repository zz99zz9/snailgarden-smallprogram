//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dlink: '../../pages/book/book',
    dname:"加载中……"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
    
  },
  onLoad: function () {
  
    that=this;
    var signature = wx.getStorageSync('signature');
    var userinfo = wx.getStorageSync('userinfo');
    var openid = wx.getStorageSync('openid');

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.spost(openid, userinfo);
console.log("已经有数据")

    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        
      }
      this.spost(openid, userinfo);
      console.log("异步加载数据")

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
    //      app.globalData.signature = res.signature
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }

      })
      this.spost(openid, userinfo);
      console.log("登录后有数据");
    }
  // console.log("userinfo:" + userinfo.nickName);
 //console.log("signature:" + signature);
  
  
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
  //  console.log(app.globalData.userInfo);
  //  console.log(wx.getStorageSync('user'));

  },fifi:function(){
    that.setData({
      dlink: '../../pages/garden/garden',
      dname: '进入我的花园'
    })
  },
  spost: function (openid, userinfo){
    //post start
    console.log(userinfo);
    var url = wx.getStorageSync('url');
    wx.request({


      url: url + 'api/userinfo.asp',
      data: Util.json2Form({
        opid: openid,
        nickname: userinfo.nickName,
        avatarurl: userinfo.avatarUrl,
        gender: userinfo.gender,
        province: userinfo.province,
        city: userinfo.city,
        tel: userinfo.tel
      }),
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      // header: {'Content-Type': 'application/json'}, // 设置请求的 header
      // dataType:"json",//该语句会将服务器端的数据自动转为string类型
      success: function (res) {
        // success

        if (res.data.has == 1) {
            console.log("有花园");
          that.setData({
            dlink: '../../pages/garden/garden',
            dname: '进入我的花园'
          })
        } else {
            console.log("没花园");
          that.setData({
            dlink: '../../pages/book/book',
            dname: '预约造园'
          })
        }
        //      console.log(res.data.has);

        //     console.log("返回数据为：" + res.data);

      },
      fail: function () {
        // fail
        //  console.log('submit fail');
      },
      complete: function () {
        // complete

      }
    })
    //post end
  }
})
var that;
var Util = require('../../utils/util.js');
