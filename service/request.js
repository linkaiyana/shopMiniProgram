const baseURL = 'http://152.136.185.210:8000/api/z8'
export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || null,
      success: resolve,
      fail: reject
    })
  })
}