<style scoped>

</style>
<template>
    <div class="modify_password pb100">
        <div class="title_bar lh40 bor_bot_solid">
            <div class="title_title inline_block color_green pr f16">
                修改密码
            </div>
        </div>
        <ul class="pt90 f15">
            <li class="pb10 clear_float" v-for="(item,index) in passData">
                <div class="fl p_40 pr10 border_box lh32 tr color_deep">{{item.name}} : </div>
                <div class="fl p_60">
                    <el-input class="w_260" v-model="item.password" clearable type="password"
                              @input="checkCorrect(item.password,index)"
                              @focus="clearError"
                              :placeholder="item.placeholder">
                    </el-input>
                </div>
            </li>
        </ul>

        <!--错误信息提示-->
        <div class="error_info color_red f14 tc lh40">{{errorMessage}}</div>

        <!--保存修改密码后的信息-->
        <div class="tc pt10 pb20">
            <el-button plain class="w_200 f16" @click="savePassword">保存</el-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "modifyPassword",
        created(){
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");
            this.fresh_per_page({index: 4});
        },
        data() {
            return {
                errorMessage:"",
                passData:[
                    {name:"旧密码",  password:"", placeholder:"请输入旧密码"},
                    {name:"新密码",  password:"", placeholder:"请输入新密码"},
                    {name:"再次输入",password:"", placeholder:"请再次输入新密码"}
                ]
            }
        },
        methods: {
            checkCorrect(value,type){
                // 判定 账号、密码的正则表达式
                let reg_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
                if(!reg_pass.test(value)){
                    if(type == 0){
                        this.errorMessage = "旧密码格式错误，请输入正确的密码格式！";
                    }else if(type == 1){
                        this.errorMessage = "新密码格式错误，请输入正确的密码格式！";
                    }else {
                        this.errorMessage = "再次输入密码格式错误，请输入正确的密码格式！";
                    }
                }else {
                    if(type == 1 || type == 2){
                        let newPassword = this.passData[1].password;
                        let rePassword = this.passData[2].password;
                        if(newPassword !== rePassword)
                            this.errorMessage = "再次输入密码与新设置的密码不一致！";
                        else this.errorMessage = "";
                    }
                    else this.errorMessage = "";
                }
            },
            // 清除错误
            clearError(){
                this.errorMessage = "";
            },
            // 保存密码
            savePassword(){
                let [old_pass,new_pass,re_new_pass] = this.passData.map(function (item) {
                    return item.password;
                });
                this.$ajax.post("index.php?r=fba/fba/update-pass",{
                    old_pass,
                    new_pass,
                    re_new_pass
                }, data => {
                    if(data.status == 0){
                        this.passData.forEach(function (item) {
                            item.password = "";
                        })
                    }
                });
            },
            ...mapMutations([
                "fresh_per_page"
            ])
        },
        components: {},
        computed: {},
        watch: {}
    }
</script>
