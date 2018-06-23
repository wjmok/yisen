//app.js
import { Token } from 'utils/token.js';
var token = new Token();
App({


	globalData:{    

	    userInfo:{},    
	    thirdapp_id:1, 
	    

	},

  	onLaunch: function () {
  		
      var token = new Token();
      
      token.verify();


  	},

	onShow:function(){
	  
	},

	
})