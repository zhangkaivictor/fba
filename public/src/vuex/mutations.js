// 根级别的 mutations

// index.vue的头部和底部隐藏
export const hidden_head_foot = state => {
    state.head_foot_show = false;
};

// index.vue的头部和底部显示
export const show_head_foot = state => {
    state.head_foot_show = true;
};

// 账户登陆成功后 navData数据的 改变
export const login_success = (state, i) => {
    state.navData[3] = {path: "/personCenter", flag: false, name: "个人中心"};
    state.navData[4] = {path: "", flag: false, name: "退出"};
    state.navData.forEach(function (item, index) {
        item.flag = index == i;
    });
    state.head_foot_show = true;
};

// 刷新页面时 index.vue的导航文本的 下侧条的锁定显示
export const fresh_page = (state, {index, username}) => {
    console.log(`username : ${username}`);
    if (username) {
        state.navData[3] = {path: "/personCenter", flag: false, name: "个人中心"};
        state.navData[4] = {path: "", flag: false, name: "退出"};
    } else {
        state.navData[3] = {path: "/login", flag: false, name: "登录"};
        state.navData.splice(4, 1);
    }
    state.navData.forEach(function (item, i) {
        item.flag = i == index;
    });
};

// 刷新页面时 personCenter.vue 的导航文本的 左侧栏的导航的锁定显示
export const fresh_per_page = (state, {index}) => {
    state.pathData.forEach(function (item, i) {
        item.flag = i == index;
    });
};

// 更新下单时的相关参数
export const update_place_info = (state, param) => {
    state.placeOrderInfo = param;
};

// 更新跳转类型
export const update_jump_type = (state, type) => {
    state.jumpType = type;
};

// 公众号显示 与否
export const operate_customer = (state, bool) => {
    state.customerServiceShow = bool;
};

// 全屏
export const full_screen = (state, bool) => {
    document.documentElement.className = bool ? "isPreviewing" : "";
};


