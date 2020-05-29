// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: "",
    },
    chooseImgs: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    handleClearImg(e) {
      // 获取点击的下标 data-index
      let { index } = e.currentTarget.dataset;
      // 触发父组件的方法
      this.triggerEvent("handleRemoveImg", { index });
    },
    handleSeeImg(e) {
      let { index } = e.currentTarget.dataset;
      wx.previewImage({
        current: this.data.chooseImgs[index], // 当前显示图片的字符串
        urls: this.data.chooseImgs, // 所有图片的数组
        success: () => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
});
