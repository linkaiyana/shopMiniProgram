// pages/detail/childCpns/y-detail-commend/y-detail-commend.js
import { formatTime } from "../../../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopComment: {
      type:Object,
      value: {},
      observer(data,d) {
        if(data.list !== undefined) {
          const ss = data.list[0].created;
          const time = new Date(ss*1000);
          const newTime = formatTime(time);
          this.setData({
            newTime
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    newTime: '',
  }
})
