// components/y-tab-control/y-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  data: {
    currentIndex: 0
  },
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event) {
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      });
      this.triggerEvent('itemClick', {index})
    }
  }
})
