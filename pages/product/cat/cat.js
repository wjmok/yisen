// pages/product/cat/cat.js
// 
import {Api} from "../../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productData:{},
    product_id:'',
    thirdapp_id: getApp().globalData.thirdapp_id,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCounts:1,
    placeOrder:{

    },
    token:wx.getStorageSync('token'),
    hiddenModal: true,
  
  },

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const self = this;
    self.data.product_id = option.id;
    self.data.placeOrder.products = [];
    self.data.placeOrder.products[0] = {}
    self.data.placeOrder.products[0].model_id =  option.id;
    self.data.placeOrder.products[0].count = self.data.productCounts;
    self.data.placeOrder.token =  wx.getStorageSync("token");
    self.data.placeOrder.address_id =  0;
    self.data.placeOrder.pay_type =  1;
    self.data.placeOrder.pay_method =  1;
    self.data.placeOrder.product_type =  'product';
    self.data.placeOrder.solely_paytype =  true;
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
    postData.id = self.data.product_id;

    
    const callback = (data)=>{
      self.data.productData = data;
      self.data.productData.product.content = api.wxParseReturn(data.product.content);
      self.setData({
        productData:self.data.productData,
      });
      
    };
    api.productOne(postData,callback);


  },
  //选择购买数目
  bindPickerChange: function(e) {
      const self =this;
      
      self.setData({
          productCounts: self.data.countsArray[e.detail.value],
      });
      self.data.placeOrder.products[0].count = self.data.productCounts;
  },
  intoPayPro(){
    const self = this;
    const callback = (data)=>{
      const payCallback=(payData)=>{
        if(payData == 1){
          wx.navigateTo({
            url:'../../order/order'
          })
        }else{
          
        }
      };
      api.realPay(data,payCallback);
    }
    api.orderAdd(self.data.placeOrder,callback);
    /*wx.navigateTo({
      url:"../../pay-result/pay-result"
    })*/
  },

  intoInfo(){
    const self = this;

    wx.navigateTo({
      url:'./order-info/order-info?info='+JSON.stringify(self.data.placeOrder)
    })


  },

  checkPhone(){
    const self = this;
    const postData = {};
    postData.token = self.data.token;
    
    const callback=(data)=>{

      if(data){
        //self.intoInfo();
        self.intoPayPro();

      }else{
        self.setData({
          hiddenModal: false
        })
        
      }

    }
    api.checkPhone(postData,callback);
  },



  toPersonnalInfo(){
      wx.navigateTo({
        url:'../../personal/user-info/user-info'
      })
  },


  listenerCancel(){
    this.setData({
      hiddenModal: true
    })
  },


  inputChange(e){
    const self =this;
    self.data.placeOrder.passage1 = e.detail.value;
  },


})