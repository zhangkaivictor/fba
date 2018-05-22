<style scoped>
    .operate span{border-bottom:2px solid #fff;padding:7px 20px;transition:all 0.3s;}
    .operate span.active{border-bottom:2px solid #99ce58;}
    .lr_input{
        -webkit-appearance:none;background-color:#fff;-webkit-box-sizing:border-box;
        box-sizing:border-box;color:#303030;display:inline-block;font-size:inherit;line-height: 1;
        outline:none;padding:0 15px 0 35px;border:0;width:100%;height:48px;text-indent:10px;
    }
    .p_head{top:16px;left:14px;}
    .ver_code{height:30px;width:60px;top:9px;right:45px;}
    .ver_code img{height:30px;width:60px;}
    .fresh_icon{top:14px;right:15px;}
    .ope{border:1px solid #aaa;border-bottom:none;width:350px;box-sizing:border-box;}
    .ope_item{height:49px;border-bottom:1px solid #aaa;box-sizing:border-box;}
    .username_error{}
</style>

<template>
    <!--登陆-->
    <div class="login">
        <div class="pt15 pb20 tc operate">
            <span class="inline_block f20 cursor" v-for="(item,index) in lr_nav" :class="{active:item.flag}"
                  @click="operate_form(index)">
                {{item.name}}
            </span>
        </div>
        <div class="ope border_box">
            <div class="ope_item pr">
                <div class="f0 par p_head"><img src="/src/assets/images/icon_account.png"></div>
                <input type="text" class="lr_input" v-model="loginData.username" @focus="loginError=``" placeholder="账号 / 手机号">

            </div>
            <div class="ope_item pr">
                <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                <input type="password" class="lr_input" v-model="loginData.password" @focus="loginError=``" placeholder="密码">
            </div>
            <div class="ope_item pr">
                <div class="f0 par p_head"><img src="/src/assets/images/icon_verofication.png"></div>
                <input type="text" class="lr_input" v-model="loginData.code" @focus="loginError=``" placeholder="输入验证码">
                <div class="f0 par ver_code"><img :src="login_code"></div>
                <div class="f0 par fresh_icon cursor" @click="fresh_login_code"><img src="/src/assets/images/fresh_img.jpg"></div>
            </div>
        </div>
        <div class="lh25 color_red pt5 f20" v-show="loginError">{{loginError}}</div>
        <div class="pt20">
            <el-button type="success" class="w_350 f18" @click="login_account">登陆</el-button>
        </div>

        <div class="color_blue f16 cursor pt10" >
        	<span style="margin-right: 20px;" class="unl" @click="url_path">返回首页</span>
        	<span class="unl" @click="findPassword">找回密码</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState, mapMutations } from "vuex"
    export default {
        name: "login_module",
        data(){
            return {
                lr_nav: [
                    {name: "注册", flag: false, rName:"registerModule"},
                    {name: "登陆", flag: true,  rName:"loginModule"}
                ],
                login_code: rootURL + "index.php?r=site/getcp&time="+(Date.now()),
                loginData: {
                    username: "",        // 账户
                    password: "",        // 密码
                    code: ""             // 验证码
                },
                loginError:""
            }
        },
        computed:{
            ...mapState([
                "jumpType"
            ])
        },
        methods:{
            ...mapMutations([
                "login_success",
                "operate_customer",
                "show_head_foot"
            ]),
            operate_form(index){
                this.lr_nav.forEach(function (item, i) {
                    item.flag = i == index;
                });
                this.$router.push({name:this.lr_nav[index].rName})
            },
            login_account(){
                let reg_tel = /^1[3|4|5|7|8]\d{9}$/;                    // 电话正则
                let reg_ad = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;   // 账户正则 6-18位的字母加数字的混合
                let param = Object.assign({},this.loginData);
                if (!param.username) {
                    this.loginError = "请输入账户或者手机号";
                    return false
                }
                if(!reg_ad.test(param.username)){
                	if(!reg_tel.test(param.username)){
                		this.loginError = "账户名格式错误";
                    	return false
                	}
                }
                if (!param.password) {
                    this.loginError = "请输入密码";
                    return false
                }
                if(!reg_ad.test(param.password)){
                    this.loginError = "密码格式错误";
                    return false
                }
                if (!param.code.length && param.code.length != 4) {
                    this.loginError = "请输入验证码";
                    return false
                }
                this.$ajax.post("index.php?r=site/login", param, data => {
                    if(data.error == 2){
                        this.loginError = data.message;
                    }
                    if(data.status == 0){
                        this.$wsCache.set("username",param.username,{exp: 6 * 60 * 60});          // 6小时时效期
                        this.$wsCache.set("user_id",data.data.uid,{exp: 6 * 60 * 60});            // 6小时时效期
                        this.$wsCache.set("telephone",data.data.telephone,{exp: 6 * 60 * 60});    // 6小时时效期
                        let jumpType = this.jumpType;
                        console.log("jumpType :" + jumpType);
                        if(jumpType == 1){
                            this.login_success(0);
                            this.$router.push("/placeOrder");  // 跳回到 个人中心 的页面
                        }else if(jumpType == 2){
                            this.login_success(3);
                            this.$router.push("/personCenter");// 跳回到 个人中心 的页面
                        }else {
                            this.login_success(0);
                            this.$router.push("/");            // 跳回到 首页
                        }
                    }else if(data.status == 1){
                    	this.loginError = data.message;
                    }
                });
            },
            findPassword(){
                this.$router.push({name:"findPassword"})
            },
            // 刷新登陆验证码
            fresh_login_code(){
                this.login_code = rootURL + "index.php?r=site/getcp&time="+(Date.now());
            },
            url_path(){//返回首页
            	this.show_head_foot();
            	this.operate_customer(true);
            	this.$router.push("/");
            }
        }
    }
</script>
