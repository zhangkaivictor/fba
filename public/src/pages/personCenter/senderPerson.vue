<style scoped>
    .flex_wrapper {-webkit-justify-content: space-between;justify-content: space-between;}
    .region_position{left:0;}
</style>
<template>
    <div class="modify_password">
        <div class="title_bar lh40 bor_bot_solid">
            <div class="title_title inline_block color_green pr f16">
                发件人
            </div>
        </div>
        <div class="f15">
            <div class="addNew pt20 pb40 tc">
                <el-button type="success" class="w_200 f16" @click="addSender">新增发件人</el-button>
            </div>
            <div class="flex_wrapper">
                <card v-for="(item,index) in senderData"
                      :key="index"
                      :index="index"
                      :item="item"
                      @del="delSender"
                      @edit="editSender">
                </card>
            </div>
        </div>

        <!--新增发件人 弹窗-->
        <div class="layer_window" v-show="tc_show" @click="region_show = false">
            <div class="layout sender_tc pl20 pr20 pb100" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click.stop="tcHidden"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">{{tc_name}}</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="clear_float mb10">
                        <div class="fl w_100 pr10 tr lh30">公司名称</div>
                        <div class="fl">
                            <el-input v-model="edit.companyName" class="w_300" clearable></el-input>
                        </div>
                    </li>
                    <li class="clear_float mb10">
                        <div class="fl w_100 pr10 tr lh30"><i class="color_red"> * </i>
                            <span class="justify3">联系人</span></div>
                        <div class="fl">
                            <el-input v-model="edit.contactPerson" class="w_300" clearable></el-input>
                        </div>
                    </li>
                    <li class="clear_float mb10">
                        <div class="fl w_100 pr10 tr lh30"><i class="color_red"> * </i>联系电话</div>
                        <div class="fl">
                            <el-input v-model="edit.tel" class="w_300" clearable></el-input>
                        </div>
                    </li>
                    <li class="clear_float mb10">
                        <div class="fl w_100 pr10 tr lh30"><i class="color_red"> * </i>取件地址</div>
                        <div class="fl pr">
                            <!--<el-input v-model="edit.pick_address" class="w_300" clearable></el-input>-->
                            <input type="text" class="input w_300 cursor"
                                   v-model="edit.pick_address"
                                   :class="{'focused_country':region_show}"
                                   @click.stop="region_show = true" readonly>
                            <region class="w_365 region_position" v-show="region_show" :region_init = "region_init"
                                    @pipeRegionData="pipeRegionData"></region>
                        </div>
                    </li>
                    <li class="clear_float mb10">
                        <div class="fl w_100 pr10 tr lh30"><i class="color_red"> * </i>详细地址</div>
                        <div class="fl">
                            <el-input type="textarea" autosize v-model="edit.address" class="w_300"></el-input>
                        </div>
                    </li>
                </ul>
                <div class="error color_red tc lh25">{{error_info}}</div>
                <div class="operate_btn tc par">
                    <el-button class="w_170 f16" plain @click.stop="tcHidden">取消</el-button>
                    <el-button class="w_170 f16" type="success" @click="sureModify">确定</el-button>
                </div>
            </div>
        </div>
		<!--删除-->
        <div class="layer_window" v-show="delete_false">
            <div class="layout sender_tc pl20 pr20 pb100" style="width:340px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="delete_false = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">删除</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="clear_float mb10">是否删除？</li>
                </ul>
                <div class="error color_red tc lh25">{{error_info}}</div>
                <div class="operate_btn tc par">
                    <el-button class="w_100 f16" plain @click="delete_false = false">取消</el-button>
                    <el-button class="w_100 f16" type="success" @click="delete_btn">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import card from "@/components/card.vue"
    import region from "@/components/region.vue"
    import { mapMutations } from "vuex"

    export default {
        name: "senderPerson",
        created(){
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");
            this.fresh_per_page({index: 2});
            this.initData();
        },
        data() {
            return {
                tc_show: false,      // 弹窗显示 / 隐藏
                region_show: false,  // 省市区组件 显示 / 隐藏
                region_init:0,
                senderData: [],       // 发件人列表数据
                order_index: null,    // 选中的发件人信息项的下标
                operate_type:null,
                tc_name:"新增发件人",
                error_info:"",
                edit: {
                    sender_id:"",
                    companyName: "",
                    contactPerson: "",
                    tel: "",
                    pick_address: "",
                    pick_address_id:[],
                    address: ""
                },
                delete_false : false,//删除弹框
                delete_data : '',//删除传的数据
                delete_isfalse : true //防止重复删除
            }
        },
        methods: {
            ...mapMutations([
                "fresh_per_page"
            ]),
            initData(){
                this.$ajax.post("index.php?r=fba/fba/sender-managent",{}, data => {
                    if(data.status == 0){
                        this.senderData = data.data;
                    }
                });
            },
            pipeRegionData(data){
                this.edit.pick_address = [data.proName,data.cityName,data.areaName].join(" ");
                this.edit.pick_address_id = [data.proId,data.cityId,data.areaId];
                this.region_show = false;
            },
            addSender(){        // 增加发件人
                this.tc_show = true;        // 弹窗显示
                this.edit = {
                    sender_id:"",
                    companyName:"",
                    contactPerson:"",
                    tel:"",
                    pick_address:"",
                    pick_address_id:[],
                    address:""
                };
                this.operate_type = 2;           // 设置操作类型 新增发件人
                this.tc_name = "新增发件人";     // 修改弹窗的标题名称
                this.region_init = 1;
            },
            delSender(data){        // 删除发件人
            	this.delete_false = true;
            	this.delete_data = data;
            },
            delete_btn () {//删除确认
            	if(this.delete_isfalse == false){return false;}
            	this.delete_isfalse = false;
            	var param = {sender_id : this.delete_data.sender_id};
            	this.$ajax.post("index.php?r=fba/fba/delete-sender",param, data => {
            		this.delete_isfalse = true;
                    if(data.status == 0){
                        this.senderData.splice(this.delete_data.index,1);
                        this.delete_false = false;       // 弹窗关闭
                    }
                });
            },
            editSender(data){       // 编辑发件人
                this.tc_show = true;                      // 弹窗关闭
                this.tc_name = "修改发件人";              // 修改弹窗的标题名称
                // this.edit = Object.assign({},this.senderData[data.index]); // 数据拷贝
                data = this.senderData[data.index];
                this.edit = {
                    sender_id:data.sender_id,
                    companyName:data.company,
                    contactPerson:data.contact_name,
                    tel:data.contact_phone,
                    pick_address:Object.values(data.pro_ci_ar).join(" "),
                    pick_address_id:[data.province,data.city,data.area],
                    address:data.address
                };
                this.order_index = data.index;
                this.operate_type = 1;      // 设置操作类型 修改发件人
            },
            sureModify(){ // 编辑发件人后确认信息 替换原有信息
                var param = {};
                // let reg_tel = /^1[3|4|5|7|8][0-9]\d{4,8}$/;       // 电话正则
                console.log("666");
                if(this.operate_type == 1){
                    // 等于 1 为修改替换发件人
                    // this.senderData.splice(this.order_index, 1, this.edit);
                    param = {
                        sender_id:this.edit.sender_id,
                        company:this.edit.companyName,
                        contact_name:this.edit.contactPerson,
                        contact_phone:this.edit.tel,
                        address:this.edit.address
                    };
                    [param.province,param.city,param.area] = this.edit.pick_address_id;

                    if(!param.company){this.error_info = "公司名称不能为空";return false}
                    if(!param.contact_name){this.error_info = "联系人不能为空";return false}
                    if(!param.contact_phone){this.error_info = "联系电话不能为空";return false}
                    // if(!reg_tel.test(param.contact_phone)){this.error_info = "电话格式错误";return false}
                    if(!param.province){this.error_info = "省不能为空";return false}
                    if(!param.city){this.error_info = "市不能为空";return false}
                    if(!param.area){this.error_info = "区不能为空";return false}
                    if(!param.address){this.error_info = "详细地址不能为空";return false}
                    this.$ajax.post("index.php?r=fba/fba/edit-sender",param, data => {
                        if(data.status == 0){
                            // this.senderData.push(this.edit);
                            // console.log(data);
                            this.initData();
                            this.tc_show = false;       // 弹窗关闭
                        }
                    });
                }
                else if(this.operate_type == 2){   // 等于 2 为新增发件人
                    param = {
                        company:this.edit.companyName,
                        contact_name:this.edit.contactPerson,
                        contact_phone:this.edit.tel,
                        address:this.edit.address
                    };
                    [param.province,param.city,param.area] = this.edit.pick_address_id;

                    if(!param.company){this.error_info = "公司名称不能为空";return false}
                    if(!param.contact_name){this.error_info = "联系人不能为空";return false}
                    if(!param.contact_phone){this.error_info = "联系电话不能为空";return false}
                    // if(!reg_tel.test(param.contact_phone)){this.error_info = "电话格式错误";return false}
                    if(!param.province){this.error_info = "省不能为空";return false}
                    if(!param.city){this.error_info = "市不能为空";return false}
                    if(!param.area){this.error_info = "区不能为空";return false}
                    if(!param.address){this.error_info = "详细地址不能为空";return false}
                    this.$ajax.post("index.php?r=fba/fba/add-sender",param, data => {
                        if(data.status == 0){
                            // this.senderData.push(this.edit);
                            // console.log(data);
                            this.initData();
                            this.tc_show = false;       // 弹窗关闭
                        }
                    });
                }
            },
            tcHidden(){
                this.tc_show = false;       // 弹窗 隐藏
                this.region_show = false;   // 省市区 隐藏
                this.region_init = 0;
            }
        },
        components: {card,region},
        computed: {},
        watch: {}

        /*`sender_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `company` varchar(255) NOT NULL DEFAULT '' COMMENT '公司名称',
        `contact_name` varchar(255) NOT NULL DEFAULT '' COMMENT '联系人',
        `contact_phone` varchar(255) NOT NULL DEFAULT '' COMMENT '联系人电话',
        `province` varchar(255) NOT NULL DEFAULT '0' COMMENT '省',
        `city` varchar(255) NOT NULL DEFAULT '0' COMMENT '市',
        `area` varchar(255) NOT NULL DEFAULT '0' COMMENT '区',
        `address` varchar(255) NOT NULL DEFAULT '' COMMENT '地址',
        `sender_add_time` int(11) NOT NULL,
        `sender_update_time` int(11) NOT NULL,
        `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除  0：未删除 1：已删除',
        `puid` int(11) NOT NULL DEFAULT '0' COMMENT '所属用户id',*/

    }
</script>
