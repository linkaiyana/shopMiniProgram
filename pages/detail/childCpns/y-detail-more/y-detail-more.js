// pages/detail/childCpns/y-detail-more/y-detail-more.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad() {
      this.triggerEvent('imageLoad')
    }
  }
})
