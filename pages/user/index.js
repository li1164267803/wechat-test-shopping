// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
  },
  onLoad() {
    console.log("个人中心得onLoad");
  },
  onShow() {
    console.log("个人中心得onShow");
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({ userinfo, collectNums: collect.length });
  },
});
