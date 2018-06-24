import {Api} from "../../../../utils/api.js";
var api  = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    sForm:{
      name:'',
      password:'111',
    },
    
    paginate: {

      currentPage: 1,
      pagesize:2,
      is_page:true,
    },
    
    isLoadAll:false,

    searchItem:{
      pay_status:1,
    },
  
  },

  onLoad: function (option) {
    const self = this;
    self.getTeamOrder();
    
  },

  loadData(){
    const self = this;
    self.getTeamOrder();
  },

  loadMore(){
    const self = this;
    self.data.paginate.currentPage++;
    self.loadData();
  },

  getTeamOrder(){
    const self =this;
    const postData = api.cloneForm(self.data.paginate);
    postData.name = wx.getStorageSync("memberInfo").name;
    postData.password = api.cloneForm(self.data.sForm).password;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (data)=>{
      console.log(data);
      self.data.mainData = data;
      self.setData({
        mainData:self.data.mainData,
      });

    };
    api.getTeamOrder(postData,callback);

  },

  
})