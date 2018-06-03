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
  
    that = this;
    var signature = wx.getStorageSync('signature');
    var userinfo = wx.getStorageSync('userinfo');
    var openid = wx.getStorageSync('openid');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）

          url: '/pages/index/index'

        })
      }


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
          wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）

            url: '/pages/index/index'

          })
        }

      })

    }

  
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）

      url: '/pages/index/index'

    })
  //  console.log(app.globalData.userInfo);
  //  console.log(wx.getStorageSync('user'));

  }
})
var that;
var Util = require('../../utils/util.js');
