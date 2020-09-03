// pages/home/home.js
import { 
  getMulData,
  getGoodsData
 } from "../../service/home.js"

// 定义存储回到顶部按钮的距离
const TOTOP = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommend: [],
    titles: ['流行','精品','新款'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    currentType: 'pop',
    isShowBackTop: false,
    isTabFixed: false,
    tabOffsetTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图和推荐数据
    this.getMulData();
    // 获取商品数据
    this.getGoodsData('pop');
    this.getGoodsData('new');
    this.getGoodsData('sell');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // --------私有方法-----------
  getMulData() {
    getMulData().then(res => {
      const banners = res.data.data.banner.list;
      const recommend = res.data.data.recommend.list;

      this.setData({
        banners: banners,
        recommend: recommend
      })
    })
  },
  getGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    getGoodsData(type,page).then(res => {
      // 获取数据并添加到原始数据中
      const list = res.data.data.list;
      const newData = this.data.goods[type].list;
      newData.push(...list)
      // 设置data中对应的goods数据
      const typeValue = `goods.${type}.list`
      this.setData({
        [typeValue]: newData
      })
    });
    this.data.goods[type].page = page;
  },

// ------------事件监听---------------

  // 监听tabControl点击
  itemClick(event) {
    const index = event.detail.index;
    switch(index) {
      case 0: 
        this.setData({
          currentType: 'pop'
        });
        break;
      case 1:
        this.setData({
          currentType: 'sell'
        });
        break;
      case 2: {
        this.setData({
          currentType: 'new' 
        });
        break;
      }
    }
  },

  // 监听上拉加载更多
  onReachBottom() {
    this.getGoodsData(this.data.currentType);
  },

  // 监听页面滚动
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const isShowBackTop = scrollTop >= TOTOP;
    const flag = scrollTop >= 563;
    if(isShowBackTop !== this.data.isShowBackTop) {
      this.setData({
        isShowBackTop
      })
    }
    if(flag !== this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag
      })
    }

  },

  // 监听推荐图片加载完成
  rImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabOffsetTop = rect.top;
    }).exec()
  }

})