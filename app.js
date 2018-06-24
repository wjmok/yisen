//app.js
import { Token } from 'utils/token.js';
var token = new Token();
App({


	globalData:{    

	    userInfo:{},    
	    thirdapp_id:1, 
	    paginate: {
       	 	count: 0,
        	currentPage:1,
        	pagesize:10,
        	is_page:true,
       
    	}, 

	},


  	onLaunch: function () {
  		
      var token = new Token();
      
      token.verify();


  	},

	onShow:function(){
	  
	},

	
})