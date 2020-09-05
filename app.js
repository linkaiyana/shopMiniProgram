//app.js
App({
  globalData: {
    products:[]
  },
  addToCart(product) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for (let item of this.globalData.products) {
        if (item.iid == product.iid) {
          oldProduct = item;
        }
      }
      if (oldProduct) {
        oldProduct.count += 1
        resolve('商品数量 + 1')
      } else {
        product.count = 1;
        this.globalData.products.push(product);
        resolve('添加了新的商品')
      }
    })
  },
})