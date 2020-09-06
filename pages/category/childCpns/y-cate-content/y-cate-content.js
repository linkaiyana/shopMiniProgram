// pages/category/childCpns/y-cate-content/y-cate-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subCategories: {
      type: Array,
      value: []
    },
    categoryDetail: {
      type: Object,
      value: {}
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
    tabClick(event) {
      const index = event.detail.index;
      this.triggerEvent('tabClick', {index})
    }
  }
})
