//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
        //https://snailgarden.shxgwl.com/
    //http://192.168.1.13/
    wx.setStorageSync('url', 'https://snailgarden.shxgwl.com/')
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //获取openid开始
        const APP_ID = 'wx28c6e95caccd13c8';//输入小程序appid
        const APP_SECRET = '2ee2a7f3ee8fcbe00e08bb9db971302d';//输入小程序app_secret
        var OPEN_ID = ''//储存获取到openid
        var SESSION_KEY = ''//储存获取到session_key
        var that = this;

//https://api.weixin.qq.com/sns/jscode2session
        var url = wx.getStorageSync('url');
     //   console.log(res.code);
            wx.request({
              url: url+'api/wxapi.asp',
              data: {
                appid: APP_ID,
                secret: APP_SECRET,
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              method: 'GET',
              success: function (res) {
              //  console.log(res.data)
              //  OPEN_ID = res.data.openid;//获取到的openid
                wx.setStorageSync('openid', res.data.openid)
              //  SESSION_KEY = res.data.session_key;//获取到session_key
              //  console.log(OPEN_ID.length)
              //  console.log(SESSION_KEY.length)
                console.log(res.data)

              }
            })



        //获取openid结束
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('userinfo', res.userInfo)
              wx.setStorageSync('signature', res.signature)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    signature:null
  }
})