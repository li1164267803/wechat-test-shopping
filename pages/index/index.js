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
      this.setData({
        floorList: res,
      });
    });
  },
});
