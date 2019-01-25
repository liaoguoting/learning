class DBPost {
  constructor(typeId) {
    this.storageKeyName = 'typeList';
    this.typeId = typeId;
  }
  // 获取全部数据
  getAllData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').typeList;
      console.log('res  ' + res);
      this.exectSetStorageSync(res);
    }
    return res;
  }

  // 获取单条数据
  getItemData() {
    var allData = this.getAllData();
    for (var i = 0; i < allData.length; i++) {
      if (this.typeId == allData[i].typeId) {
        // console.log('------');
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

  // 改变颜色
  dbColor() {
    var allData = this.getAllData(),
      itemData = this.getItemData().data;
    // 让分类页左边距 颜色恢复
    for(var i = 0;i < allData.length;i++){
      allData[i].bgFlag = false;
    }
    itemData.bgFlag = true;

    allData[this.getItemData().index] = itemData;
    this.exectSetStorageSync(allData);
    return itemData;

  }

};


export {
  DBPost
}