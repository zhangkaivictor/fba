/**
 *  组装模块并导出 store 的地方
 */

import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

var state = {
    navData: [{ path: "/queryPrice", flag: true, name: "查价寄件" }, { path: "/problem", flag: false, name: "常见问题" }, { path: "/about", flag: false, name: "关于我们" },
    // {path:"/personCenter",flag:false,name:"个人中心"},
    { path: "/login", flag: false, name: "登录" }],
    head_foot_show: true,
    pathData: [{ navTitle: "我的订单", pathName: "myOrder", flag: true }, { navTitle: "系统消息", pathName: "systemInfo", flag: false }, { navTitle: "发件人", pathName: "senderPerson", flag: false },
    // {navTitle:"收件人",pathName:"receiverPerson",flag:false},
    { navTitle: "账户信息", pathName: "accountInfo", flag: false }, { navTitle: "修改密码", pathName: "modifyPassword", flag: false }, { navTitle: "我的账户", pathName: "myAccount", flag: false }],
    bankCodeData: [{ bankCode: "0001", serialNumber: "01" }, { bankCode: "0002", serialNumber: "02" }, { bankCode: "0003", serialNumber: "03" }],
    placeOrderInfo: {
        pi_id: "",
        channel_id: "",
        channel_name: "",
        channel_type: "",
        address: "",
        country: "",
        start_province: "",
        start_citys: "",
        start_district: "",
        destination_country: "",
        goods_class: "0",
        goods_list: [{ length: "", width: "", height: "", weight: "", numbers: "" }]
    },
    jumpType: 0,
    customerServiceShow: true // 公众号显示与否
};

var store = new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
});

// 热重载 热更新
if (module.hot) {
    module.hot.accept(["./getters", "./actions", "./mutations"], function () {
        store.hotUpdate({
            getters: require("./getters"),
            actions: require("./actions"),
            mutations: require("./mutations")
        });
    });
}

export default store;

//# sourceMappingURL=index-compiled.js.map