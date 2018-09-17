//获取应用实例
var app = getApp();
var pagename,couponid,childid,num;
Page({
  data: {
    rec_success:true
  },
  onLoad: function (e) {
    pagename = e.pagename;
    couponid=e.id;
    childid = e.childid;
    num = e.num;
    app.addIplog();
    
    app.checkLogin();
    var that = this;
    app.sendRequest({
      url: '/newapp/getVoucher',
      method: 'post',
      data: {
        openid: app.getSessionKey(),
        couponid: couponid,
        child_id: childid
      },
      success: function (res) {
          var newdata={};
          newdata['endtime'] = res.endtime;
          newdata['full'] = res.full;
          newdata['reduce'] = res.reduce;
          newdata['code'] = res.code;
          newdata['msg'] = res.msg;
          newdata['explain'] = res.explain
          that.setData(newdata)
        that.setData({
          show:true
        })
      }
    })
  },
  onShow:function(){
    app.setPageUserInfo();
  },
  dataInitial: function () {

  },
  onShareAppMessage: function () {
    var pageRouter = this.page_router;
    return {
      title: app.getAppTitle(),
      desc: app.getAppDescription(),
      path: '/pages/' + pagename + '/' + pagename,
      success: function (res) {
        app.sendRequest({
          url: '/webapp/tjIntegral',
          data: {
            openid: app.getSessionKey()
          },
          method: 'POST',
          success: function (res) {
          }
        });
      }
    }
  },
  goToBug:function(){
    var pages = 'pages';
    if (num == 1) {
      pages = 'waimai'
    }
    var url = '/' + pages + '/' + pagename + '/' + pagename+'?childid='+childid;
    app.turnToPage(url,1);
  },
  clickAuthor:function(){
    this.setData({
      chooseAuthor:true
    })
  },
  getuserinfo:function(e){
    app.getuserinfo(e.detail);
  }
})