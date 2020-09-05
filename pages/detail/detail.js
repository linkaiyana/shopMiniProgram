// pages/detail/detail.js
import {
  getDetail,
  BaseInfo,
  ShopInfo,
  ShopParams,
  getRecommend
} from "../../service/detail"

const App = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    titles: ['商品', '参数', '评论', '推荐'],
    banners: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    shopParams: {},
    shopComment: {},
    recommendGoods: [],
    paramsTop: null,
    commentTop: null,
    reCommendTop: null,
    navHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.createSelectorQuery().select('#nav').boundingClientRect(rect => {
      this.setData({
        navHeight: rect.height
      })
    }).exec()
    // 保存参数iid
    this.setData({
      iid: options.iid
    });

    // 获取商品数据
    this._getDetail(this.data.iid);
    // 获取推荐数据
    this._getRecommend();
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
  onPageScroll(option) {
    const scrollTop = option.scrollTop;
    let navCpn = this.selectComponent('#nav');
    const dataType = 'navCpn.data.currentIndex'
    if(scrollTop >= this.data.reCommendTop) {
      navCpn.setData({
        currentIndex: 3
      })
    }else if (scrollTop >= this.data.commentTop) {
      navCpn.setData({
        currentIndex: 2
      })
    }else if (scrollTop >= this.data.paramsTop) {
      navCpn.setData({
        currentIndex: 1
      })
    }else {
      navCpn.setData({
        currentIndex: 0
      })
    }
    
    
    
  },


  // --------------私有函数-------------------
  _getDetail(iid) {
    getDetail(iid).then(res => {
      const data = res.data.result;
      const banners = data.itemInfo.topImages;
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

      // 保存商店基本信息
      const shopInfo = new ShopInfo(data.shopInfo)
      this.setData({
        shopInfo
      })

      // 保存图片信息
      const detailInfo = data.detailInfo;
      this.setData({
        detailInfo
      })

      // 保存商品参数信息
      const shopParams = new ShopParams(
        data.itemParams.info,
        data.itemParams.rule
      )
      this.setData({
        shopParams
      });

      // 保存评论基本信息
      const shopComment = data.rate;
      this.setData({
        shopComment
      })
    })
  },
  _getRecommend() {
    getRecommend().then(res => {
      this.setData({
        recommendGoods: res.data.data.list
      })
    })
  },
  _getScrollTop(id, params) {
    wx.createSelectorQuery().select(id).boundingClientRect(rect => {
      this.setData({
        [params]: rect.top - this.data.navHeight
      })
    }).exec()
  },
 
  // ------------事件监听--------------

  // 监听导航栏点击
  itemTap(event) {
    const index = event.detail.index;
    switch (index) {
      case 0:
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
        break
      case 1:
        wx.pageScrollTo({
          scrollTop: this.data.paramsTop,
          duration: 300,
        })
        break
      case 2:
        wx.pageScrollTo({
          scrollTop: this.data.commentTop,
          duration: 300,
        })
        break
      case 3:
        wx.pageScrollTo({
          scrollTop: this.data.reCommendTop,
          duration: 300,
        })
        break
    }

  },
  // 监听图片加载
  imageLoad() {
    this._getScrollTop('#params', "paramsTop")
    this._getScrollTop('#comment', "commentTop")
    this._getScrollTop('#recommend', "reCommendTop")
  },
  // 监听加入购物车
  addCart() {
    const product = {};
    product.image = this.data.banners[0];
    product.title = this.data.baseInfo.title;
    product.price = this.data.baseInfo.lowPrice;
    product.desc = this.data.detailInfo.desc;
    product.ischeck = true;
    product.iid = this.data.iid;
    App.addToCart(product).then(res => {
      wx.showToast({
        title: res,
        mask: true
      })
    });
    console.log(App.globalData.products);
    
  }
})