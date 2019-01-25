// pages/cart/cart.js
import {
  DBPostProduct
} from '../../db/DBPostProduct.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    allChooseFlag: false,
    total: 0,
    buyCount: 0, //结算
    delBtnWidth: 180 //删除按钮宽度单位（rpx）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var newData = wx.getStorageSync('cartItems');
    for (var i = 0; i < newData.length; i++) {
      newData[i].singleChooseFlag = false,
        newData[i].allChooseFlag = false
    }
    wx.setStorageSync('cartItems', newData);
    var useData = wx.getStorageSync('cartItems');

    this.setData({
      carts: useData
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
  // 减少
  reduce: function(event) {
    var allMoney = 0;
    var proId = event.currentTarget.dataset.proId;
    var newData = wx.getStorageSync('cartItems');
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].proId == proId && newData[i].buyNum > 1) {
        newData[i].buyNum = newData[i].buyNum - 1;
        // 单独选中或全选
        if (newData[i].singleChooseFlag || newData[i].allChooseFlag) {
          console.log('newData[i].buyNum ' + newData[i].buyNum);
          allMoney = this.data.total - newData[i].price * 1;

        }
        wx.setStorageSync('cartItems', newData)

        var useData = wx.getStorageSync('cartItems');
        this.setData({
          carts: useData,
          total: allMoney.toFixed(1),
        })
      } else if (newData[i].proId == proId && newData[i].buyNum <= 1) {
        allMoney = newData[i].price;
        newCount = 1;

      }
    }

  },
  // 增加
  increase: function(event) {
    var allMoney = 0;
    var proId = event.currentTarget.dataset.proId;
    var newData = wx.getStorageSync('cartItems');
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].proId == proId) {
        newData[i].buyNum = newData[i].buyNum + 1;
        // 选中状态下才改变合计，结算数量
        if (newData[i].singleChooseFlag || newData[i].allChooseFlag) {
          // !!!这里"+"变成字符串连接导致计算错误
          allMoney = parseFloat(this.data.total) + parseFloat(newData[i].price * 1);
        }
        wx.setStorageSync('cartItems', newData)
        var useData = wx.getStorageSync('cartItems');
        var allMoneyFloat = (parseFloat(allMoney)).toFixed(1);
        this.setData({
          carts: useData,
          total: allMoneyFloat,
        })
      }
    }
  },

  // 选中
  pointChoose: function(event) {
    console.log()
    var allMoney = 0;
    var newCount = 0;
    // 获得选中产品proId
    var proId = event.currentTarget.dataset.proId;
    var newData = wx.getStorageSync('cartItems');
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].singleChooseFlag) {
        this.setData({
          allChooseFlag: false
        })
        for (var j = 0; j < newData.length; j++) {

          newData[j].allChooseFlagCart = false;
        }
      }
      if (newData[i].proId == proId) {
        newData[i].singleChooseFlag = !newData[i].singleChooseFlag;
        newData[i].allChooseFlag = false;
        console.log('singleChooseFlag ' + newData[i].singleChooseFlag + "  " + newData[i].allChooseFlag)
        wx.setStorageSync('cartItems', newData)
      }
    }
    var useData = wx.getStorageSync('cartItems');
    for (var i = 0; i < useData.length; i++) {
      // 若购物车商品被选中
      if (useData[i].singleChooseFlag) {
        newCount = ++newCount;
        allMoney = parseFloat(allMoney) + parseFloat(useData[i].price * useData[i].buyNum)
      }
    }
    this.setData({
      carts: useData,
      total: allMoney.toFixed(1),
      buyCount: newCount,
    })
  },
  // 全选
  allChoose: function() {
    var allMoney = 0;
    var newCount = 0;
    var newData = wx.getStorageSync('cartItems');
    for (let i = 0; i < newData.length; i++) {
      newData[i].allChooseFlag = !newData[i].allChooseFlag

      console.log('allChooseFlag  ' + newData[i].allChooseFlag)
      if (newData[i].allChooseFlag) {
        allMoney = parseFloat(allMoney) + parseFloat(newData[i].price * newData[i].buyNum);
        newCount = newData.length;
        for (let j = 0; j < newData.length; j++) {

          newData[j].singleChooseFlag = true
        }
      } else {
        allMoney = 0;
        newCount = 0;
        for (let j = 0; j < newData.length; j++) {
          newData[j].singleChooseFlag = false;
        }
      }
    }
    //更新缓存
    wx.setStorageSync('cartItems', newData);
    // 重新获取数据
    var useData = wx.getStorageSync('cartItems');

    this.setData({
      allChooseFlag: !this.data.allChooseFlag,
      carts: useData,
      total: allMoney.toFixed(1),
      buyCount: newCount
    })
  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        // 设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      })
    }
  },
  touchM: function(e) {
    if (e.touchS.length == 1) {
      // 手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      // 手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = '';
      if (disX == 0 || disX < 0) {
        // 移动位置小于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) { //手指移动最大距离值为按钮宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
    }
  },
  // 删除
  delCart: function(event) {
    var proId = event.currentTarget.dataset.proId;
    // 获取购物车商品
    var newData = wx.getStorageSync('cartItems');
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].proId == proId) {
        
        newData.splice(i, 1);
        wx.setStorageSync('cartItems', newData);
      } 
    }
    var useData = wx.getStorageSync('cartItems');

    this.setData({
      carts: useData,
      buyCount:0,
      total:0
    })

  }


})