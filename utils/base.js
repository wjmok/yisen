/**
 * Created by jimmy-jiang on 2016/11/21.
 */

import { Config } from 'config.js';
import { Token } from 'token.js';
var token = new Token();
var WxParse = require('../wxParse/wxParse.js');

class Base {
    constructor() {
        "use strict";
        this.baseRestUrl = Config.restUrl;
        this.onPay=Config.onPay;
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params) {
        var that = this;
        var url=this.baseRestUrl + params.url;
        
        
        
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            /*header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },*/
            success: function (res) {

                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.data.solely_code;
                if (res.data.solely_code == '200000') {
                    const callback = (data)=>{
                        that.request(data);
                    };
                    token.getUserInfo(params,callback);
                    
                    
                } else {
                    params.sCallback && params.sCallback(res.data);
                }
            },
            fail: function (err) {
                //wx.hideNavigationBarLoading();
                that._processError(err);
                // params.eCallback && params.eCallback(err);
            }
        });

       
        
    }

    _processError(err){
        console.log(err);
    }

    _refetch(param) {
        var token = new Token();
        /*token.getTokenFromServer((token) => {
            this.request(param, true);
        });*/
    }

    /*获得元素上的绑定的值*/
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    };


    /*wxParse插件返回函数*/
    wxParseReturn(data){
        
        return WxParse.wxParse('article', 'html', data, this);

    };

    cloneForm(form){
        var res =  JSON.parse(JSON.stringify(form));   
        return res;           
    };

    dealRes(res){
        if(res.solely_code == 100000){
            wx.showToast({
                title: res.msg,
                icon: 'succes',
                duration: 1000,
                mask:true
            })

        }else{
            wx.showToast({
                title: res.msg,
                icon: 'fail',
                duration: 1000,
                mask:true
            })

        }
                  
    };

    getAuthSetting(callback){
        wx.getSetting({
            success: setting => {
              if(!setting.authSetting['scope.userInfo']){
                wx.hideLoading();
                this.showToast('授权请点击同意','fail');
              }else{
                wx.getUserInfo({
                    success: function(user) {
                        callback&&callback(user.userInfo,setting);  
                    }
                });
                
              };
            }
        });
    };


    checkComplete(obj){
        
        var pass = true;
        for(var key in obj){
          if(!obj[key]){
            pass = false;
          };
        };
        return pass;
        console.log(pass);
    };

};

export {Base};
