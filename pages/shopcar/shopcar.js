// pages/shopcar/shopcar.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    isCheckAll: false,
    count: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 改变商品状态
    App.changeState = (index, goods) => {
      // 重新设置指定商品数据
      this.setData({
        [`products[${index}]`]: goods
      })
      // 检查全选状态
      const checkAll = !this.data.products.find(item => !item.ischeck)
      this.setData({
        isCheckAll: checkAll
      })
      // 更新参数
      this.updateData()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 绑定数据
    this.setData({
      products: App.globalData.products
    });
    const checkAll = App.globalData.products.length == 0 ? false : !this.data.products.find(item => !item.ischeck)
    this.setData({
      isCheckAll: checkAll
    })
    this.updateData()

    // 展示标题
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.products.length})`,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  updateData() {
    // 获取加入购物车的商品数量
    const count = this.data.products.filter(item => item.ischeck).reduce((value,item) => value + item.count , 0)
    // 获取总价格
    const totalPrice = this.data.products.filter(item => item.ischeck).reduce((value,item) => value + item.price * item.count , 0)
    this.setData({
      count,
      totalPrice
    })
  },

  // ----------------事件监听-------------------
  // 监听全选按钮的点击
  revAllCheck() {
    if (this.data.products.length == 0) {
      wx.showToast({
        title: '没有可选商品',
        image: '/assets/cart/warning.png',
        mask: true
      })
    } else {
      // 如果已经全选
      if (this.data.isCheckAll) {
        this.data.products.forEach(item => {
          item.ischeck = false
        })
        this.setData({
          products: this.data.products,
          isCheckAll: false
        })
      } else {
        this.data.products.forEach(item => {
          item.ischeck = true
        })
        this.setData({
          products: this.data.products,
          isCheckAll: true
        })
      }
    }
    this.updateData()
  },
  toCalc() {
    // 判断是否有选中的商品
    const checkLength = this.data.products.find(item => item.ischeck)
    console.log(checkLength);
    // 没有选中的商品，弹出弹窗
    if (!checkLength) {
      wx.showToast({
        title: '请选择商品',
        image: '/assets/cart/warning.png',
        mask: true
      })
    }
  }

})