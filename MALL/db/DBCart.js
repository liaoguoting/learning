class DBCart {
  constructor() {
    this.storageKeyName = 'cartList';
    // this.cartId = cartId;
  }
  // 获取全部数据
  getAllData() {
    console.log('getAllData');
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').cartList;
      console.log('res  ' + res);
      this.exectSetStorageSync(res);
    }
    return res;
  }

  // 获取单条数据
  getItemData() {
    // var allData = this.getAllData();
    // for (var i = 0; i < allData.length; i++) {
    //   if (this.typeId == allData[i].typeId) {
    //     // console.log('------');
    //     return {
    //       index: i,
    //       data: allData[i]
    //     }
    //   }
    // }
  }

 // 添加到购物车
  putCarts(data){
    this.exectSetStorageSync(data);

  }
  // 保存、更新缓存数据
  exectSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
};

export {
  DBCart
}