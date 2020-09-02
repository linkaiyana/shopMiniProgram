import request from "./request"

// 获取商品信息
export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}

// 商品基本信息
export class BaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.lowPrice = itemInfo.lowNowPrice;
    this.desc = itemInfo.discountDesc;
    this.columns = columns,
    this.services = services
  }
}