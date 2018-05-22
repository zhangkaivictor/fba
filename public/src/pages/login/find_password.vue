<style scoped>
    .hide{display:none;}
    .lr_input{
        -webkit-appearance:none;background-color:#fff;-webkit-box-sizing:border-box;
        box-sizing:border-box;color:#303030;display:inline-block;font-size:inherit;line-height: 1;
        outline:none;padding:0 15px 0 35px;border:0;width:100%;height:48px;text-indent:10px;
    }
    .p_head{top:16px;left:14px;}
    .ver_code{height:30px;width:60px;top:9px;right:45px;}
    .ver_code img{height:30px;width:60px;}
    .fresh_icon{top:14px;right:15px;}
    .operate span{border-bottom:2px solid #fff;padding:7px 20px;}
    .operate span.active{border-bottom:2px solid #99ce58;}
    .ope{border:1px solid #aaa;border-bottom:none;width:350px;box-sizing:border-box;}
    .ope_item{height:49px;border-bottom:1px solid #aaa;box-sizing:border-box;}
</style>
<template>
    <!-- 找回密码 模块 -->
    <div class="find_module operate">
        <div class="pt10 pb20 tc operate" v-show="step_show != 4">
            <span class="inline_block f20 cursor active">找回密码</span>
        </div>
        <div class="find_password">
            <div class="find_first" v-show="step_show == 1">
                <div class="ope border_box">
                    <div class="ope_item pr">
                        <div class="f0 par p_head"><img src="/src/assets/images/icon_cellphone.png"></div>
                        <input type="text" v-model="telephone" class="lr_input" @focus="error_info=``" placeholder="请输入您的手机号">
                    </div>
                    <div class="ope_item pr">
                        <div class="f0 par p_head"><img src="/src/assets/images/icon_verofication.png"></div>
                        <input type="text" v-model="ver_code" class="lr_input" @focus="error_info=``" placeholder="输入验证码">
                        <div class="f0 par ver_code"><img :src="verification_code"></div>
                        <div class="f0 par fresh_icon cursor" @click="freshVerificationCode">
                            <img src="/src/assets/images/fresh_img.jpg">
                        </div>
                    </div>
                </div>
                <div class="pt20">
                    <el-button type="success" class="w_350 f18" @click="goToNextStep">下一步</el-button>
                </div>
            </div>
            <div class="find_second" v-show="step_show == 2">
                <div class="ope border_box">
                    <div class="ope_item pr">
                        <div class="f0 par p_head"><img src="/src/assets/images/icon_message_verify.png"></div>
                        <input type="text" class="lr_input" v-model="note_code"
                               @focus="error_info=``" placeholder="请输入短信验证码">
                    </div>
                    <div class="ope_item pr tc">
                        <div class="lh48 cursor f16" style="color:#a7a7a7" v-show="auth_code_show">{{auth_code_txt}}</div>
                        <div class="lh48 unl cursor f16 color_blue" v-show="!auth_code_show"
                             @click="reGetAuthCode">重新获取短信验证码
                        </div>
                    </div>
                </div>
                <div class="pt20">
                    <el-button type="success" class="w_350 f18" @click="goThirdStep">下一步</el-button>
                </div>
            </div>

            <div class="find_second" v-show="step_show == 3">
                <div class="ope border_box">
                    <div class="ope_item pr">
                        <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                        <input type="text" v-model="password" class="lr_input" @focus="error_info=``" placeholder="请输入密码">
                    </div>
                    <div class="ope_item pr">
                        <div class="f0 par p_head"><img src="/src/assets/images/icon_code.png"></div>
                        <input type="text" v-model="re_password" class="lr_input" @focus="error_info=``" placeholder="请重复输入密码">
                    </div>
                </div>
                <div class="pt20">
                    <el-button type="success" class="w_350 f18" @click="sureModifyPassword">确定</el-button>
                </div>
            </div>
            <div class="lh30 color_red" v-show="error_info">{{error_info}}</div>
            <div class="register_success pt20" v-show="step_show == 4">
                <div class="f0"><img src="/src/assets/images/icon_success.png"></div>
                <div class="color_3030 pt20 tc f15">
                    新密码设置成功！马上 [ <i class="unl color_green cursor f16" @click="goToLogin">登陆</i> ]
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "find_password",
        props:["topUpData"],
        data(){
            return {
                step_show:"1",
                verification_code:rootURL + "index.php?r=site/getcp&time="+(Date.now()),
                telephone:"",
                ver_code:"",
                auth_code_show:true,
                note_code:"",
                auth_code_txt:"60s 后可重新获取",
                password:"",
                re_password:"",
                error_info:""
            }
        },
        methods:{
            // 下一步
            goToNextStep(){
                let _this = this;
                let reg_tel = /^1[3|4|5|6|7|8]\d{9}$/;                    // 电话正则
                let param = {request: 1,telephone: this.telephone,code: this.ver_code};
                if(!param.telephone){this.error_info = "手机号码不能为空";return false}
                if(!(reg_tel.test(param.telephone))){this.error_info = "手机号码格式错误";return false}
                if(!param.code && param.code.length != 4){this.error_info = "验证码不能为空或补全验证码";return false}
                this.$ajax.post("index.php?r=site/forget-password",param,data => {
                    if(data.status == 0){
                        this.step_show = "2";       // 第二模块显示
                        let num = 60;
                        (function clock_time() {
                            num--;
                            if(num > 0){
                                _this.auth_code_txt = `${num}s 后可重新获取`;
                                setTimeout(clock_time,1000)
                            }else {
                                _this.auth_code_show = false;
                            }
                        })();
                    }else {
                        this.$message({message: data.message, type: "warning"});
                    }
                })
            },
            // 重新获取验证码
            reGetAuthCode(){
                let param = {
                    telephone: this.telephone,  // 手机号
                    request: 2
                };
                this.$ajax.post("index.php?r=site/forget-password",param, data => {
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
                        })();
                    }else {
                        this.$message({message: data.message, type: "warning"});
                    }
                });
            },
            // 验证短信验证码是否正确
            goThirdStep(){
                let param = {
                    send_code: this.note_code,
                    request: 3
                };
                if (param.send_code.length != 6){this.error_info = "短信验证码错误";return false}
                this.$ajax.post("index.php?r=site/forget-password",param, data => {
                    if(data.status == 0){
                        this.step_show = "3";    // 第三模块显示
                    }else {
                        this.$message({message: data.message, type: "warning"});
                    }
                });
            },
            // 确认修改密码
            sureModifyPassword(){
                let param ={
                    request: 4,
                    telephone: this.telephone,
                    new_pass: this.password,
                    re_new_pass: this.re_password
                };
                // 账户正则 6-18位的字母加数字的混合
                let reg_ad = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
                if(!param.new_pass){this.error_info = "密码不能为空";return false}
                if(!reg_ad.test(param.new_pass)){this.error_info = "密码格式错误";return false}
                if(!param.re_new_pass){this.error_info = "重复密码不能为空";return false}
                //if(!reg_ad.test(param.re_password)){this.error_info = "重复密码格式错误";return false}
                if(param.new_pass != param.re_new_pass){this.error_info = "密码与重复密码不一致";return false}
                this.$ajax.post("index.php?r=site/forget-password",param, data => {
                    if(data.status == 0){
                        this.step_show = "4"; // 第四模块显示
                    }else {
                        this.$message({message: data.message, type: "warning"});
                    }
                });
            },
            // 跳转到 登陆页面
            goToLogin(){
                this.$router.push({name:"loginModule"});
            },
            // 刷新验证码
            freshVerificationCode(){
                this.verification_code = rootURL + "index.php?r=site/getcp&time="+(Date.now());
            }
        }
    }
</script>
