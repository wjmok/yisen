import {Api} from "../../../../utils/api.js";
var api  = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    paginate: {

      currentPage: 1,
      pagesize:10,
      is_page:true,
    },
    
    isLoadAll:false,

    searchItem:{
      pay_status:1,
    },
  
  },

  onLoad: function (option) {
    const self = this;
    if(wx.getStorageSync("memberInfo").name&&wx.getStorageSync("memberInfo").password){
      self.getTeamOrder();
    }else{
      api.loginOut()
    };
    
   
  },


  loadMore(){
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getTeamOrder();
    }
  },

  getTeamOrder(isNew){
    const self =this;
    if(isNew){
      self.data.mainData = [];
      self.data.paginate.currentPage = 1;
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.name = wx.getStorageSync("memberInfo").name;
    postData.password = wx.getStorageSync("memberInfo").password;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{
      console.log(res);
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
        web_mainData_total:res.total,
      }); 
    };
    api.getTeamOrder(postData,callback);

  },

  
})