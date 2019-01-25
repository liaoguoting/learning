// pages/mine/address-detail/address-detail.js


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var allData = wx.getStorageSync('addressList');
    // console.log(allData)

    this.setData({
      addressList: allData
    })
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
this.onLoad();
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
  // 添加新地址
  add: function() {
    //将删除地址隐藏
    wx.setStorageSync('delFlag', false);
    wx.navigateTo({
      url: '../address-edit/address-edit',
    })
  },
  // 默认地址
  defaultAddress:function(){

    
  },
  // 编辑地址
  edit: function(event) {
    var id = event.currentTarget.dataset.id;
    //显示删除地址
    wx.setStorageSync('delFlag', true);
    console.log('index ' + id);
    wx.navigateTo({
      url: '../address-edit/address-edit?id=' + id,
    })
  }
})