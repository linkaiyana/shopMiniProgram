// pages/category/childCpns/y-cate-menu/y-cate-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 监听分类点击
    itemTap(event) {
      const currentIndex = event.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })
      this.triggerEvent('itemTap' , {currentIndex})
      
    }
  }
})
