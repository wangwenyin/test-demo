function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/task_pl/task_pl",
      "text": "批量调查",
      "iconPath": "/pages/images/ico-pl.png",
      "selectedIconPath": "/pages/images/ico-pl-d.png"
    },
    {
      "pagePath": "/pages/task_gean/task_gean",
      "text": "个案调查",
      "iconPath": "/pages/images/ico-task.png",
      "selectedIconPath": "/pages/images/ico-task-d.png"
    },
    {
      "pagePath": "/pages/district_zy/district_zy",
      "text": "专有调查",
      "iconPath": "/pages/images/ico-diaocao.png",
      "selectedIconPath": "/pages/images/ico-diaocao-d.png"
    },
     {
      "pagePath": "/pages/audit/audit",
      "text": "我的审核",
      "iconPath": "/pages/images/ico-audit.png",
      "selectedIconPath": "/pages/images/ico-audit-d.png"
    },
    {
      "pagePath": "/pages/my/my",
      "text": "我的",
      "iconPath": "/pages/images/ico-my.png",
      "selectedIconPath": "/pages/images/ico-my-d.png"
    }
  ]
}




//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  //console.log(1111);
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
  console.log(bindData);
}

module.exports = {
  tabbar: tabbarmain
}