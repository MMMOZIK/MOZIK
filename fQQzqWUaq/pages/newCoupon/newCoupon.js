var app = getApp();
var childid,coutype;
Page({
  prenum: 0,
  pagenum: 1,
  havenums: 1,
  data: {
    status:0,
    couponArr: [
    ],
  },
  onLoad: function (e) {
    childid = e.childid||0;
    coutype = e.coutype||null;
    app.addIplog();
    this.loadData();
  },
  selbespCoupon:function(e){
    var num = e.target.dataset.num;
    this.setData({
      status: num,
      couponArr: [],
      nothing: false
    })
    this.resetNum();
    this.loadData();
  },
  loadData:function(){
    var that = this;
    var openid = app.getSessionKey();
    var pagenum = this.pagenum;
    var status = this.data.status;
    app.sendRequest({
      url: '/newapp/myCoupons',
      method: 'post',
      data: {
        openid: openid,
        status: status,
        pageNum: pagenum,
        coutype:coutype,
        child_id:childid
      },
      success: function (res) {
        var newdata = {};
        if (res.code == 1) {
          that.havenums = res.haveNums;
          that.pagenum = that.pagenum + 1;
          var oldList = that.data.couponArr;
          var couponArr = oldList.concat(res.coupons);
          for (var i = 0; i < couponArr.length; i++) {
            couponArr[i].showstore = false;
          }
          newdata['couponArr'] = couponArr;
          newdata['nothing'] = true;
          that.setData(newdata);
        }else if (res.code == 1000 || res.code == 2000) {
          that.setData({
            vqdlevel:res.code
          });
          wx.setNavigationBarTitle({
              title: '待升级提示'
          });
        } else {
          that.setData({
            nothing: true
          });
        }
      }
    })
  },
  loadmoreCoupon: function () {
    var prenum = this.prenum;
    var pagenum = this.pagenum;
    var havenums = this.havenums;
    if (prenum != pagenum && havenums != 0) {
      this.prenum = pagenum;
      this.loadData();
    }
  },
  resetNum: function () {
    this.prenum = 0;
    this.pagenum = 1;
    this.havenums = 1;
  },
  showAllStore:function (e) {
    var couponArr = this.data.couponArr;
    var index = e.currentTarget.dataset.index;
    var showstore = !couponArr[index].showstore;
    couponArr[index].showstore = showstore;
    this.setData({
      couponArr:couponArr
    })
  },
  goToCouponDetail:function (e) {
    var cid = e.currentTarget.dataset.cid;
    var url = '/pages/couponDetail/couponDetail?cid=' + cid;
    app.turnToPage(url);
  }
})