// pages/personal/distribution/distribution-login.js
import {Api} from "../../../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sForm:{
      name:'',
      password:''
    },
    placeOrder:{

    },

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const self =this;
    self.data.placeOrder = JSON.parse(option.info);
    console.log(self.data.placeOrder);
  
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

  inputChange(e){
    const self = this;
    const key = api.getDataSet(e,"key");
    const value = e.detail.value;
    self.data.sForm[key] = value;
    console.log(self.data.sForm);

  },

  intoDistriInfo(){
    const self =this;
    wx.navigateTo({
      url:"../distribution-center/distribution-center"
    });
  },

  memberLogin(){

    const self = this;
    console.log(self.data.sForm);
    if(self.data.sForm.name!=''&&self.data.sForm.password!=''){
      const callback = (data)=>{
        console.log(data);
        if(data.solely_code){
          wx.showToast({
            title: data.msg,
            icon: 'fail',
            duration: 1000,
            mask:true
          });

        }else{
          wx.setStorageSync('memberInfo', data);
          self.intoDistriInfo();

        }
      };
      api.memberLogin(self.data.sForm,callback);
      
    }else{
      
      wx.showToast({
          title: '信息填写不完整',
          icon: 'fail',
          duration: 1000,
          mask:true
      });
    }
    
  }
})