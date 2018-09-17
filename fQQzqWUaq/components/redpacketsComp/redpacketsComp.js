var app = getApp();

Component({
  properties: {
    showRed: {
      type: Boolean
    },
    redid: {
      type: Number
    },
    redcode: {
      type: Number
    }
  },
  data: {
    
  },
  ready: function () {

  },
  methods: {
    clickDismantl:function (e) {
      var redcode = this.data.redcode;
      if (redcode == 1) {
        this.closeRed();
        var redid = this.data.redid;
        var url = '/pages/redDispatch/redDispatch?redid=' + redid;
        app.turnToPage(url);
      }else if (redcode == 0) {
        app.toast({
          title:'暂无红包分享活动'
        });
      }else {
        app.toast({
          title:'领取达到限制限制条件'
        });
      }
    },
    closeRed:function (e) {
      this.setData({
        showRed:false
      })
    }
  }
})