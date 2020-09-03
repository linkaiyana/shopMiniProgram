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

// 商店基本信息
export class ShopInfo {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
    
  }
}

// 商品详细信息
export class ShopParams {
  constructor(info, rule) {
    this.info = info,
    this.rule = rule
  }
}

// 推荐信息
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}