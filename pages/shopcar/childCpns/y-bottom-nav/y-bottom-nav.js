// pages/shopcar/childCpns/y-bottom-nav/y-bottom-nav.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCheckAll: {
      type: Boolean,
      value: true
    },
    count: {
      type:Number,
    },
    totalPrice: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    revAllCheck() {
      this.triggerEvent('revAllCheck')
    },
    toCalc() {
      this.triggerEvent('toCalc')
    }
  }
})
