var app = getApp();
Page({
  data: {
    discountInfo:[]
  },
  onLoad: function (e) {
    app.addIplog();
    this.loadData();
  },
  gotoMember:function(e){
    var type = e.currentTarget.dataset.type;
    var discardid = this.data.discountInfo.id||0;
    if(type == 0){
      var url = '/pages/newMemberDetail/newMemberDetail?type=' + type + '&discardid=' + discardid;
      app.turnToPage(url);
    }else{
      if (!this.data.is_stored){
        return;
      }
      var that = this;
      app.sendRequest({
        url: '/newapp/issetStoreCard',
        method: 'post',
        data: {
          
        },
        success: function (res) {
          if (res.code == 1) {
            var url = '/pages/newMemberDetail/newMemberDetail?type=' + type + '&discardid=' + discardid;
            app.turnToPage(url);
          }else {
            app.toast({
              title:'商家还没设置储值卡！'
            })
          }
        }
      })
    }
    
  }, 
  loadData:function(){
    var that = this;
    var openid = app.getSessionKey();
    var pagenum = this.pagenum;
    app.sendRequest({
      url: '/newapp/card_info',
      method: 'post',
      data: {
        openid: openid
      },
      success: function (res) {
        that.setData({
          is_stored: res.is_stored,
          is_discount:res.is_discount,
          discountInfo:res.discountInfo||{},
          mycardinfo: res.mycardinfo||{},
          cardlog: res.cardlog
        })
      }
    })
  },
  consumeDetail: function () {
    var url = '/pages/consumeDetail/consumeDetail';
    app.turnToPage(url);
  },

})