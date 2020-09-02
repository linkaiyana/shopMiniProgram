// components/y-back-top/y-back-top.js
Component({
  methods: {
    hindleBackTop() {
      wx.pageScrollTo({
        duration: 300,
        scrollTop: 0
      })
    }
  }
})
