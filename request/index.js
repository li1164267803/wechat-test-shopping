export function get(url, params, flag) {
  return request(url, params, flag, "GET");
}

export function post(url, params, flag) {
  return request(url, params, flag, "POST");
}

const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
let ajaxTimes = 0;
export const request = (params) => {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    // 拼接header 带上token
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxTimes++;
  wx.showLoading({
    title: "加载中...",
    mask: true,
  });

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) wx.hideLoading();
      },
    });
  });
};
