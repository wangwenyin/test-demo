Page({
  data: {
    markers: [{
      id: 0,
      latitude:0,
      longitude:0,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    xmmc:'',
    ldmc:''
    /* controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }] */
  },
  regionchange(e) {
    console.log(e.type)
  },
  
  controltap(e) {
    console.log(e.controlId)
  },
  //获取当前位置的经纬度
  loadInfo: function () {
    
  },

  onLoad: function (options) {
    console.log(options.typepage);
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) { 
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        var l = [];
        var obj = {
          id: 0,
          latitude: latitude,
          longitude: longitude,
          width: 50,
          height: 50
          };
        l.push(obj);
        console.log(res);
        console.log(l);
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers: l,
          rwid: options.rwid,
          id: options.id,
          typepage: options.typepage,
          xmmc: options.xmmc,
          ldmc: options.ldmc,
        });
        //that.loadCity(latitude, longitude);
      }
    })  
  },

  markertap(e) {
    var url='';
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var rwid = this.data.rwid;
    var id = this.data.id;
    var xmmc = this.data.xmmc;
    var ldmc = this.data.ldmc;
    var typepage = this.data.typepage;
    if (typepage == 'districtedit_plzz') {
      url = "/pages/districtedit_plzz/districtedit_plzz?rwid=" + rwid + "&id=" + id + "&xmmc=" + xmmc +"&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'districtedit_plsy') {
      url = "/pages/districtedit_plsy/districtedit_plsy?rwid=" + rwid + "&id=" + id + "&xmmc=" + xmmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'districtedit_plbg') {
      url = "/pages/districtedit_plbg/districtedit_plbg?rwid=" + rwid + "&id=" + id + "&xmmc=" + xmmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'districtedit_plgy') {
      url = "/pages/districtedit_plgy/districtedit_plgy?rwid=" + rwid + "&id=" + id + "&xmmc=" + xmmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'district_edit') {
      url = "/pages/district_edit/district_edit?rwid=" + rwid + "&id=" + id + "&xmmc=" + xmmc + "&latitude=" + latitude + '&longitude=' + longitude
    }
    

    
    if (typepage == 'buildingedit_plzz') {
      url = "/pages/buildingedit_plzz/buildingedit_plzz?rwid=" + rwid + "&id=" + id + "&ldmc=" + ldmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'buildingedit_plsy') {
      url = "/pages/buildingedit_plsy/buildingedit_plsy?rwid=" + rwid + "&id=" + id + "&ldmc=" + ldmc + "&latitude=" + latitude + '&longitude=' + longitude
    }


    if (typepage == 'buildingedit_plbg') {
      url = "/pages/buildingedit_plbg/buildingedit_plbg?rwid=" + rwid + "&id=" + id + "&ldmc=" + ldmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'buildingedit_plgy') {
      url = "/pages/buildingedit_plgy/buildingedit_plgy?rwid=" + rwid + "&id=" + id + "&ldmc=" + ldmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    if (typepage == 'buildingedit_gazz') {
      url = "/pages/buildingedit_gazz/buildingedit_gazz?rwid=" + rwid + "&id=" + id + "&ldmc=" + ldmc + "&latitude=" + latitude + '&longitude=' + longitude
    }

    
    
    
    wx.redirectTo({
      url: url
    })
  }, 
})