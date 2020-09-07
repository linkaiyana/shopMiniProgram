// pages/profile/profile.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(App.globalData.userInfo.length !== 0) {
      this.setData({
        userInfo: App.globalData.userInfo
      })
    }
  }
})