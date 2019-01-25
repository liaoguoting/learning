// pages/classification/classification.js
import {
  DBPost
} from '../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dbPost = new DBPost(this.data.productId);

    var allData = this.dbPost.getAllData();
    // 页面加载时设置第一个背景色为白
    allData[0].bgFlag = true;
    for (var i = 1; i < allData.length; i++) {
      allData[i].bgFlag = false;
    }
    // 获取单条数据
    var itemData = this.dbPost.getItemData().data;

    this.setData({
      type: allData,
      itemList: allData[0].obj,

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
  // 改变左边view的背景颜色
  changeColor: function(event) {
    // 获取点击的id
    var productId = event.currentTarget.dataset.productId;
    var dbPost = new DBPost(productId);
    // 获取单条数据
    var itemColor = dbPost.dbColor();
    console.log("^^" + itemColor.bgFlag)
    var allData = dbPost.getAllData();
    console.log(" &&&^^^^^^ " + productId);

    // var itemData = dbPost.getItemData().data;

    console.log('itemColor.pageBackgroundColor ' + itemColor.pageBackgroundColor)
    this.setData({
      type: allData,
      itemList: itemColor.obj,
      // 'itemList.pageBackgroundColor': itemColor.pageBackgroundColor

    })

  },
})