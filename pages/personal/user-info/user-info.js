// pages/personal/user-info/user-info.js
import {Api} from "../../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    token: wx.getStorageSync("token"),
    sForm:{},
    token:wx.getStorageSync("token"),
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
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
    const callback = (data)=>{
      self.data.userInfo = data;
      self.setData({
        userInfo:self.data.userInfo,
      });
    };
    api.userOne(postData,callback);
  },

  inputChange(e){
    const self = this;
    const key = api.getDataSet(e,"key");
    const value = e.detail.value;
    self.data.sForm[key] = value;
  },

  edit(){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = self.data.token;
    const callback = (data)=>{
      api.dealRes(data);
    };
    api.userEdit(postData,callback);
  },


  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      wx.showLoading();
      const callback = (user,res) =>{
        self.edit(user);
      };
      api.getAuthSetting(callback);
    }else{
      api.showToast('请补全信息','fail');
    };
  },

  
})