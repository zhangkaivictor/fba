<style scoped>
    .person_pic_con{width:120px;height:120px;border-radius:62px;overflow:hidden;margin:0 auto;}
    .person_pic_con:hover .avatar-uploader{opacity:1;}
    .person_pic_con img{width:100%;}
    .modify_btn{top:50%;right:25px;transform:translateY(-50%);}
    .modify_account_info li{height:76px;line-height:76px;border-bottom:1px dashed #e4e4e4;}
    .avatar-uploader{
        width:120px;height:120px;top:0;left:0;z-index:99;opacity:0;
        background:rgba(0,0,0,0.3);color:#fff;transition:all 0.5s;
    }
</style>
<template>
    <div class="modify_password pb30">
        <div class="title_bar lh40 bor_bot_solid">
            <div class="title_title inline_block color_green pr f16">
                账户信息
            </div>
        </div>
        <div class="f15 pl20 pr20">
            <!--更改头像图片信息-->
            <div class="upload_pic tc lh120 pt20 pb20 bor_bot_dashed pr">
                <div class="person_pic_con pr">
                    <div style="width:120px;height:120px;">
                        <img src="/src/assets/images/big_person_pic.png" alt="放大版的个人头像">
                    </div>
                    <!-- accept="image/*" -->
                   <!-- <el-upload class="avatar-uploader par" name="importPicture" ref="upload"
                               :action="uploadAction"
                               :data="upLoadData"
                               :show-file-list="false"
                               :before-upload="uploadBefore"
                               :on-success="uploadSuccess">
                        <i class="modify_pic color_white">修改</i>
                        &lt;!&ndash;<el-button type="success">修改</el-button>&ndash;&gt;
                    </el-upload>-->
                </div>
            </div>

            <!--更改个人信息-->
            <ul class="modify_account_info color_3030">
                <li class="clear_float pr" v-for="(item,index) in originData">
                    <div class="fl w_100 pr10 color_deep tr">{{item.name}} : </div>
                    <!--修改展示项-->
                    <div class="fl calc_100" v-show="item.btn_show">
                        <span>{{item.value}}</span>
                        <div class="par modify_btn" v-if="index > 1">
                            <span class="inline_block color_green f15 lh20 cursor"
                                  @click="modifyInfo(index)">修改</span>
                        </div>
                    </div>
                    <!--保存修改项-->
                    <div class="fl calc_100" v-show="!item.btn_show" v-if="index > 1">
                        <el-input class="w_240" v-model="modifyData[index].value" @focus="error_info = ''" clearable></el-input>
                        <div class="par modify_btn">
                            <el-button type="success" class="w_80 f14" @click="saveInfo(index)">保存</el-button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="error color_red tc lh25 pt20">{{error_info}}</div>
            <!--退出系统-->
            <div class="pt20 pb10 tc">
                <el-button plain class="w_200 f15" @click="outSystem">退出系统</el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "placeOrder",
        created(){
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");
            this.fresh_per_page({index: 3});
            this.$ajax.post("index.php?r=fba/fba/personal",{},data => {
                if(data.status == 0){
                    Object.values(data.data).forEach((value,index) => {
                        if(index == 0){
                            this.user_id = value;
                        }else {
                            this.originData[index - 1].value = value;
                        }
                    });
                }
            });
        },
        data() {
            return {
                imageUrl: "",               // 头像图片的路径
                uploadAction: "",           // 上传时的 action
                upLoadData:{},              // 附带的额外数据  可选参数
                //btn_show:[true,true,true,true,true],
                error_info:"",
                user_id :"",
                originData:[
                    {name:"账户名",eName:"username",value:"",btn_show:true},
                    {name:"手机号码",eName:"telephone",value:"",btn_show:true},
                    {name:"微信号",eName:"wechat",value:"",btn_show:true},
                    {name:"QQ号",eName:"qq",value:"",btn_show:true},
                    {name:"电子邮箱",eName:"email",value:"",btn_show:true}
                ],
                modifyData:[
                    {value:"",eName:"username"},
                    {value:"",eName:"telephone"},
                    {value:"",eName:"wechat"},
                    {value:"",eName:"qq"},
                    {value:"",eName:"email"}
                ]
            }
        },
        methods: {
            ...mapMutations([
                "fresh_per_page"
            ]),
            // 图片上传之前进行检测
            uploadBefore(file) {
                // const isJPG = file.type === "image/jpeg";
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                //     this.$message.error("上传头像图片只能是 JPG 格式!");
                // }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                // return isJPG && isLt2M;
                return isLt2M;
            },
            // 图片上传成功
            uploadSuccess(e, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.imageUrl = file.url;
            },
            // 修改个人信息
            modifyInfo(index){
                this.originData[index].btn_show = false;
                this.modifyData[index].value = this.originData[index].value;
            },
            // 保存修改后的个人信息
            saveInfo(index){
                let temp_value = this.originData[index].value;  // 临时值
                this.originData[index].value = this.modifyData[index].value;
                // 若修改的值 与 此前的临时值 一致 不调用接口
                if(temp_value == this.originData[index].value){
                    this.originData[index].btn_show = true;
                    return false;
                }
                let param = {
                    id: this.user_id,
                    wechat:this.originData[2].value,
                    qq:this.originData[3].value,
                    email:this.originData[4].value
                };
                if(param.wechat == "暂未填写")  param.wechat = "";
                if(param.qq == "暂未填写")      param.qq = "";
                if(param.email == "暂未填写")   param.email = "";
                /*let weChat_reg = / ^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;   // 微信正则
                let QQ_reg = /^[1-9][0-9]{4,9}$/;                         // QQ正则
                let email_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  // 邮箱正则
                if(param.wechat && param.wechat != "暂未填写"){
                    if(!weChat_reg.test(param.wechat)){
                        this.error_info = "请填写正确的微信账号";
                        this.originData[index].value = temp_value;
                        return false
                    }
                }
                if(param.qq && param.qq != "暂未填写"){
                    if(!QQ_reg.test(param.qq)){
                        this.error_info = "请填写正确的QQ账号";
                        this.originData[index].value = temp_value;
                        return false
                    }
                }
                if(param.email && param.email != "暂未填写"){
                    if(!email_reg.test(param.email)){
                        this.error_info = "请填写正确的邮箱地址";
                        this.originData[index].value = temp_value;
                        return false
                    }
                }*/
                this.$ajax.post("index.php?r=fba/fba/edit-personal",param, data => {
                    if(data.status == 0){
                        this.originData[index].btn_show = true;
                    }else if(data.status == 1){
                        this.error_info = data.message;
                    }else {
                        console.log(data.message);
                    }
                });
            },
            outSystem(){  // 退出系统
            	this.$ajax.post("index.php?r=site/logout",{}, data => {
                    this.$wsCache.delete('username');
                    this.$wsCache.delete('user_id');
                    this.$wsCache.delete('telephone');
                    this.$router.push("/login");
                });
            }
        }
    }
</script>
