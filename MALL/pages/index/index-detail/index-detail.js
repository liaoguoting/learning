// pages/index/index-detail/index-detail.js
import {
  DBPostProduct
} from '../../../db/DBPostProduct.js';
import {
  DBCart
} from '../../../db/DBCart.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dbPostProduct = new DBPostProduct(options.id);
    this.dbCart = new DBCart();
    var allData = this.dbPostProduct.getAllData(),
      itemData = this.dbPostProduct.getItemData().data;
    this.setData({
      proList: itemData
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
  //收藏
  collect: function() {
    this.setData({
      'proList.collectStatus': this.dbPostProduct.collect().collectStatus
    })
   
    if (!this.dbPostProduct.collect().collectStatus){
      console.log("if  " + this.dbPostProduct.collect().collectStatus)
    // 弹出提示
    wx.showToast({
      title: '收藏成功',
    })
    }else{
      console.log("else " + this.dbPostProduct.collect().collectStatus)
      wx.showToast({
        title: '取消收藏',
      })
    }
  },

  // 减少
  reduce: function() {
    this.setData({
      'proList.buyNum': this.dbPostProduct.reduce().buyNum
    })
  },
  // 增加
  increase: function() {
    this.setData({
      'proList.buyNum': this.dbPostProduct.increase().buyNum
    })
  },
  // 显示添加购物车页
  buyShow: function() {
    this.setData({
      buyFlag: !this.data.buyFlag
    })
  },
  // 点击取消 隐藏购物车页
  buyHideCancel: function() {
    this.setData({
      buyFlag: !this.data.buyFlag
    })
  },

  //点击确定
  buyHideConfirm: function() {
    var itemData = this.dbPostProduct.getItemData().data;
    // !!!
    var cartItems = wx.getStorageSync('cartItems') || [];
    var exist = cartItems.find(function(ele) {
      return ele.proId === itemData.proId;
    })

    if (exist) {
      // 如果加入购物车的商品已经在购物车，改变其购买件数即可
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].proId == itemData.proId) {
          cartItems[i].buyNum = itemData.buyNum
        }
      }
    } else {
      cartItems.push({
        imgUrl: itemData.imgUrl,
        name: itemData.name,
        price: itemData.price,
        buyNum: itemData.buyNum,
        proId: itemData.proId,
        singleChooseFlag: false,
        allChooseFlagCart: false,
        id:cartItems.length
      })
    }

    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
      success: function() {
        wx.showToast({
          duration: 1500,
          title: '已添加进购物车',
          icon: "success"
        })
      }
    })

    this.setData({
      buyFlag: !this.data.buyFlag
    })

  },
})