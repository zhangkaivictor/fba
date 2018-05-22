import Vue from "vue"
import Router from "vue-router"

import queryPrice from "@/pages/queryPrice.vue"                           // 询价查询
import placeOrder from "@/pages/placeOrder.vue"                           // 下单步骤
import orderDetails from "@/pages/orderDetails/orderDetails.vue"          // 订单详情
import problem from "@/pages/problem.vue"                                 // 常见问题
import commonProblems from "@/pages/problems/commonProblems.vue"          // 常见问题 -- 常见问题
import commonProblemchild from "@/pages/problems/commonProblemchild.vue"  // 常见问题 -- 注册使用问题
import about from "@/pages/about.vue"                                     // 关于我们

import login from "@/pages/login/login.vue"                               // 登陆
import loginModule from "@/pages/login/login_module.vue"                  // 登陆模块
import registerModule from "@/pages/login/register_module.vue"            // 注册模块
import findPassword from "@/pages/login/find_password.vue"                // 找回密码

import personCenter from "@/pages/personCenter/personCenter.vue"          // 个人中心

// 引入组件的第一种方式 直接引入
// import myOrder from "@/pages/personCenter/myOrder.vue"                  // 个人中心 -- 我的订单
// import systemInfo from "@/pages/personCenter/systemInfo.vue"            // 个人中心 -- 系统消息
// import senderPerson from "@/pages/personCenter/senderPerson.vue"        // 个人中心 -- 发件人
// import receiverPerson from "@/pages/personCenter/receiverPerson.vue"    // 个人中心 -- 收件人
// import accountInfo from "@/pages/personCenter/accountInfo.vue"          // 个人中心 -- 账户信息
// import modifyPassword from "@/pages/personCenter/modifyPassword.vue"    // 个人中心 -- 修改密码

// 引入组件的第二种方式 异步组件 懒加载 按需加载
const myOrder = () => import(/* webpackChunkName:"personCenter" */ "@/pages/personCenter/myOrder.vue");
const systemInfo = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/systemInfo.vue");
const senderPerson = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/senderPerson.vue");
const receiverPerson = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/receiverPerson.vue");
const accountInfo = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/accountInfo.vue");
const modifyPassword = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/modifyPassword.vue");
const myAccount = () => import(/* webpackChunkName:"personCenter" */"@/pages/personCenter/myAccount.vue");

Vue.use(Router);

// 设置路由的滚动行为
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        if (to.hash) position.selector = to.hash;
        if (to.matched.some(m => m.meta.scrollToTop)) {
            position.x = 0;
            position.y = 0;
        }
        return position;
    }
};

export default new Router({
    mode: "history",
    base: __dirname,
    scrollBehavior,     // 滚动行为
    routes: [
        {path: "/", name: "index", component: queryPrice, meta: {scrollToTop: true}},                // 默认首页
        {path: "/queryPrice", name: "queryPrice", component: queryPrice, meta: {scrollToTop: true}}, // 查价寄件页面
        {path: "/placeOrder", name: "placeOrder", component: placeOrder,meta: {scrollToTop: true}},   // 下单步骤页面
        {
            path: "/orderDetails",name:"orderDetails",component:orderDetails,meta:{scrollToTop: true},// 订单详情页面
            props: route => ({
                fba_waybill_id: route.query.fba_waybill_id,
                order_type:route.query.order_type
            })
        },
        {
            path: "/problem", component: problem, meta: {scrollToTop: true},
            children:[
            	{path:"/",name:"commonProblemchild",component:commonProblemchild},
                {path:"/commonProblems",name:"commonProblems",component:commonProblems}
            ]
        },// 常见问题页面
        {path: "/about", name: "about", component: about, meta: {scrollToTop: true}},      // 关于我们页面
        {
            path: "/login",component: login,meta: {scrollToTop: true},    // 登录页面
            children:[
                {path:"/",name:"loginModule",component:loginModule},
                {path:"registerModule",name:"registerModule",component:registerModule},
                {path:"findPassword",name:"findPassword",component:findPassword}
            ]
        },
        {
            path: "/personCenter", component: personCenter, meta: {scrollToTop: true},     // 个人中心
            children: [
                {path:"/",name:"myOrder",component:myOrder},                                // 我的订单
                {path:"systemInfo",name:"systemInfo",component:systemInfo},                 // 系统信息
                {path:"senderPerson",name:"senderPerson",component:senderPerson},           // 发件人
                {path:"receiverPerson",name:"receiverPerson",component:receiverPerson},     // 收件人
                {path:"accountInfo",name:"accountInfo",component:accountInfo},              // 账户信息
                {path:"modifyPassword",name:"modifyPassword",component:modifyPassword},     // 修改密码
                {path:"myAccount",name:"myAccount",component:myAccount}                     // 我的账户
            ]
        },
        {path: "*", redirect: "/" }   // 地址输入错误时 默认跳转到 首页
    ]
})
