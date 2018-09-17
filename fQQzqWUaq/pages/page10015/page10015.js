
var app = getApp();
var appAllData = require('./data.js');
var mydata = appAllData.appData();
var router = appAllData.router();
var articleList = appAllData.articles();
var commentid = appAllData.comments();
var title = appAllData.title();
var dymanicList = appAllData.dymanicList();
var countArr = appAllData.countArr();
var goodsArr = appAllData.goodsArr();
var cityArr = appAllData.cityArr();
var forumArr = appAllData.forumArr();
var topicArr = appAllData.topicArr();
var shopArr = appAllData.shopArr();
var groupGoodsArr = appAllData.groupGoodsArr();
var takeoutArr = appAllData.takeoutArr();
var carouselArr = appAllData.carouselArr();
var seckillArr = appAllData.seckillArr();
var goodsClaArr = appAllData.goodsClaArr();
var listDetailArr = appAllData.listDetailArr();
var productArr = appAllData.productArr();
var takeoutShopArr = appAllData.takeoutShopArr();
var newseckillArr = appAllData.newseckillArr();
var distributeArr = appAllData.distributeArr();
var theCityArr = appAllData.theCityArr();
var newgoodsArr = appAllData.newgoodsArr();
var serviceArr = appAllData.serviceArr();
var techArr = appAllData.techArr();
var appointShopArr = appAllData.appointShopArr();
var bargainArr = appAllData.bargainArr();
var subGoodsArr = appAllData.subGoodsArr();
var cityMerArr = appAllData.cityMerArr();
var newsearchArr = appAllData.newsearchArr();
var newdistributeArr = appAllData.newdistributeArr();
var couponlistArr = appAllData.couponlistArr();
var goodsShopArr = appAllData.goodsShopArr();
var houseApartArr = appAllData.houseApartArr();
var videoArr = appAllData.videoArr();
var hotelListArr = appAllData.hotelListArr();
var hotelSoArr = appAllData.hotelSoArr();
var lid = 0;
var pageData = {
  data: mydata,
  page_router: router,
  articleList: articleList,
  commentid: commentid,
  dymanicList: dymanicList,
  countArr: countArr,
  goodsArr: goodsArr,
  cityArr: cityArr,
  forumArr: forumArr,
  topicArr: topicArr,
  shopArr: shopArr,
  groupGoodsArr: groupGoodsArr,
  takeoutArr: takeoutArr,
  carouselArr: carouselArr,
  seckillArr: seckillArr,
  goodsClaArr: goodsClaArr,
  listDetailArr:listDetailArr,
  productArr: productArr,
  takeoutShopArr: takeoutShopArr,
  newseckillArr: newseckillArr,
  distributeArr: distributeArr,
  theCityArr: theCityArr,
  newgoodsArr: newgoodsArr,
  serviceArr: serviceArr,
  techArr: techArr,
  appointShopArr: appointShopArr,
  bargainArr: bargainArr,
  subGoodsArr:subGoodsArr,
  cityMerArr:cityMerArr,
  newsearchArr:newsearchArr,
  newdistributeArr:newdistributeArr,
  couponlistArr:couponlistArr,
  goodsShopArr:goodsShopArr,
  houseApartArr:houseApartArr,
  videoArr: videoArr,
  hotelListArr:hotelListArr,
  hotelSoArr: hotelSoArr,
  prevPage: 0,
  oprenum: 0,
  opagenum: 1,
  ohavenums: 1,
  prenum: 0,
  pagenum: 1,
  havenums: 1,
  timer: 0,
  newtimer:0,
  onLoad: function (e) {
    var scene = decodeURIComponent(e.scene);
    app.setTabelNum(scene);
    app.setListId(e.lid);
    lid = e.lid || 0;
    app.addIplog();
    
    app.checkLogin();
    this.suspensionBottom();
    app.setPageTitle(title);
    app.setDisOpenid(scene);
    app.checkNotice();
    app.getDislevel();
    app.theCityLoad();
  },
  onShow: function () {
    app.setPageUserInfo();
    app.takeoutLoad(0);
    
    app.checkFirst();
  },
  onHide: function () {
    clearInterval(this.timer);
    app.cleartime();
  },
  onUnload: function () {
    app.cleartime();
  },
  dataInitial: function () {
    app.dataInitial();
  },
  onShareAppMessage: function () {
    var pageRouter = this.page_router;
    return {
      title: app.getAppTitle(),
      desc: app.getAppDescription(),
      path: '/pages/' + pageRouter + '/' + pageRouter + '?lid=' + lid,
      success: function (res) {
        app.addShareLog();
      }
    }
  },
  getset:function(e){
    return e.currentTarget.dataset;
  },
  tapInnerLinkHandler: function (e) {
    app.tapInnerLinkHandler(e);
  },
  tapPhoneCallHandler: function (e) {
    app.tapPhoneCallHandler(e);
  },
  tapRefresh: function () {
    var router = this.page_router;
    var url = '/pages/' + router + '/' + router;
    app.turnToPage(url, 1);
  },
  tapBack: function () {
    app.turnBack();
  },
  UserCenterPage: function (e) {
    var name = this.getset(e).name;
    var tidx = -1;
    if (name == '我的订单' || name == '全部订单') {
      tidx = this.getset(e).typeidx;
    }
    app.UserCenterPage(name,tidx);
  },
  inputChange: function (e) {
    let dset = this.getset(e);
    let val = e.detail.value;
    app.inputChange(dset, val);
  },
  bindScoreChange: function (e) {
    let dset = this.getset(e);
    app.bindScoreChange(dset);
  },
  bindSelectChange: function (e) {
    let dset = this.getset(e);
    let val = e.detail.value;
    app.bindSelectChange(dset, val);
  },
  uploadFormImg: function (e) {
    let dset = this.getset(e);
    app.uploadFormImg(dset);
  },
  //同城
  changechecked: function(e){
      var dset = this.getset(e);
      app.changechecked(dset);
  },
  infoDetail: function (e) {
      var dset = this.getset(e);
      app.infoDetail(dset);
  },
  release:function(e){
      var dset = this.getset(e);
      app.release(dset);
  },
  previewImage: function (e) {
      var dset = this.getset(e);
      app.previewImage(dset);
  },
  showMore:function(e){
    var dset = this.getset(e);
    app.cityInit(dset.compid, dset.nid, dset.shownum, dset.ordertype);
  },
  //同城
  bindDateChange: function (e) {
    let dset = this.getset(e);
    let val = e.detail.value;
    app.bindDateChange(dset, val);
  },
  bindTimeChange: function (e) {
    let dset = this.getset(e);
    let val = e.detail.value;
    app.bindTimeChange(dset, val);
  },
  submitForm: function (e) {
    let dset = this.getset(e);
    let formId = e.detail.formId;
    app.submitForm(dset, formId);
  },
  MapEdit: function (e) {
    let dset = this.getset(e);
    app.MapEdit(dset);
  },
  suspensionBottom: function () {
    let url = '/pages/' + router + '/' + router;
    app.suspensionBottom(url);
  },
  loadmore: function (e) {
    var dset = this.getset(e);
    app.commentData(dset.compid, dset.cid);
  },
  commentChange: function (e) {
    app.commentChange(e);
  },
  submitComment: function (e) {
    var dset = this.getset(e);
    app.submitComment(dset);
  },
  showReply: function (e) {
    let dset = this.getset(e);
    app.showReply(dset);
  },
  hideReply: function (e) {
    var dset = this.getset(e);
    app.hideReply(dset);
  },
  commentZan: function (e) {
    var dset = this.getset(e);
    app.commentZan(dset);
  },
  clickReply: function (e) {
    var dset = this.getset(e);
    app.clickReply(dset)
  },
  submitReply: function (e) {
    var dset = this.getset(e);
    app.submitReply(dset);
  },
  replyChange: function (e) {
    app.replyChange(e);
  },
  pageScrollFunc: function (e) {
    app.pageScrollFunc(e);
  },
  searchArticle: function (e) {
    var dset = this.getset(e);
    app.searchArticle(dset.compid);
  },
  enterLbSearhText: function (e) {
    app.enterLbSearhText(e);
  },
  tagLbSearch: function (e) {
    var dset = this.getset(e);
    app.tagLbAppSearch(dset);
  },
  clickLbSearch: function (e) {
    var dset = this.getset(e);
    app.clickLbAppSearch(dset);
  },
  changeCount: function (e) {
    var dset = this.getset(e);
    app.changeAppCount(dset);
  },
  sortListFunc: function (e) {
    var dset = this.getset(e);
    app.sortAppListFunc(dset);
  },
  searchGoods: function (e) {
    var dset = this.getset(e);
    app.searchGoods(dset);
  },
  bindCommodity: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindCommodity(epar);
  },
  bindGoodList: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindGoodList(epar);
  },
  bindArticle: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindArticle(epar);
  },
  selectLocal: function (e) {
    var id = this.getset(e).id;
    app.selectLocal(id);
  },
  cancelCity: function (e) {
    let id = this.getset(e).id;
    app.cancelCity(id);
  },
  submitCity: function (e) {
    var dset = this.getset(e);
    app.submitCity(dset.id, dset.glist)
  },
  bindCityChange: function (e) {
    const val = e.detail.value;
    let id = this.getset(e).id;
    app.bindCityChange(id, val);
  },
  bindExpand: function (e) {
    var epar = JSON.parse(this.getset(e).eventParams);
    var path = epar.path;
    wx.previewImage({
      urls: [path]
    });
  },
  bindCoupon: function (e) {
    var epar = JSON.parse(this.getset(e).eventParams);
    app.bindCoupon(epar);
  },
  pointSign: function (e) {
    let id = this.getset(e).id;
    app.pointSign(id);
  },
  signClose: function (e) {
    let id = this.getset(e).id;
    app.signClose(id);
  },
  closeRule: function (e) {
    this.setData({
      showNcardBg: false,
      showNcard: false
    });
  },
  searchTopic: function (e) {
    var dset = this.getset(e);
    app.searchTopic(dset.compid);
  },
  tapFranchiseeLocation: function (e) {
    app.tapFranchiseeLocation(e);
  },
  loadMoreShop: function (e) {
    var dset = this.getset(e);
    app.loadMoreShop(dset);
  },
  turnToShopeDetail: function (e) {
    var id = this.getset(e).id;
    var url = '/dianshang/shopDetail/shopDetail?id=' + id;
    app.turnToPage(url);
  },
  searchShop: function (e) {
    var dset = this.getset(e);
    app.searchShop(dset.compid);
  },
  bindAppointment: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindAppointment(epar);
  },
  bindTostore: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindTostore(epar);
  },
  bindSonshop: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindSonshop(epar);
  },
  searchGroupgoods: function (e) {
    var dset = this.getset(e);
    app.searchGroupgoods(dset.compid);
  },
  showMenu: function (e) {
    var dset = this.getset(e);
    app.showMenu(dset);
  },
  selectMenu: function (e) {
    app.selectMenu(e);
  },
  inputGoods: function (e) {
    var compid = this.getset(e).compid;
    this.setData({
      [`${compid}.searchname`]: e.detail.value
    })
  },
  searchTakeoutGoods: function (e) {
    var dset = this.getset(e);
    app.loadtakeout(dset.compid)
  },
  closeMulti: function (e) {
    var compid = this.getset(e).compid;
    this.setData({
      [`${compid}.showmulti`]: false,
      [`${compid}.specIndex`]: -1
    })
  },
  showToast: function (text) {
    wx.showToast({
      title: text,
      duration: 1000
    });
  },
  alertToast: function () {
    this.showToast('多规格商品只能去购物车删除哦')
  },
  showCart: function (e) {
    var dset = this.getset(e);
    app.showCart(dset.compid,0)
  },
  choseCart: function (e) {
    var dset = this.getset(e);
    app.choseCart(dset.compid)
  },
  changeTab: function (e) {
    var dset = this.getset(e);
    let num = parseInt(dset.num);
    app.changeTab(dset.compid, num,0);
  },
  changeOrder: function (e) {
    var dset = this.getset(e);
    app.changeOrder(dset.status, dset.compid);
  },
  loadMoreOrder: function (e) {
    var dset = this.getset(e);
    app.loadMoreOrder(dset.compid);
  },
  changeComment: function (e) {
    var dset = this.getset(e);
    app.changeComment(dset.status, dset.compid,0);
  },
  loadMoreEval: function (e) {
    var dset = this.getset(e);
    app.loadMoreEval(dset.compid,0);
  },
  changeNav: function (e) {
    var dset = this.getset(e);
    var compid = dset.compid;
    this.setData({
      [`${compid}.chooseNav`]: dset.num
    });
  },
  clearCart: function (e) {
    var dset = this.getset(e);
    app.clearCart(dset.compid,0);
  },
  changeCart: function (e) {
    var dset = this.getset(e);
    app.changeCart(dset,0);
  },
  changeFoot: function (e) {
    var dset = this.getset(e);
    app.changeFoot(dset,0);
  },
  trueMulti: function (e) {
    var dset = this.getset(e);
    app.trueMulti(dset.compid,0);
  },
  showMulti: function (e) {
    var dset = this.getset(e);
    app.showMulti(dset);
  },
  chooseMulti: function (e) {
    var dset = this.getset(e);
    app.chooseMulti(dset);
  },
  receiveCoupon: function (e) {
    let id = this.getset(e).id;
    let childid = this.getset(e).childid;
    var pageRouter = this.page_router;
    var url = '/pages/receiveCou/receiveCou?id=' + id + '&pagename=' + pageRouter + '&childid=' + childid + '&num=0';
    app.turnToPage(url);
  },
  goOrderinfo: function (e) {
    var order_id = this.getset(e).order;
    var url = '/pages/takeoutorderinfo/takeoutorderinfo?order_id=' + order_id;
    app.turnToPage(url);
  },
  
  goToEvaluate: function (e) {
    var orderid = this.getset(e).orderid;
    var url = '/waimai/takeoutevaluate/takeoutevaluate?orderid=' + orderid;
    app.turnToPage(url);
  },
  goSettlement: function () {
    var url = '/waimai/takeoutbalance/takeoutbalance';
    app.turnToPage(url);
  },
  goToArt: function (e) {
    var id = this.getset(e).id;
    var url = '/wenzhang/articles/articles?id=' + id;
    app.turnToPage(url);
  },
  selSecTime: function (e) {
    var dset = this.getset(e);
    app.selSecTime(dset);
  },
  enterSeckNmae: function (e) {
    var val = e.detail.value;
    var compid = this.getset(e).compid;
    this.setData({
      [`${compid}.seckname`]: val,
    });
  },
  searchSeck: function (e) {
    var dset = this.getset(e);
    app.searchSeck(dset.compid);
  },
  loadmoreOrder: function (e) {
    var dset = this.getset(e);
    app.loadmoreOrder(dset.compid);
  },
  goToSeckDetail: function (e) {
    var dset = this.getset(e);
    app.goToSeckDetail(dset);
  },
  noMulti: function (e) {
    app.noMulti();
  },
  selGoodsCla: function (e) {
    var dset = this.getset(e);
    app.selGoodsCla(dset);
  },
  goToGoodsList:function(e){
    var dset = this.getset(e);
    app.goToGoodsList(dset);
  },
  goToListDetail:function(e){
    var dset = this.getset(e);
    app.goToListDetail(dset);
  },
  bindCommunity: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindCommunity(epar);
  },
  bindtakCoupon: function (e) {
    var epar = JSON.parse(this.getset(e).eventParams);
    app.bindtakCoupon(epar);
  },
  goToProduct:function(e){
    var id = this.getset(e).id;
    var url = '/chanpin/productDetails/productDetails?id=' + id;
    app.turnToPage(url);
  },
  searchProduct:function(e){
    var dset = this.getset(e);
    app.searchProduct(dset.compid);
  },
  personalSetting: function (e) {
    app.personalSetting();
  },
  sel_goods_type:function(e){
    var dset = this.getset(e);
    app.sel_goods_type(dset);
  },
  clicktakzan:function(e){
    var dset = this.getset(e);
    app.clicktakzan(dset);
  },
  goToTakShop:function(e){
    var cid = this.getset(e).childid;
    var url = '/waimai/takshops/takshops?childid=' + cid;
    app.turnToPage(url);
  },
  sel_groupgoods_type: function (e) {
    var dset = this.getset(e);
    app.sel_groupgoods_type(dset);
  },
  newloadmoreOrder: function (e) {
    var num = this.getset(e).num;
    if (num != 2) {
      var compid = this.getset(e).compid;
      app.newloadmoreOrder(compid);
    }
  },
  newsearchSeck: function (e) {
    var dset = this.getset(e);
    app.newsearchSeck(dset.compid);
  },
  newgoToSeckDetail: function (e) {
    var dset = this.getset(e);
    app.newgoToSeckDetail(dset);
  },
  sel_seck_type:function(e){
    var dset = this.getset(e);
    app.sel_seck_type(dset);
  },
  regetAddress:function(){
    app.regetAddress();
  },
  goToDistDetail: function (e) {
    var dset = this.getset(e);
    app.goToDistDetail(dset);
  },
  sel_dist_type:function(e){
    var dset = this.getset(e);
    app.sel_dist_type(dset);
  },
  searchDist: function (e) {
    var dset = this.getset(e);
    app.searchDist(dset.compid);
  },
  bindApp: function (event) {
    app.bindApp(event);
  },
  takeoutShowPre: function(e){
    var dset = this.getset(e);
    app.takeoutShowPre(dset);
  },
  makePhone: function(e){
    var dset = this.getset(e);
    wx.makePhoneCall({
      phoneNumber:dset.tel,
    });
  },
  takshopSearch:function(e){
    var dset = this.getset(e);
    var url = '/waimai/searchTakshop/searchTakshop?searchTxt='+dset.stxt+'&lng='+dset.lng+'&lat='+dset.lat+'&nid='+dset.nid;
    app.turnToPage(url);
  },
  bindDisgood: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindDisgood(epar);
  },
  bindWeb: function (e) {
    app.bindWeb(e);
  },
  bindMap: function (e) {
    app.bindMap(e);
  },
  clickzan:function(e){
    var dset = this.getset(e);
    app.clickzan(dset);
  },
  reflashList:function(e){
    var dset = this.getset(e);
    app.reflashList(dset);
  },
  changeClassify:function (e) {
    var dset = this.getset(e);
    app.changeClassify(dset.compid,dset.index,dset.nid);
  },
  newsel_goods_type:function(e){
    var dset = this.getset(e);
    app.newsel_goods_type(dset);
  },
  goToGoodsDetail:function (e) {
    var dset = this.getset(e);
    app.goToGoodsDetail(dset);
  },
  enterSearhText:function(e){
    var value = e.detail.value;
    var compid = this.getset(e).compid;
    app.enterSearhText(compid,value);
  },
  clickSearch:function (e) {
    var dset = this.getset(e);
    app.clickSearch(dset.compid);
  },
  myCoupon: function (e) {
    var url = '/pages/newCoupon/newCoupon?childid=0&coutype=1';
    app.turnToPage(url);
  },
  myMember: function () {
    var url = '/waimai/vipCard/vipCard?childid=0';
    app.turnToPage(url);
  },
  loadmoreTakOrder: function (e) {
    var dset = this.getset(e);
    app.loadmoreTakOrder(dset.compid);
  },
  showTakType:function(e){
    var dset = this.getset(e);
    app.showTakType(dset.compid, dset.type);
  },
  changeTakOrder:function(e){
    var dset = this.getset(e);
    app.changeTakOrder(dset.compid, dset.status);
  },
  goToTakDetail: function (e) {
    var dset = this.getset(e);
    app.goToTakDetail(dset);
  },
  goToTakRefund:function(e){
    var dset = this.getset(e);
    app.goToTakRefund(dset);
  },
  goToTakVerify:function(e){
    var dset = this.getset(e);
    app.goToTakVerify(dset);
  },
  hiddenTakQR:function(e){
    var dset = this.getset(e);
    app.hiddenTakQR(dset.compid);
  },
  loadmoreSer:function(e){
    var dset = this.getset(e);
    app.loadmoreSer(dset);
  },
  scrollMoreSer:function(e){
    var dset = this.getset(e);
    app.scrollMoreSer(dset);
  },
  searchService:function(e){
    var dset = this.getset(e);
    app.searchService(dset.compid);
  },
  loadmoreTech:function(e){
    var dset = this.getset(e);
    app.loadmoreTech(dset);
  },
  techDetail:function(e){
    var id = this.getset(e).id;
    var url = '/yuyue/techniciandetail/techniciandetail?id='+id;
    app.turnToPage(url);
  },
  searchTech:function(e){
    var dset = this.getset(e);
    app.searchTech(dset.compid);
  },
  bindBespcoupon: function (e) {
    var epar = JSON.parse(this.getset(e).eventParams);
    app.bindBespcoupon(epar); 
  },
  searchApponitShop:function (e) {
    var dset = this.getset(e);
    app.searchApponitShop(dset.compid);
  },
  goToAppoint:function (e) {
    var dset = this.getset(e);
    app.goToAppoint(dset.compid,dset.index);
  },
  loadmoreAppoint:function (e) {
    var dset = this.getset(e);
    app.loadmoreAppoint(dset.compid);
  },
  openAppointMap:function (e) {
    var dset = this.getset(e);
    app.openAppointMap(dset.compid);
  },
  NewUserCenterPage: function (e) {
    var dset = this.getset(e);
    app.NewUserCenterPage(dset);
  },
  bindAllCoupon: function (e) {
    var epar = JSON.parse(this.getset(e).eventParams);
    app.bindAllCoupon(epar);
  },
  bindSeckGoods: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindSeckGoods(epar);
  },
  bindGroupgoods: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindGroupgoods(epar);
  },
  bindBargaingoods: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindBargaingoods(epar);
  },
  searchBargain:function (e) {
    var dset = this.getset(e);
    app.searchBargain(dset.compid);
  },
  loadmoreBargain:function (e) {
    var dset = this.getset(e);
    app.loadmoreBargain(dset);
  },
  goToBargainDetail:function (e) {
    var dset = this.getset(e);
    app.goToBargainDetail(dset);
  },
  scrollMoreGood: function (e) {
    var dset = this.getset(e);
    app.scrollMoreGood(dset);
  },
  loadmoreGoods:function(e){
    var dset = this.getset(e);
    app.loadmoreGoods(dset);
  },
  scrollMoreGroupGood: function (e) {
    var dset = this.getset(e);
    app.scrollMoreGroupGood(dset);
  },
  loadmoreGroupGoods: function (e) {
    var dset = this.getset(e);
    app.loadmoreGroupGoods(dset);
  },
  scrollMoreSeckGood: function (e) {
    var dset = this.getset(e);
    app.scrollMoreSeckGood(dset);
  },
  loadmoreSeckGoods: function (e) {
    var dset = this.getset(e);
    app.loadmoreSeckGoods(dset);
  },
  scrollMoreDisGood: function (e) {
    var dset = this.getset(e);
    app.scrollMoreDisGood(dset);
  },
  loadmoreDisGood: function (e) {
    var dset = this.getset(e);
    app.loadmoreDisGood(dset);
  },
  loadmoreTakShop: function (e) {
    var dset = this.getset(e);
    app.loadmoreTakShop(dset);
  },
  loadmoreArt: function (e) {
    var dset = this.getset(e);
    app.loadmoreArt(dset);
  },
  scrollMoreProduct: function (e) {
    var dset = this.getset(e);
    app.scrollMoreProduct(dset);
  },
  loadmoreProduct: function (e) {
    var dset = this.getset(e);
    app.loadmoreProduct(dset);
  },
  sel_subgoods_type: function (e) {
    var dset = this.getset(e);
    app.sel_subgoods_type(dset);
  },
  loadmoreSubGoods: function (e) {
    var dset = this.getset(e);
    app.loadmoreSubGoods(dset);
  },
  searchSubGoods: function (e) {
    var dset = this.getset(e);
    app.searchSubGoods(dset);
  },
  bindServer: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindServer(epar);
  },
  bindTech: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindTech(epar);
  },
  loadmoreCityShop:function(e){
    var dset = this.getset(e);
    app.loadmoreCityShop(dset);
  },
  goToCityShop:function(e){
    var id = this.getset(e).id;
    var child_id = this.getset(e).childid;
    var url = '/tongcheng/storeDetail/storeDetail?id=' + id + '&child_id=' + child_id;
    app.turnToPage(url);
  },
  searchCityShop:function(e){
    var dset = this.getset(e);
    app.searchCityShop(dset.compid);
  },
  bindSubshop: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindSubshop(epar);
  },
  takeoutMap:function (e) {
    var dset = this.getset(e);
    app.takeoutMap(dset);
  },
  choTakshopClass:function (e) {
    var dset = this.getset(e);
    app.choTakshopClass(dset);
  },
  choAppointshopClass:function (e) {
    var dset = this.getset(e);
    app.choAppointshopClass(dset);
  },
  bindList:function(e){
    var dset = this.getset(e);
    app.bindList(dset);
  },
  loadmoreNewDisGood: function (e) {
    var dset = this.getset(e);
    app.loadmoreNewDisGood(dset);
  },
  sel_newdist_type:function(e){
    var dset = this.getset(e);
    app.sel_newdist_type(dset);
  },
  searchNewDist: function (e) {
    var dset = this.getset(e);
    app.searchNewDist(dset.compid);
  },
  bindNewDisgood: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindNewDisgood(epar);
  },
  clickAuthor:function(){
    this.setData({
      chooseAuthor:true
    })
  },
  getuserinfo:function(e){
    app.getuserinfo(e.detail);
  },
  goToCancelOrder:function (e) {
    var dset = this.getset(e);
    app.goToCancelOrder(dset);
  },
  showPaybox:function (e) {
    var dset = this.getset(e);
    app.showPaybox(dset);
  },
  hidePaybox:function (e) {
    var dset = this.getset(e);
    app.hidePaybox(dset);
  },
  goToPay:function (e) {
    var dset = this.getset(e);
    app.goToPay(dset);
  },
  bindRedpacket: function (e) {
    var epar = this.getset(e).eventParams;
    app.bindRedpacket(epar);
  },
  loadMoreCoupon:function (e) {
    var dset = this.getset(e);
    app.loadMoreCoupon(dset.compid);
  },
  getNewCoupon:function (e) {
    var dset = this.getset(e);
    app.getNewCoupon(dset);
  },
  choCityClass:function (e) {
    var dset = this.getset(e);
    app.choCityClass(dset);
  },
  goToShopHome:function (e) {
    var dset = this.getset(e);
    app.goToShopHome(dset.compid,dset.index);
  },
  searchGoodsShop:function (e) {
    var dset = this.getset(e);
    app.searchGoodsShop(dset.compid);
  },
  loadmoreGshops:function (e) {
    var dset = this.getset(e);
    app.loadmoreGshops(dset.compid);
  },
  choGoodsshopClass:function (e) {
    var dset = this.getset(e);
    app.choGoodsshopClass(dset);
  },
  searchThecity:function (e) {
    var dset = this.getset(e);
    app.searchThecity(dset.compid);
  },
  textCopy:function(e){
    var dset = this.getset(e);
    app.textCopy(dset);
  },
  searchCitylocation:function (e) {
    var dset = this.getset(e);
    app.searchCitylocation(dset.compid);
  },
  chooseHouseNav:function (e) {
    var dset = this.getset(e);
    app.chooseHouseNav(dset);
  },
  bindHoutelPicker:function (e) {
    var dset = this.getset(e);
    var val = e.detail.value;
    app.bindHoutelPicker(dset,val);
  },
  goToRoomDetail:function (e) {
    var dset = this.getset(e);
    app.goToRoomDetail(dset);
  },
  sel_hotel_type:function(e){
    var dset = this.getset(e);
    app.sel_hotel_type(dset);
  },
  openHotelMap:function(e){
    var dset = this.getset(e);
    app.openHotelMap(dset.compid);
  },
  enterHotelName: function (e) {
    var dset = this.getset(e);
    let val = e.detail.value;
    app.enterHotelName(dset.compid, val);
  },
  searchHotel: function (e) {
    var dset = this.getset(e);
    app.searchHotel(dset.compid);
  },
  sel_showCla: function (e) {
    var dset = this.getset(e);
    app.sel_showCla(dset.compid);
  },
  hotelTap: function (e) {
    var dset = this.getset(e);
    app.hotelTap(dset);
  },
  sure_hotel_nid: function (e) {
    var dset = this.getset(e);
    app.sure_hotel_nid(dset);
  },
  loadmoreHotel:function(e){
    var dset = this.getset(e);
    app.loadmoreHotel(dset.compid);
  },
  gotoHotel:function(e){
    var dset = this.getset(e);
    app.gotoHotel(dset);
  },
  gotoHotelSearch:function(e){
    var dset = this.getset(e);
    app.gotoHotelSearch(dset);
  }
};
Page(pageData);
