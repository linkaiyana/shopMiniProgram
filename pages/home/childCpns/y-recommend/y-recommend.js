// pages/home/childCpns/y-recommend/y-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isEmit: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgLoad() {
      if(!this.data.isEmit){
        this.triggerEvent('imageLoad')
        this.data.isEmit = true;
      }      
    }
  }
})
