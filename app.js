//app.js
App({
  globalData: {
    products:[],
    token: '',
    userInfo: {}
  },
  onLaunch() {
    // 判断是否有token
    const token = wx.getStorageSync('token');
    if(token && token.length !== 0) {  //存在token
      // 验证token是否过期
      this.checkToken(token)

    }else{   //不存在token，进行登录操作
      this.booleanLogin();
    }
  },
  // 判断是否登录
  booleanLogin() {
    wx.showModal({
      title: '用户登录',
      content: '是否允许登录操作',
      success: (res) => {
        if(res.confirm) {
          this.login()
        }
      }
    })
  },
  // 登录
  login() {
    console.log('第一次登录');
    wx.login({
      timeout: 3000,
      success: (res) => {
        console.log(res);
        const code = res.code;
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            const token = res.data.token;
            console.log(token);
            // 保存token
            this.globalData.token = token
            // 进行本地存储
            wx.setStorageSync('token', token)
            // 获取用户信息
            this.getUserInfo();
          }
        })
      }
    })
  },

  // 验证token
  checkToken(token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        if(!res.data.errCode) {
          // token有效，存储token
          this.globalData.token = token
          // 获取用户信息
          this.getUserInfo()
        }else {
          // token已失效，重新进行登录
          this.booleanLogin()
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  // 获取用户信息
  getUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        this.globalData.userInfo = res.userInfo
      },
      fail: () => {
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，是否跳转字授权页面',
          success: function(res) {
            if(res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }
    })
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