/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据  checked=true 
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token 。。。
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment,
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { post } from "../../request/index.js";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组
    cart = cart.filter((v) => v.checked);
    this.setData({ address });

    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
  },
  // 点击 支付
  async handleOrderPay() {
    try {
      // 1 判断缓存中有没有token
      const token = wx.getStorageSync("token");
      // 2 判断
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index",
        });
        return;
      }
      // 3 创建订单
      // 3.1 准备 请求头参数
      // const header = { Authorization: token };
      // 3.2 准备 请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach((v) =>
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price,
        })
      );
      const orderParams = { order_price, consignee_addr, goods };
      // 4 准备发送请求 创建订单 获取订单编号
      const { order_number } = await post({
        url: "/my/orders/create",
        data: orderParams,
      });
      // 5 发起 预支付接口
      const { pay } = await post({
        url: "/my/orders/req_unifiedorder",
        data: { order_number },
      });
      // 6 发起微信支付
      await requestPayment(pay);
      // 7 查询后台 订单状态
      const res = await post({
        url: "/my/orders/chkOrder",
        data: { order_number },
      });
      await showToast({ title: "支付成功" });
      // 8 手动删除缓存中 已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter((v) => !v.checked);
      wx.setStorageSync("cart", newCart);

      // 8 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: "/pages/order/index",
      });
    } catch (error) {
      await showToast({ title: "支付失败" });
      console.log(error);
    }
  },
});
