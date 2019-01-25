// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [{
      title: "我的收货地址",
      tap: "address"
    }],
    safe: [{
      title: "账户与安全",
      tap: "safe"
    }],
    setting: [{
      title: "地区设置",
      tap: "addSet"
    }, {
      title: "音效与通知",
      tap: "music"
    }, {
      title: "隐私",
      tap: "privacy"
    }, {
      title: "通用",
      tap: "common"
    }],
    ques: [{
      title: "问题反馈",
      tap: "ques"
    }, {
      title: "关于商城",
      tap: "about"
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 我的收货地址
  address:function(){
wx.navigateTo({
  url: 'address-detail/address-detail',
})
  },
  about: function () {
    console.log(2);
  },
})