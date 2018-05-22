<style scoped>
    .hide{display:none;}
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
    .region_position{z-index:99;top:0;left:150px;}
    .get_code_btn{
        height:30px;line-height:30px;width:120px;top:9px;right:5px;background-color:#99ce58;
    	color: #fff;cursor: pointer;border-radius: 5px;
    }
    .get_code_time{line-height: 49px;}
</style>

<template>
    <!--注册-->
    <div class="register">
        <div class="pt15 pb20 tc operate" v-show="registerStep != 5">
            <span class="inline_block f20 cursor" v-for="(item,index) in lr_nav" :class="{active:item.flag}"
                  @click="operate_form(index)">
                {{item.name}}
            </span>
        </div>
        <div class="register_first" v-show="registerStep == 1">
            <div class="ope border_box">
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_cellphone.png"></div>
                    <input type="text" v-model="registerData.telephone" class="lr_input" @focus="registerError = `` " placeholder="请输入您的手机号">
                    <div class="login_register_prompt">请输入您的手机号</div>
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_verofication.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.code" @focus="registerError = `` " placeholder="输入验证码">
                    <div class="f0 par ver_code"><img :src="register_code"></div>
                    <div class="f0 par fresh_icon cursor" @click="freshRegisterCode">
                        <img src="/src/assets/images/fresh_img.jpg">
                    </div>
                    <div class="login_register_prompt">输入验证码</div>
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_verofication.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.note_code" @focus="registerError = `` " placeholder="输入短信验证码">
                    <div class="par get_code_btn" @click="get_code_btn_fun">获取验证码</div>
                    <div class="login_register_prompt">获取并输入短信验证码</div>
                </div>
                <div class="ope_item pr get_code_time" v-if="get_code_false">
                    {{get_code_time}}
                </div>
            </div>
            <div class="lh30 color_red f20" v-show="registerError && registerStep == 1">{{registerError}}</div>
            <div class="pt20">
                <!--<el-button type="success" class="w_350 f18" @click="goSecondStep">下一步</el-button>-->
                <el-button type="success" class="w_350 f18" @click="goThirdStep">下一步</el-button>
            </div>
        </div>
        <!--<div class="register_second" v-show="registerStep == 2">
            <div class="ope border_box">
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_message_verify.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.note_code" @focus="registerError = `` " placeholder="请输入短信验证码">
                </div>
                <div class="ope_item pr tc">
                    <div class="lh48 cursor f16" style="color:#a7a7a7" v-show="auth_code_show">{{auth_code_txt}}</div>
                    <div class="lh48 unl cursor f16 color_blue" v-show="!auth_code_show" @click="reGetAuthCode">重新获取短信验证码</div>
                </div>
            </div>
            <div class="lh30 color_red f20" v-show="registerError && registerStep == 2">{{registerError}}</div>
            <div class="pt20">
                <el-button type="success" class="w_350 f18" @click="goThirdStep">下一步</el-button>
            </div>
        </div>-->
        <div class="register_third" v-show="registerStep == 3">
            <div class="ope border_box">
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_account.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.username" @focus="registerError = `` " placeholder="账号(6-8位英文+数字)">
	                <div class="login_register_prompt">账号(6-8位英文+数字)</div>
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                    <input type="password" class="lr_input" v-model="registerData.password_hash" @focus="registerError = `` " placeholder="请输入密码">
                    	<div class="login_register_prompt">密码(6-8位英文+数字)</div>
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                    <input type="password" class="lr_input" v-model="registerData.re_password" @focus="registerError = `` " placeholder="请重复输入密码">
                </div>
            </div>
            <div class="lh30 color_red f20" v-show="registerError && registerStep == 3">{{registerError}}</div>
            <div class="pt20">
                <!--<el-button type="success" class="w_350 f18" @click="goFourthStep">下一步</el-button>-->
                <el-button type="success" class="w_350 f18" @click="goFourthStep">注册</el-button>
            </div>
        </div>
        <!--<div class="register_third pr" v-show="registerStep == 4">
            <div class="ope border_box">
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_account.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.company_name" @focus="registerError = `` " placeholder="请输入公司名称">
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                    <input type="text" class="lr_input" v-model="registerData.true_name" @focus="registerError = `` "
                           placeholder="请输入公司法人名称">
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                    <input type="text" class="lr_input cursor" v-model="registerData.pca_address"
                           @focus="registerError = `` " @click="region_show = true" readonly
                           placeholder="请选择省市区">
                </div>
                <div class="ope_item pr">
                    <div class="f0 par p_head hide"></div>
                    <input type="text" class="lr_input" @focus="registerError = `` " v-model="registerData.address"
                           placeholder="请输入详细地址">
                </div>
                <region class="w_365 region_position" v-show="region_show" @pipeRegionData="pipeRegionData"></region>
            </div>
            <div class="lh30 color_red f20" v-show="registerError && registerStep == 4">{{registerError}}</div>
            <div class="pt20">
                <el-button type="success" class="w_350 f18" @click="submitAccount">注册</el-button>
            </div>
        </div>
        <div class="lh30 color_red" v-show="registerError">{{registerError}}</div>
        <div class="register_success" v-show="registerStep == 5">
            <div class="f0"><img src="/src/assets/images/icon_success.png" alt=""></div>
            <div class="color_3030 pt20 tc f15">
                注册成功，请 [ <i class="unl color_blue cursor f16" @click="backLogin">登陆</i> ]
            </div>
        </div>-->
        <div class="color_blue f16 cursor pt10" >
        	<span style="margin-right: 20px;" class="unl" @click="url_path">返回首页</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import region from "@/components/region.vue"
    import { mapState, mapMutations } from "vuex"
    export default {
        name: "register_module",
        data(){
            return {
                lr_nav: [
                    {name: "注册", flag: true,  rName: "registerModule"},
                    {name: "登陆", flag: false, rName: "loginModule"}
                ],
                auth_code_show:true,
                region_show:false,
                auth_code_txt:"60s 后可重新获取",
                register_code: rootURL + "index.php?r=site/getcp&time="+(Date.now()),
                registerData: {
                    telephone: "",       // 手机号
                    code:"",             // 验证码
                    note_code:"",        // 短信验证码
                    username: "",        // 账户名
                    password_hash: "",   // 密码
                    company_name:"",     // 公司名称
                    true_name:"",        // 法人名称
                    pca_address:"",      // 省市区地址
                    address:""           // 地址
                },
                registerStep:"1",
                registerError:"",
                get_code_false : false,//获取验证码按钮显示
                get_code_time : '60s 后可重新获取'//时间显示
            }
        },
        computed:{
            ...mapState(["jumpType"])
        },
        methods:{
            // map 映射
        	...mapMutations([
        		"show_head_foot",
        		"operate_customer",
                "login_success"
            ]),
            // 操作表单模块
            operate_form(index){
                this.lr_nav.forEach(function (item, i) {
                    item.flag = i == index;
                });
                this.$router.push({name:this.lr_nav[index].rName})
            },
            // 返回登录模块
            /*backLogin(){
                 this.$router.push({name:"loginModule"});
            },*/
            // 刷新注册验证码
            freshRegisterCode(){
                this.register_code = rootURL + "index.php?r=site/getcp&time="+(Date.now()+1000);
            },
            //选择 省市区
            selectPCA(){},
            // 传递数据 设置省市区的值
            pipeRegionData(data){
                this.registerData.pca_address = [data.proName,data.cityName,data.areaName].join(" ");
                this.region_show = data.flag;
            },
            // 获取验证码
            get_code_btn_fun(){
            	let _this = this;
                let reg_tel = /^1[3|4|5|7|8][0-9]\d{4,8}$/;       // 电话正则
                let param = {
                    telephone: this.registerData.telephone,       // 手机号
                    code:this.registerData.code,                  // 验证码
                    request: 1
                };
                if(!param.telephone){this.registerError = "手机号码不能为空";return false}
                if(!reg_tel.test(param.telephone)){this.registerError = "手机号码格式错误";return false}
                if(!param.code && param.code.length != 4){this.registerError = "验证码不能为空或补全验证码";return false}
                if(this.get_code_false == true){return false;}
                this.get_code_false = true;
                this.$ajax.post("index.php?r=site/register",param, data => {
                	this.registerData.note_code = '';
                    if(data.status == 0){
                        let num = 60;
                        (function clock_time() {
                            num--;
                            if(num > 0){
                                _this.get_code_time = `${num}s 后可重新获取`;
                                setTimeout(clock_time,1000)
                            }else {
                            	 _this.get_code_false = false;
                                //_this.get_code_time = '获取验证码';
                            }
                        })()
                    }else {
                    	_this.get_code_false = false;
                    	this.registerError = data.message;
                    }
                });
            },

            /* // 第二步
            goSecondStep(){
                let _this = this;
                let reg_tel = /^1[3|4|5|7|8][0-9]\d{4,8}$/;       // 电话正则
                let param = {
                    telephone: this.registerData.telephone,       // 手机号
                    code:this.registerData.code,                  // 验证码
                    request: 1
                };
                //this.$router.push("/personCenter"); // 跳回到 进入该页面之前 的页面
                //return false;
                if(!param.telephone){this.registerError = "手机号码不能为空";return false}
                if(!reg_tel.test(param.telephone)){this.registerError = "手机号码格式错误";return false}
                if(!param.code && param.code.length != 4){this.registerError = "验证码不能为空或补全验证码";return false}
                this.$ajax.post("index.php?r=site/register",param, data => {
                    if(data.status == 0){
                        this.registerStep = "3";    // 第二模块显示
                        let num = 60;
                        (function clock_time() {
                            num--;
                            if(num > 0){
                                _this.auth_code_txt = `${num}s 后可重新获取`;
                                setTimeout(clock_time,1000)
                            }else {
                                _this.auth_code_show = false;
                            }
                        })()
                    }else{
                    	this.registerError = data.message;
                    }
                });
            },
            reGetAuthCode(){    // 重新获取验证码
                let param = {
                    telephone: this.registerData.telephone,  // 手机号
                    request: 2
                };
                this.$ajax.post("index.php?r=site/register",param, data => {
                    if(data.status == 0){
                        this.auth_code_show = true;
                        let num = 60;
                        let _this = this;
                        (function clock_time() {    // 定时器
                            num--;
                            if(num > 0){
                                _this.auth_code_txt = `${num}s 后可重新获取`;
                                setTimeout(clock_time,1000)
                            }else {
                                _this.auth_code_show = false;
                            }
                        })()
                    }else{
                    	this.registerError = data.message;
                    }
                });
            },*/
            // 验证短信验证码是否正确
            goThirdStep(){
                let param = {
                    send_code: this.registerData.note_code,
                    request: 3
                };
                // let reg_tel = /^1[3|4|5|7|8][0-9]\d{4,8}$/;       // 电话正则
                // if(!this.registerData.telephone){this.registerError = "手机号码不能为空";return false}
                // if(!reg_tel.test(param.telephone)){this.registerError = "手机号码格式错误";return false}
                // if(!this.registerData.code && this.registerData.code.length != 4){this.registerError = "验证码不能为空或补全验证码";return false}
                if (param.send_code.length != 6){this.registerError = "短信验证码错误";return false}
                this.$ajax.post("index.php?r=site/register",param, data => {
                    if(data.status == 0){
                        this.registerStep = "3";    // 第三模块显示
                    }
                });
            },
            // 注册账户
            goFourthStep(){
                let param = {
                	telephone: this.registerData.telephone,             // 手机号
                    username: this.registerData.username,               // 账户名
                    password_hash: this.registerData.password_hash,     // 密码
                    re_password: this.registerData.re_password,         // 重复密码
                    request: 4
                };
                // 账户正则 6-18位的字母加数字的混合
                let reg_ad = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
                if(!param.username){this.registerError = "账户名不能为空";return false}
                if(!reg_ad.test(param.username)){this.registerError = "账户名格式错误";return false}
                if(!param.password_hash){this.registerError = "密码不能为空";return false}
                if(!reg_ad.test(param.password_hash)){this.registerError = "密码格式错误";return false}
                if(!param.re_password){this.registerError = "重复密码不能为空";return false}
                if(!reg_ad.test(param.re_password)){this.registerError = "重复密码格式错误";return false}
                if(param.password_hash != param.re_password){this.registerError = "密码与重复密码不一致";return false}

                this.$ajax.post("index.php?r=site/register",param, data => {
                    if(data.status == 0){
                    	this.$wsCache.set("username",data.data.username,{exp: 6 * 60 * 60});        // 6小时时效期
                        this.$wsCache.set("user_id",data.data.id,{exp: 6 * 60 * 60});               // 6小时时效期
                        this.$wsCache.set("telephone",data.data.telephone,{exp: 6 * 60 * 60});      // 6小时时效期
                        let jumpType = this.jumpType;
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
                        // this.registerStep = "5";                // 第五模块显示
                    }else{
                    	this.registerError = data.message;
                    }
                });
                //this.registerStep = "4";    // 第四模块显示
            },
            /*submitAccount(){    // 注册账户
                let param = {
                    telephone: this.registerData.telephone,             // 手机号
                    username: this.registerData.username,               // 账户名
                    password_hash: this.registerData.password_hash,     // 密码
                    re_password: this.registerData.re_password,         // 重复密码
                    company_name: this.registerData.company_name,       // 公司名称
                    true_name: this.registerData.true_name,             // 法人名称
                    address: this.registerData.address,                 // 地址
                    request: 4
                };
                [param.province,param.city,param.district] = this.registerData.pca_address.split(" ");
                if(!param.company_name){this.registerError = "公司名称不能为空";return false}
                if(!param.true_name){this.registerError = "法人名称不能为空";return false}
                if(!param.province){this.registerError = "省不能为空";return false}
                if(!param.city){this.registerError = "市不能为空";return false}
                if(!param.district){this.registerError = "区不能为空";return false}
                if(!param.address){this.registerError = "地址不能为空";return false}
                this.$ajax.post("index.php?r=site/register",param, data => {
                    if(data.status == 0){
                    	this.$wsCache.set("username",data.data.username,{exp: 6 * 60 * 60});  // 6小时时效期
                        this.$wsCache.set("user_id",data.data.id,{exp: 6 * 60 * 60});    // 6小时时效期
                        this.$wsCache.set("telephone",data.data.telephone,{exp: 6 * 60 * 60});    // 6小时时效期
                        this.login_success();
                        //this.$router.go(-1); // 跳回到 进入该页面之前 的页面
                        this.$router.push("/personCenter"); // 跳回到 进入该页面之前 的页面
                        //this.registerStep = "5";    // 第五模块显示
                    }else{
                    	this.registerError = data.message;
                    }
                });
            },*/
            //返回首页
            url_path(){
            	this.show_head_foot();
            	this.operate_customer(true);
            	this.$router.push("/");
            }
        },
        components:{region}
    }
</script>
