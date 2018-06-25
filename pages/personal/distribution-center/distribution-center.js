// pages/personal/distribution-center/distribution-center.js
import {Api} from "../../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distriData:{},
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const self = this;
    self.data.distriData = wx.getStorageSync('memberInfo');
    self.setData({
      distriData:self.data.distriData
    });
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

  loginOut(){
    const self = this;
    wx.removeStorageSync('memberInfo');
    if(!wx.getStorageSync('memberInfo')){
      wx.navigateBack();
    }else{
    self.loginOut()
    }
  },

  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

})