// pages/detail/detail.js
import {
  getDetail,
  BaseInfo
} from "../../service/detail"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    banners: [],
    baseInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存参数iid
    this.setData({
      iid: options.iid
    });

    // 获取商品数据
    this.getDetail(this.data.iid);
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


  // --------------私有函数-------------------
  getDetail(iid) {
    getDetail(iid).then(res => {
      console.log(res);
      const data = res.data.result;
      const banners = data.itemInfo.topImages;
      console.log(banners);
      this.setData({
        banners
      });
      // 保存商品基本信息
      const baseInfo = new BaseInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.setData({
        baseInfo
      });
      console.log(this.data.baseInfo);
      
    })
  }
})