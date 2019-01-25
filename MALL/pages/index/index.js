import {
  DBPostProduct
} from '../../db/DBPostProduct.js';


//获取应用实例
const app = getApp()

Page({
  data: {
    title:"开心商城",
    
  },
 
  onLoad: function () {
    this.dbPostProduct = new DBPostProduct();
    // 获取全部数据
    var allData = this.dbPostProduct.getAllData();
    this.setData({
      productList: allData
    })
  },

  // 进入商品详情页
  turnDetail:function(event){
    // 获取相应产品id
    var proId = event.currentTarget.dataset.proId;
    console.log(proId)
    wx.navigateTo({//跳转至商品详情页
      url: 'index-detail/index-detail?id=' + proId,
   })
  },
  // 分享页
  onShareAppMessage:function(){
    return {
      title:this.data.title,
      path:"pages/index/index"
    }
  }
})
