// pages/service/cat/cat.js
import {Api} from "../../../utils/api.js";
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:{},
    token: wx.getStorageSync("token"),
    order_id:'',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const self = this;
    console.log(option.id);
    self.data.order_id = option.id;
    self.loadData();
    
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadData(){
    const self = this;
    const postData = {};
    postData.token = self.data.token;
    postData.id = self.data.order_id;
    const callback =(data)=>{
      console.log(data);
      self.data.mainData = data.item[0]['snap_product'];
      self.data.mainData.passage1 = data.passage1;
      console.log(self.data.mainData);
      self.data.mainData.content = api.wxParseReturn(self.data.mainData.product.content);
      self.setData({
        productData:self.data.mainData,
      });
      
    };
    api.orderOne(postData,callback);


  }
})