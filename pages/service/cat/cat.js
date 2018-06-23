// pages/service/cat/cat.js
import {Api} from "../../../utils/api.js";
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:{},
    thirdapp_id: getApp().globalData.thirdapp_id,
    article_id:'',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const self = this;
    self.data.article_id = option.id;
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
    postData.thirdapp_id = self.data.thirdapp_id;
    postData.id = self.data.article_id;
    const callback =(data)=>{
      self.data.mainData = data;
      self.data.mainData.content = api.wxParseReturn(data.article_content.content);
      self.setData({
        mainData:self.data.mainData,
      });
    };
    api.articleOne(postData,callback);


  }
})