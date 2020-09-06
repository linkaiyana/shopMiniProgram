import request from "./request"

// 获取分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}
// 获取分类子数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}
// 获取分类详情数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}