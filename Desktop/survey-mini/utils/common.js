function getProjectFiles(id, rwid, yt,cb) {
  var that = this;
  var app = getApp();
  const url = app.globalData.base_url + '/survey/batch/projectFiles';
  var token = wx.getStorageSync('token');
  wx.request({
    url: url,
    data: {
      id: id,
      rwid: rwid
    },
    method: 'GET',
    header: {
      'Content-Type': "application/json",
      'X-Token': token
    },
    success: function (res) {

      return typeof cb == "function" && cb(res.data.data);
      /* var fileurls_all = res.data.data;
      console.log('fileurls_all。。。。。' + JSON.stringify(fileurls_all));
      //住宅
      var imgurl_pmtzz = [];
      var videourl_pmtzz = [];
      var imgurl_nbhjzz = [];
      var videourl_nbhjzz = [];
      var imgurl_zbhjzz = [];
      var videourl_zbhjzz = [];

      //商业

      var imgurl_pmtsy = [];
      var videourl_pmtsy = [];
      var imgurl_nbhjsy = [];
      var videourl_nbhjsy = [];
      var imgurl_zbhjsy = [];
      var videourl_zbhjsy = [];


      //办公

      var imgurl_pmtbg = [];
      var videourl_pmtbg = [];
      var imgurl_nbhjbg = [];
      var videourl_nbhjbg = [];

      //工业

      var imgurl_pmtgy = [];
      var videourl_pmtgy = [];
      var imgurl_nbhjgy = [];
      var videourl_nbhjgy = [];
      var imgurl_zbhjgy = [];
      var videourl_zbhjgy = [];
      
      for (var i = 0; i < fileurls_all.length; i++) {
        //住宅图片，视频
        if (fileurls_all[i].fdcytdm === '0'){
        if (fileurls_all[i].zlfl === '0') {
          if (fileurls_all[i].zllx === '2') {
            imgurl_pmtzz.push(fileurls_all[i].zllj);
          }
          if (fileurls_all[i].zllx === '3') {
            imgurl_nbhjzz.push(fileurls_all[i].zllj);
          }

          if (fileurls_all[i].zllx === '0') {
            imgurl_zbhjzz.push(fileurls_all[i].zllj);
          }
        }
        if (fileurls_all[i].zlfl === '1') {
          if (fileurls_all[i].zllx === '2') {
            videourl_pmtzz.push(fileurls_all[i].zllj);
          }
          if (fileurls_all[i].zllx === '3') {
            videourl_nbhjzz.push(fileurls_all[i].zllj);
          }

          if (fileurls_all[i].zllx === '0') {
            videourl_zbhjzz.push(fileurls_all[i].zllj);
          }
        }
        }
        
        //商业图片，视频
        if (fileurls_all[i].fdcytdm === '1') {
          if (fileurls_all[i].zlfl === '0') {
            if (fileurls_all[i].zllx === '2') {
              imgurl_pmtsy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              imgurl_nbhjsy.push(fileurls_all[i].zllj);
            }

            if (fileurls_all[i].zllx === '0') {
              imgurl_zbhjsy.push(fileurls_all[i].zllj);
            }
          }
          if (fileurls_all[i].zlfl === '1') {
            if (fileurls_all[i].zllx === '2') {
              videourl_pmtsy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              videourl_nbhjsy.push(fileurls_all[i].zllj);
            }

            if (fileurls_all[i].zllx === '0') {
              videourl_zbhjsy.push(fileurls_all[i].zllj);
            }
          }
        }

        //办公图片，视频
        if (fileurls_all[i].fdcytdm === '2') {
          if (fileurls_all[i].zlfl === '0') {
            if (fileurls_all[i].zllx === '2') {
              imgurl_pmtbg.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              imgurl_nbhjbg.push(fileurls_all[i].zllj);
            }
            
          }
          if (fileurls_all[i].zlfl === '1') {
            if (fileurls_all[i].zllx === '2') {
              videourl_pmtbg.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              videourl_nbhjbg.push(fileurls_all[i].zllj);
            }
          }
        }

        //工业图片，视频
        if (fileurls_all[i].fdcytdm === '2') {
          if (fileurls_all[i].zlfl === '0') {
            if (fileurls_all[i].zllx === '2') {
              imgurl_pmtgy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              imgurl_nbhjgy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '0') {
              imgurl_zbhjgy.push(fileurls_all[i].zllj);
            }
          }
          if (fileurls_all[i].zlfl === '1') {
            if (fileurls_all[i].zllx === '2') {
              videourl_pmtgy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '3') {
              videourl_nbhjgy.push(fileurls_all[i].zllj);
            }
            if (fileurls_all[i].zllx === '0') {
              videourl_zbhjgy.push(fileurls_all[i].zllj);
            }
          }
        }





        that.setData({
          imgurl_pmtzz: imgurl_pmtzz,
          imgurl_nbhjzz: imgurl_nbhjzz,
          imgurl_zbhjzz: imgurl_zbhjzz,
          videourl_pmtzz: videourl_pmtzz,
          videourl_nbhjzz: videourl_nbhjzz,
          videourl_zbhjzz: videourl_zbhjzz,

          imgurl_pmtsy: imgurl_pmtsy,
          imgurl_nbhjsy: imgurl_nbhjsy,
          imgurl_zbhjsy: imgurl_zbhjsy,
          videourl_pmtsy: videourl_pmtsy,
          videourl_nbhjsy: videourl_nbhjsy,
          videourl_zbhjsy: videourl_zbhjsy,
          
          imgurl_pmtbg: imgurl_pmtbg,
          imgurl_nbhjbg: imgurl_nbhjbg,
          videourl_pmtbg: videourl_pmtbg,
          videourl_nbhjbg: videourl_nbhjbg,
          
          imgurl_pmtgy: imgurl_pmtgy,
          imgurl_nbhjgy: imgurl_nbhjgy,
          imgurl_zbhjgy: imgurl_zbhjgy,
          videourl_pmtgy: videourl_pmtgy,
          videourl_nbhjgy: videourl_nbhjgy,
          videourl_zbhjgy: videourl_zbhjgy,
          */
        
      
    },
    fail: function () {
      // fail
    },
    complete: function () {
    }
  });

}

var EARTH_RADIUS = 6378.137; //地球半径
function rad(d) {
  return d * Math.PI / 180.0;
}
function getDistance(lng1, lat1, lng2, lat2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
    + Math.cos(radLat1) * Math.cos(radLat2)
    * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;//返回数值单位：公里
}

module.exports = {
  getProjectFiles: getProjectFiles
}

  



  

  
  