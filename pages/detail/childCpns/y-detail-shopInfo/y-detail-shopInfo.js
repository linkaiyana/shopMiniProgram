// pages/detail/childCpns/y-detail-shopInfo/y-detail-shopInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo: {
      type: Object,
      value: {},
      observer(data) {
        const num = (data.cSells/10000).toFixed(2) + '万';
        this.setData({
          formatData: num
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData: 0
  }
})
