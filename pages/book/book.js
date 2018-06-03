// pages/book/book.js
var url = wx.getStorageSync('url');
var openid= wx.getStorageSync('openid');
var username,tip,tel,has;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  formBindsubmit: function (e) {
    if (e.detail.value.username.length == 0 || e.detail.value.tel.length == 0) {
      this.setData({
        tip: '提示：姓名和手机号不能为空！',
        username: '',
        tel: ''
      })
    } else {
      this.setData({
        tip: '',
        username: e.detail.value.username,
        tel: e.detail.value.tel

      })
      username = e.detail.value.username;
      tel = e.detail.value.tel;
console.log(url);
      //post start
      wx.request({
        url: url + 'api/ly.asp',
        data: Util.json2Form({ openid: openid, username: username, tel: tel }),
    method: 'post',
    header: { "Content-Type": "application/x-www-form-urlencoded" },

        success: function (res) {
          // success
      //    console.log(res.data);
          //  console.log('submit success');
          wx.reLaunch({    

            url: '/pages/bookok/bookok'

          })
        }
                
      })
    //post end


    
    }
  }
})
var that;
var Util = require('../../utils/util.js');