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
      pagesize:10,
      is_page:true,
    },
    
    isLoadAll:false,
  
  },


  onLoad: function (option) {
    const self = this;
    self.getTeamList();
   
  },

  loadData(){
    const self = this;
    self.getTeamList();
  },

  loadMore(){
    const self = this;
    self.data.paginate.currentPage++;
    self.loadData();
  },


 

  getTeamList(){
    const self =this;
    const postData = api.cloneForm(self.data.paginate);
    postData.name = wx.getStorageSync("memberInfo").name;
    postData.password = api.cloneForm(self.data.sForm).password;
    const callback = (data)=>{
      console.log(data);
      self.data.mainData = data;
      self.setData({
        mainData:self.data.mainData,
      });

    };

    api.getTeamList(postData,callback);

  },





  
})