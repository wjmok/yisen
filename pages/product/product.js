// pages/product/product.js
import {Api} from '../../utils/api.js'
var api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productData:[],
    transClassArr:['tanslate0','tanslate1','tanslate2','tanslate3','tanslate4','tanslate5'],
    categoryData:[
      
      
    ],
    categoryArray:[25,26,27],
    thirdapp_id: getApp().globalData.thirdapp_id,
    paginate: {
      count: 0,
      currentPage: 1,
      pagesize:5,
      is_page:true,

    },
    searchItem:{

    },
    opacity:0,
    sliderData:{},
    isLoadAll:false,
    token:wx.getStorageSync('token'),
  

    
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    /*this.setData({
        categoryArr: this.data.categoryData, 
        currentCategoryId: this.data.categoryData[0]['id'],
    });*/
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

  onReachBottom: function () {

    
  
  },




  loadData(){
    const self = this;
    self.getSliderData();
    self.getCategoryData();
    

  },

  changeCategory(event){
    const self = this;
    self.data.paginate.currentPage = 1;
    self.data.isLoadAll = false;
    self.data.productData = [];
    self.setData({
      productArray : self.data.productData,
      cssName:"origin-a"
    });
    const category_id = api.getDataSet(event,'id');
    self.setData({
        currentCategoryId: category_id,
        cssName:"origin"
    });
    self.data.searchItem.category_id = category_id;
    self.getProductData();

  },

  getCategoryData(){
    const self = this;
    const postData = {};
    postData.token = self.data.token;
    const callback=(data)=>{
      self.data.categoryData = data;
      self.setData({
        categoryArr:self.data.categoryData,
        currentCategoryId: this.data.categoryData[0]['id'],
      });
      self.getProductData();
    };
    api.categoryTree(postData,callback);

  },

  intoGoodsDetail(event){
    const self = this;
    const product_id = api.getDataSet(event,'id');
    wx.navigateTo({
      url: './cat/cat?id='+product_id,
    })

  },

  getProductData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = self.data.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    if(!postData.searchItem.category_id){
      postData.searchItem.category_id = self.data.categoryData[0]['id'];
    };
    const callback = (data)=>{
      if(data.data.length>0){
        self.data.productData.push.apply(self.data.productData,data.data);
        self.setData({
          productArray : self.data.productData,
          cssName:"origin-a"
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
    api.productList(postData,callback);

  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.id = 3;
    const callback = (data)=>{
      self.data.sliderData = data;
      self.setData({
        sliderData:self.data.sliderData,
      });

    };
    api.themeOriOne(postData,callback);
  },

  loadMore(){
    const self = this;
    self.data.paginate.currentPage++;
    self.getProductData();
  },

  
  lower: function(e) {
    const self =this;
    if(!self.data.isLoadAll){
      self.loadMore();
    }
  },
})