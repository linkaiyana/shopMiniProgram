// pages/shopcar/childCpns/y-shopItems/y-shop-items.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pro: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    revCheck() {
      const goods = this.properties.pro;
      const index = this.properties.index;
      goods.ischeck = !goods.ischeck;
      App.changeState(index,goods);
    }
  }
})