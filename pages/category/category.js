// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../service/category"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryItem: [],
    currentIndex: 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存分类数据
    this._getCategory();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
//--------------私有函数-----------------------
  _getCategory() {
    getCategory().then(res => {
      console.log(res);
      // 获取分类数据
      const categories = res.data.data.category.list;
      // 初始化数据
      const categoryItem = []
      categories.forEach((item, index) => {
        categoryItem[index] = {
          subCategories: [],
          categoryDetail: {
            currentType: 'pop',
            'pop' : [],
            'new' : [],
            'sell' : [],
          }
        }
      })
      console.log(res.data.data.category.list);
      this.setData({
        categories,
        categoryItem
      })
      console.log(this.data.categoryItem);
      
      // 获取分类子数据
      // 获取第一条数据
      this._getSubcategory(0);
      this._getCategoryDetail(0, 'pop')
      this._getCategoryDetail(0, 'new')
      this._getCategoryDetail(0, 'sell')
    })
  },
  _getSubcategory(index) {
    const maitkey = this.data.categories[index].maitKey;
    getSubcategory(maitkey).then(res => {
      console.log(res);
      const subCategoties = res.data.data.list;
      console.log(subCategoties);
      
      const dateType = `categoryItem[${index}].subCategories`
      // 设置数据
      this.setData({
        [dateType] : subCategoties
      })
      console.log(this.data.categoryItem);
    })
  },
  _getCategoryDetail(index, type) {
    const miniWallKey = this.data.categories[index].miniWallkey;
    getCategoryDetail(miniWallKey, type).then(res => {
      const data = res.data
      const dateType = `categoryItem[${index}].categoryDetail.${type}`
      this.setData({
        [dateType]: data
      });
    });
  },
// --------------事件监听-----------------

  // 监听菜单点击
  itemTap(event) {
    const currentIndex = event.detail.currentIndex;
    this.setData({
      currentIndex
    });
    
    this._getSubcategory(currentIndex);
    this._getCategoryDetail(currentIndex, 'pop');
    this._getCategoryDetail(currentIndex, 'new');
    this._getCategoryDetail(currentIndex, 'sell');
  },
  //监听tabControl点击
  tabClick(event) {
    const index = event.detail.index;
    console.log(index);
    let currentType = ''
    switch(index) {
      case 0:
        currentType = 'pop'
        break
      case 1: 
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    }
    const dataType = `categoryItem[${this.data.currentIndex}].categoryDetail.currentType`
    this.setData({
      [dataType]: currentType
    })
  }
})