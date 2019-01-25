Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '',
    inputPhone: '',
    inputAddress: '',
    importFlag: false, //是否为默认地址
    index: 0,
    delFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var delFlag = wx.getStorageSync('delFlag');
    var allData = wx.getStorageSync('addressList');
    var index = allData.length;
    if ((typeof id) == 'string') {
      this.setData({
        index: id
      })
    } else {
      this.setData({
        index: index
      })
    }
    if (!delFlag) {
      this.setData({
        delFlag: false
      })
    }

    for (var i = 0; i < allData.length; i++) {
      if (allData[i].index == id) {
        console.log(allData[i].index + ' edit if')
        this.setData({
          inputName: allData[i].name,
          inputPhone: allData[i].phone,
          inputAddress: allData[i].address,
          importFlag: allData[i].importFlag //是否为默认地址
        })
      }
    }
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
  onShareAppMessage: function() {},
  // 收货人
  addWho: function(event) {
    var name = event.detail.value;
    this.data.inputName = name;
  },
  // 手机号码
  addPhone: function(event) {
    var phone = event.detail.value;
    this.data.inputPhone = phone;
  },
  // 地址
  addWhere: function(event) {
    var address = event.detail.value;
    this.data.inputAddress = address;
  },

  // 删除地址
  delAddress: function() {
    // console.log("删除" + this.data.index)
    var allData = wx.getStorageSync('addressList');
    for (var i = 0; i < allData.length; i++) {
      if (allData[i].index == this.data.index) {
        allData.splice(allData[i].index, 1);
        wx.setStorageSync('addressList', allData)
      }
    }

    // 弹出提示
    wx.showToast({
      title: '删除成功',
    })
  },
  // 是否设为默认地址
  importAdress: function() {
    // this.data.importFlag = true;
   var allData = wx.getStorageSync('addressList');
for(var i = 0;i < allData.length;i++){
  if(allData[i].index==this.data.index){
    allData[i].importFlag = true;
  }else{
    allData[i].importFlag = false;
  }
}
    wx.setStorageSync('addressList', allData);

    // 弹出提示
    wx.showToast({
      title: '地址设置成功',
    })
  },
  // 保存地址
  save: function() {
    console.log('this.data.index ' + this.data.index)
    // 写入缓存
    var addressList = wx.getStorageSync('addressList') || [];
    for (var i = 0; i < addressList.length; i++) {
      // 地址id可以在数组找到则是在编辑地址
      if (addressList[i].index == this.data.index) {
        addressList[i].name = this.data.inputName;
        addressList[i].phone = this.data.inputPhone;
        addressList[i].address = this.data.inputAddress;
        addressList[i].importFlag = this.data.importFlag;
        addressList[i].index = i;
        wx.setStorageSync('addressList', addressList);
        wx.showToast({
          title: '保存成功',
        })
        return;
      }
    }

    addressList.push({
      name: this.data.inputName,
      phone: this.data.inputPhone,
      address: this.data.inputAddress,
      importFlag: this.data.importFlag,//默认地址
      index: this.data.index
    })
    wx.setStorageSync('addressList', addressList);

    wx.showToast({
      title: '保存成功',
    }),
      wx.navigateTo({
        url: '../address-detail/address-detail',
      })
  }
})