Page({
  
  data: {
    scrollindex: 0,  //当前页面的索引值
    totalnum: 11,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop: 0,  //滑动下拉距离
    //花园水电
    hysd: [
      { url: 'https://snailgarden.shxgwl.com/xgwl/img/page4-1.gif' ,tit:'总坚向排水图'},
      { url: 'https://snailgarden.shxgwl.com/xgwl/img/page4-2.gif', tit: '总坚向排电图'}
    ],
    //花园小品
        hyxp: [
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page5-1.jpg', tit: 'title'},
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page5-1.jpg', tit: 'title'},
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page5-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page5-1.jpg', tit: 'title' }
    ],
        //花园乔木
        hyqm: [
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page6-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page6-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page6-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page6-1.jpg', tit: 'title' }
        ],
            //花园灌木
        hygm: [
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page7-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page7-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page7-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page7-1.jpg', tit: 'title' }
        ]
    ,
        //花园花境
        hyhj: [
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' }
        ]
    ,
        //花园花絮
        hyhx: [
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' },
          { url: 'https://snailgarden.shxgwl.com/xgwl/img/page8-1.jpg', tit: 'title' }
        ]
  },
  onLoad: function () {
    
   // console.log(wx.getStorageSync('userinfo'));
    var signature=wx.getStorageSync('signature');
    var userinfo = wx.getStorageSync('userinfo');
   // console.log(signature);
    //post start
    wx.request({
      url: 'https://snailgarden.shxgwl.com/',
      data: Util.json2Form({ opid: signature, userinfo: userinfo}),
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" },
     // header: {'Content-Type': 'application/json'}, // 设置请求的 header
     // dataType:JSON,//该语句会将服务器端的数据自动转为string类型
      success: function (res) {
        // success

        console.log("返回数据为：" + res.data);

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
  },
  listenSwiper: function (e) {
    //打印信息
   // console.log(e)
  },
  
  scrollTouchstart: function (e) {
    let py = e.touches[0].pageY;
    this.setData({
      starty: py

    })
    console.log("s-py:"+py);
  },
  scrollTouchmove: function (e) {
    let py = e.touches[0].pageY;
    console.log("e-py:"+py);
    let d = this.data;
    this.setData({
      endy: py,
    })
    if (py - d.starty < 100 && py - d.starty > -100) {
      this.setData({
        margintop: py - d.starty
        
      })

    }

  },
  scrollTouchend: function (e) {
    let d = this.data;
    if (d.endy - d.starty > 100 && d.scrollindex > 0) {
      this.setData({
        scrollindex: d.scrollindex - 1
      })
    //  console.log(d.endy-d.starty);
    } else if (d.endy - d.starty < -100 && d.endy - d.starty > -320 && d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1
      })
    //  console.log(d.endy - d.starty);
    }
    this.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
  },
  //////////////////
  
  ////////////////
})
var that;
var Util = require('../../utils/util.js');