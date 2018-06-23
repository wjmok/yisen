
import {Data} from '../../utils/data.js';
import {Api} from '../../utils/api.js';
import { Token } from '../../utils/token.js';
var api = new Api();
var token = new Token();

Page({
  data: {
    indexMenuBar: Data.indexMenuBar,
    thirdapp_id: getApp().globalData.thirdapp_id,
    theme_id:1,
    mainData:[],
    sliderData:[],
    

  },
  onLoad: function (options) {
    const self = this;
    var scene = decodeURIComponent(options.scene);
    wx.setStorageSync("member_id",scene);
    if(wx.getStorageSync('member_id')){
      token.getUserInfo();
    };
    self.loadData();
    
    
  },
  onShow:function(){
    const that=this; 
  },

  loadData(data){
  	const self = this;
    self.getSliderData();
    self.getMainData();

  	

  },

  getMainData(){
    const self =this;
    const postData = {};
    postData.thirdapp_id = self.data.thirdapp_id;
    postData.is_page = false;
    postData.searchItem = {};
    postData.searchItem.theme_id = self.data.theme_id;
    const callback = (data)=>{
      self.data.mainData = data;
      self.setData({
        mainData:self.data.mainData,
      });

    };

    api.themeList(postData,callback);

  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.id = 2;
    const callback = (data)=>{
      self.data.sliderData = data;
      self.setData({
        sliderData:self.data.sliderData,
      });

    };
    api.themeOriOne(postData,callback);
  },

  buyCard(e){
    const self = this;
    const product_id = api.getDataSet(e,"id");
    wx.navigateTo({
      url:"../product/cat/cat?id="+product_id,
    });
  },

  intoServiceDetail(e){
    const self = this;
    const id = api.getDataSet(e,"id");
    wx.navigateTo({
      url:"../service/cat/cat?id="+id,
    });
  },

})