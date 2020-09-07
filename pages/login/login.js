// pages/login/login.js
const App = getApp();
Page({
  getUserInfo(res) {
    const userInfo = res.detail.userInfo
    console.log(userInfo);
    App.globalData.userInfo = userInfo;
    console.log(App.globalData.userInfo);
    wx.navigateBack({
      delta: 1,
    })
  }
})