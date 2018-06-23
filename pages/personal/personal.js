// pages/personal/personal.js
import {Api} from "../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUserInfo:wx.getStorageSync('userInfo'),
    userInfo:{},
    sliderData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    self.getSliderData();
    self.setData({
      wxUserInfo:self.data.wxUserInfo,
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


  loadData(){
    const self = this;

  },

  userInfoEdit(){
    const self = this;
    wx.navigateTo({
      url:"./user-info/user-info"
    });
  },

  orderHandle(){
    const self = this;
    wx.navigateTo({
      url:"../order/order"
    });
  },

  distriCenter(){
    const self =this;
    const memberInfo = wx.getStorageSync("memberInfo");
    if(memberInfo){
      wx.navigateTo({
        url:"./distribution-center/distribution-center"
      });
    }else{
      wx.navigateTo({
        url:"./distribution-login/distribution-login"
      });
    }
  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.id = 5;
    const callback = (data)=>{
      self.data.sliderData = data;
      self.setData({
        sliderData:self.data.sliderData,
      });
    };
    api.themeOriOne(postData,callback);
  },
})