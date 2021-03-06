import { post } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      console.log(signature);

      // 2 获取小程序登录成功后的code
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      //  3 发送请求 获取用户的token
      // const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      // 接口请求失败，走不通，手动设置一个token
      // 准备使用https://www.it120.cc/
      let token = code;
      //   const { token } = await post({
      //     url: "/user/wxapp/login",
      //     data: loginParams,
      //   });
      // 4 把token存入缓存中 同时跳转回上一个页面
      wx.setStorageSync("token", code);
      //   wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1,
      });
    } catch (error) {
      console.log(error);
    }
  },
});
