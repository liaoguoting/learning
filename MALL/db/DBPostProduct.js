class DBPostProduct {

  constructor(proId) {
    this.storageKeyName = 'productList';
    this.proId = proId;
    // var carts = [];

  }
  // 获取全部数据
  getAllData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').productList;
      // console.log('res  ' + res);
      this.exectSetStorageSync(res);
    }
    return res;
  }

  // 获取单条数据
  getItemData() {
    var allData = this.getAllData();
    for (var i = 0; i < allData.length; i++) {
      if (this.proId == allData[i].proId) {
        console.log('------');
        return {
          index: i,
          data: allData[i]
        }
      }
    }
  }

  // 保存、更新缓存数据
  exectSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
  // 更改缓存
  changeData(category) {
    var allData = this.getAllData(),
      item = this.getItemData(),
      itemData = item.data,
       carts = [];
    switch (category) {
      case 'collect':
        if (itemData.collectStatus) {
          itemData.collectStatus = false;
        } else {
          itemData.collectStatus = true;
        }
        break;

      case 'reduce':
        if (itemData.buyNum > 1) {
          itemData.buyNum--;
        } else {
          itemData.buyNum = 1;
        }
        break;

      case 'increase':
        itemData.buyNum++;
        break;
      default:
        break;
    }
    // 更新数据
    allData[item.index] = itemData;
    // 更新缓存
    this.exectSetStorageSync(allData);
    // 返回数据
    return itemData;
  }
  // 收藏
  collect() {
    return this.changeData('collect');
  }
  // 购买商品数减一
  reduce() {
    return this.changeData('reduce');
  }
  // 购买商品数加一
  increase() {
    return this.changeData('increase');
  }

};


export {
  DBPostProduct
}