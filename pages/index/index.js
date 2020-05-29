//Page Object
import { get } from "../../request/index";
Page({
  data: {
    swiperList: [],
    catList: [],
    floorList: [],
  },
  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message,
    //     });
    //   },
    // });
    this.getSwiperList();
    this.getCatList();
    this.getFloorList();
  },
  getSwiperList() {
    get({
      url: "/home/swiperdata",
    }).then((res) => {
      res.forEach((v) => {
        v.navigator_url = v.navigator_url.replace(/\/main\?/g, "/index?");
      });
      this.setData({
        swiperList: res,
      });
    });
  },
  getCatList() {
    get({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({
        catList: res,
      });
    });
  },
  getFloorList() {
    get({
      url: "/home/floordata",
    }).then((res) => {
      res.forEach((v) => {
        v.product_list.forEach((item) => {
          item.navigator_url = item.navigator_url.replace(/\?/g, "/index?");
        });
      });
      this.setData({
        floorList: res,
      });
    });
  },
});
