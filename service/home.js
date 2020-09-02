import request from "./request"
// 获取轮播图等多条数据
export function getMulData() {
  return request({
    url: '/home/multidata'
  })
}

export function getGoodsData(type,page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}