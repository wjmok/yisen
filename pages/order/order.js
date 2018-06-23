// pages/order/order.js
import {Api} from "../../utils/api.js";
var api  = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    token:wx.getStorageSync("token"),
    paginate: {
      count: 0,
      currentPage: 1,
      pagesize:5,
      is_page:true,
    },
    searchItem:{
      pay_status:1,
    },
    isLoadAll:false,
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadData(){
    const self = this;
    self.getOrderList();
  },

  getOrderList(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.token = self.data.token;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (data)=>{


      if(data.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,data.data);
        self.setData({
          mainData:self.data.mainData,
        });

      }else{
        self.data.isLoadAll = true;
        wx.showToast({
          title: '没有更多了',
          icon: 'fail',
          duration: 1000,
          mask:true
        });
      }; 
    };
    api.orderList(postData,callback);

  },

  payNow(e){
    const self = this;
    const postData  ={};
    postData.token = self.data.token;
    postData.id = api.getDataSet(e,'id');
    const callback = (data)=>{
      const payCallback=(payData)=>{
        if(payData == 1){

          self.autoChangeStatus(1);
          
        }else{
          
        }
      };
      api.realPay(data,payCallback);
    };
    api.payPre(postData,callback);
  },

  changeStatus(e){
    const self = this;

    self.data.paginate.currentPage = 1;
    self.data.isLoadAll = false;
    self.data.mainData = [];
    self.setData({
      mainData:self.data.mainData,
    });

    self.data.searchItem.pay_status = api.getDataSet(e,'status');
    self.setData({
      searchItem:self.data.searchItem,
    });
    self.getOrderList();

  },

  autoChangeStatus(id){
    const self = this;
    self.data.paginate.currentPage = 1;
    self.data.isLoadAll = false;
    self.data.mainData = [];
    self.setData({
      mainData:self.data.mainData,
    });
    self.data.searchItem.pay_status = id;
    self.setData({
      searchItem:self.data.searchItem,
    });
    self.getOrderList();
  },


  checkDetail(e){
    const self = this;
    var id = api.getDataSet(e,'id');
    wx.navigateTo({
      url: "./cat/cat?id=" + id
    })
  },


  loadMore(){
    const self = this;
    self.data.paginate.currentPage++;
    self.loadData();
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const self = this;
    if(!self.data.isLoadAll){
      self.loadMore();
    };
  },



  
})