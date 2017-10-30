// pages/book/book.js
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
    if (e.detail.value.userName.length == 0 || e.detail.value.tel.length == 0) {
      this.setData({
        tip: '提示：姓名和手机号不能为空！',
        userName: '',
        psw: ''
      })
    } else {
      this.setData({
        tip: '',
        userName: '用户名：' + e.detail.value.userName,
        psw: '密码：' + e.detail.value.psw
      })
      //post start
      wx.request({
        url: 'https://snailgarden.shxgwl.com/api/ly.asp',
        data: Util.json2Form({ userName: userName, psw: psw }),
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        // header: {'Content-Type': 'application/json'}, // 设置请求的 header
        // dataType:JSON,//该语句会将服务器端的数据自动转为string类型
        success: function (res) {
          // success
          this.setData({
            tip: '提示：提交成功，我们将尽快和您联系！',
            userName: '',
            psw: ''
          })

          //  console.log("返回数据为：" + res.data);
          //  console.log('submit success');
        },
        fail: function () {
          // fail
          //  console.log('submit fail');
        },
        complete: function () {
          // complete
         // console.log('submit comlete');
        }
      })
    //post end
    }
  }
})