var app = getApp();

Page({
  data: {
    navlist:['在线买单','交易记录'],
    navIdx:0,
    showTip:false,
    balance:0,
    selWx:false,
    selCard:true,
    tipText:'',
    tralist:[],
    paymoney:'',
    card:''
  },
  onLoad: function (e) {
    app.addIplog();
    app.checkLogin();
  },
  onShow: function () {
    app.setPageUserInfo();
    this.resetData();
  },
  dataInitial: function () {
  },
  resetData:function(){
    this.setData({
      navIdx: 0,
      paymoney:'',
      selCard:true
    })
    this.loadData();
  },
  loadData:function(){
    var that = this;
    var openid = app.getSessionKey();
    app.sendRequest({
      url:'/neworder/initialization',
      method:'post',
      data:{
        openid: openid
      },
      success:function(res){
        that.setData({
          balance:res.balance,
          card:res.card
        })
      }
    })
  },
  chooseNav:function (e) {
    var index = e.currentTarget.dataset.index;
    if (index != this.data.navIdx) {
      this.setData({
        navIdx:index
      })
      if (index == 1){
        this.loadTraList();
      }
    }
  },
  openTip:function () {
    var tipText = '您的储值卡余额为0，暂时不能使用！';
    app.openTip(tipText);
  },
  selPay:function (e) {
    var type = e.currentTarget.dataset.type;
    if (type == 'card') {
      var selCard = !this.data.selCard;
      this.setData({
        selCard:selCard
      })
    }else if (type == 'wx') {
      var selWx = !this.data.selWx;
      this.setData({
        selWx:selWx
      })
    }
  },
  loadTraList:function(){
    var that = this;
    this.setData({
      nothing:false,
      tralist:[],
    })
    var openid = app.getSessionKey();
    app.sendRequest({
      url: '/neworder/tranRecord',
      method: 'post',
      data: {
        openid: openid
      },
      success: function (res) {
        that.setData({
          tralist:res.list,
          nothing:true
        })
      }
    })
  },
  surePay:function(){
    var that = this;
    var openid = app.getSessionKey();
    var paymoney = this.data.paymoney;
    if (!paymoney){
      app.openTip('请输入金额');
      return;
    }
    if(paymoney<=0){
      app.openTip('金额不能小于0');
      return;
    }
    var selCard = this.data.selCard;
    var selWx = this.data.selWx;
    var payway;
    if (selWx && !selCard){
      payway = 1;
    }else if (!selWx && selCard) {
      payway = 2;
    }else if (selWx && selCard) {
      payway = 3;
    }else {
      app.openTip('请选择支付方式');
      return;
    }
    app.sendRequest({
      url:'/neworder/onlinePay',
      method:'post',
      data:{
        openid: openid,
        payway: payway,
        money: paymoney
      },
      success:function(res){
        if(res.code == 1){
          app.openTip('支付成功');
          that.resetData();
        }else if(res.code == 100){
          wx.requestPayment({
            timeStamp: res.payinfo.timeStamp,
            nonceStr: res.payinfo.nonceStr,
            package: res.payinfo.package,
            signType: res.payinfo.signType,
            paySign: res.payinfo.paySign,
            success: function (data) {
              that.resetData();
            }
          })
        }else {
          app.openTip(res.msg);
        }
      }
    })
  },
  entermoney:function(e){
    var val = e.detail.value;
    this.setData({
      paymoney:val
    })
  },
  gotoRecharge:function(){
    if (!this.data.card) {
      app.openTip('暂未设置');
      return false;
    }
    var url = '/pages/newMemberDetail/newMemberDetail?type=1';
    app.turnToPage(url);
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