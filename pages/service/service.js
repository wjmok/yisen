// pages/service/service.js
// 
import {Api} from "../../utils/api.js";
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    thirdapp_id: getApp().globalData.thirdapp_id,
    menu_id:1,
    paginate: {
      count: 0,
      currentPage: 1,
      pagesize:10,
      is_page:true,
    },
    searchItem:{
    },
    sliderData:{},
    isLoadAll:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadData();
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
    self.getSliderData();
    self.getArticleData();
    
  },

  intoDetail(event){
    const self = this;
    const id = api.getDataSet(event,'id');
    wx.navigateTo({
      url:"./cat/cat?id="+id,
    });
  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.id = 4;
    const callback = (data)=>{
      self.data.sliderData = data;
      self.setData({
        sliderData:self.data.sliderData,
      });
    };
    api.themeOriOne(postData,callback);
  },

  getArticleData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItem.thirdapp_id = self.data.thirdapp_id;
    postData.searchItem.menu_id = self.data.menu_id;
    const callback = (data)=>{
      if(data.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,data.data);
        self.setData({
          articleArr:self.data.mainData,
        });
      }else{
        self.data.isLoadAll = true;
        wx.showToast({
          title:'没有更多了',
          icon:'fail',
          duration:1000,
          mask:true
        });
      };
    };
    api.articleList(postData,callback);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom: function () {
    const self =this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getArticleData();
    };
  },
})