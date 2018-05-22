<style scoped>
    .flex_wrapper {
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }
</style>
<template>
    <div class="modify_password">
        <div class="info_bar bor_bot_solid f16 color_3030">
            <div class="inline_block lh30 mr20 cursor pr" :class="{active: nav_show}" @click="nav_show = !nav_show">
                亚马逊仓库
            </div>
            <div class="inline_block lh30 cursor pr" :class="{active: !nav_show}" @click="nav_show = !nav_show">
                第三方仓库
            </div>
        </div>
        <div class="store_container f15">
            <!--亚马逊仓库-->
            <div class="amazon_store" v-show="nav_show">
                <div class="addNew pt20 pb40 tc">
                    <el-button type="success" class="w_200 f16" @click="addAmazonStore">新增亚马逊仓库</el-button>
                </div>
                <div class="flex_wrapper">
                    <amazon-card v-for="(item,index) in amazonStore"
                                 :key="item.storeId"
                                 :index="index"
                                 :item="item"
                                 @del-amazon="deleteAmazon"
                                 @edit-amazon="modifyAmazon"
                    ></amazon-card>
                </div>
            </div>

            <!--第三方仓库-->
            <div class="third_store" v-show="!nav_show">
                <div class="addNew pt20 pb40 tc">
                    <el-button type="success" class="w_200 f16" @click="addThirdStore">新增第三方仓库</el-button>
                </div>
                <div class="flex_wrapper">
                    <third-card v-for="(item,index) in thirdStore"
                                :key="item.storeId"
                                :index="index"
                                :item="item"
                                @del-third="deleteThird"
                                @edit-third="modifyThird"
                    ></third-card>
                </div>
            </div>
        </div>

        <!--新增亚马逊仓库 弹窗-->
        <div class="layer_window" v-show="amazon_tc_show">
            <div class="layout sender_tc pl20 pr20 pb100" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="amazon_tc_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">{{tc_title}}</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i>仓库名称
                        <el-input v-model="amazon_edit.storeName" class="w_300 pl5" clearable clearable placeholder="请输入仓库名称"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i>仓库代码
                        <el-input v-model="amazon_edit.storeCode" class="w_300 pl5" clearable placeholder="请输入仓库代码"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i>国家州市
                        <el-input v-model="amazon_edit.cou_pro_city" class="w_300 pl5" clearable placeholder="国家、州、市之间用 / 号分割"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i><span class="justify2">邮编</span>
                        <el-input v-model="amazon_edit.zipCode" class="w_300 pl5" clearable clearable placeholder="请输入邮编"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red ver_top"> * </i><span class="inline_block ver_top">详细地址</span>
                        <el-input type="textarea" autosize v-model="amazon_edit.address" class="w_300 pl5" clearable placeholder="请输入详细住址"></el-input>
                    </li>
                </ul>
                <div class="operate_btn tc par">
                    <el-button class="w_170 f16" plain @click="amazon_tc_show = false">取消</el-button>
                    <el-button class="w_170 f16" type="success" @click="sureModifyAmazon">确定</el-button>
                </div>
            </div>
        </div>

        <!--新增第三方仓库 弹窗-->
        <div class="layer_window" v-show="third_tc_show">
            <div class="layout sender_tc pl20 pr20 pb100" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="third_tc_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">{{tc_title}}</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="mb10 pl15">
                        <i class="color_red"> * </i>仓库名称
                        <el-input v-model="third_edit.storeName" class="w_300 pl5" clearable clearable placeholder="请输入仓库名称"></el-input>
                    </li>
                    <li class="mb10 pl15">
                        <i class="color_red"> * </i><span class="justify3">联系人</span>
                        <el-input v-model="third_edit.contactPerson" class="w_300 pl5" clearable clearable placeholder="请输入联系人"></el-input>
                    </li>
                    <li class="mb10 pl15">
                        <i class="color_red"> * </i>联系电话
                        <el-input v-model="third_edit.tel" class="w_300 pl5" clearable clearable placeholder="请输入联系电话"></el-input>
                    </li>
                    <li class="mb10 pl15">
                        <i class="color_red"> * </i>国家州市
                        <el-input v-model="third_edit.cou_pro_city" class="w_300 pl5" clearable placeholder="国家、州、市之间用 / 号分割"></el-input>
                    </li>
                    <li class="mb10 pl15">
                        <i class="color_red"> * </i><span class="justify2">邮编</span>
                        <el-input v-model="third_edit.zipCode" class="w_300 pl5" clearable placeholder="请输入邮编"></el-input>
                    </li>
                    <li class="mb10 pl15">
                        <i class="color_red ver_top"> * </i><span class="inline_block ver_top">详细地址</span>
                        <el-input type="textarea" autosize v-model="third_edit.address" class="w_300 pl5" placeholder="请输入详细地址"></el-input>
                    </li>
                </ul>
                <div class="operate_btn tc par">
                    <el-button class="w_170 f16" plain @click="third_tc_show = false">取消</el-button>
                    <el-button class="w_170 f16" type="success" @click="sureModifyThird">确定</el-button>
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
                    <li class="clear_float mb10">
                    	是否删除？
                    </li>
                </ul>
                <div class="operate_btn tc par">
                    <el-button class="w_100 f16" plain @click="delete_false = false">取消</el-button>
                    <el-button class="w_100 f16" type="success" @click="delete_btn">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import amazonCard from "@/components/amazon_card.vue"
    import thirdCard from "@/components/third_card.vue"
    import { mapMutations } from "vuex"
    export default {
        name: "receiverPerson",
        created(){
        	 if(!this.$wsCache.get("user_id")){
                this.$router.push("/login");
            }
            this.fresh_per_page({
                index: 3
            });
            this.initData();
        },
        data() {
            return {
                nav_show: true,
                tc_title: null,
                amazon_tc_show: false,
                third_tc_show: false,
                amazon_index: null,
                third_index: null,
                amazon_operate_type:2,
                third_operate_type:3,
                amazonStore: [],
                thirdStore: [],
                amazon_edit: {storeName:"",storeCode:"",cou_pro_city:"",zipCode:"",address:""},
                third_edit: {storeName:"",contactPerson:"",tel:"",cou_pro_city:"",zipCode:"",address:""},
                delete_false : false,    // 删除弹框
                delete_data : '',        // 删除传的数据
                delete_isfalse : true    // 防止重复删除
            }
        },
        methods: {
            initData(){
                //this.$http.post("/data/receiverStore").then(response => {
                //    let data = response.data;
                //    if (data.status == 0) {
                //        this.amazonStore = data.data.amazon;
                //        this.thirdStore = data.data.third;
                //    }
                //}).catch(function (error) {
                //    console.log(error);
                //});
                this.$ajax.post("index.php?r=fba/fba/warehouse-managent",{}, data => {
                    if(data.status == 0){
                        this.amazonStore = data.data.awsArr;
                        this.thirdStore = data.data.thirdArr;
                    }
                })
            },
            addAmazonStore(){
                this.amazon_tc_show = true;
                this.amazon_edit = {storeName:"",storeCode:"",cou_pro_city:"",zipCode:"",address:""};
                this.amazon_operate_type = 2;
                this.tc_title = "新增亚马逊仓库";     // 修改弹窗的标题名称
            },
            addThirdStore(){
                this.third_tc_show = true;
                this.third_edit = {storeName:"",contactPerson:"",tel:"",cou_pro_city:"",zipCode:"",address:""};
                this.third_operate_type = 2;
                this.tc_title = "新增第三方仓库";     // 修改弹窗的标题名称
            },
            sureModifyAmazon(){
                var param = {
                    ware_type:"1",
                    warehouse_name: this.amazon_edit.storeName,
                    ware_code:this.amazon_edit.storeCode,
                    post_code:this.amazon_edit.zipCode,
                    warehouse_address:this.amazon_edit.address
                };
                [param.ware_country,param.ware_province,param.ware_city] = this.amazon_edit.cou_pro_city.split("/");
                if(this.amazon_operate_type == 1){  // 等于 1 为修改亚马逊仓库
                    param.warehouse_id = this.amazon_edit.warehouse_id;
                    this.$ajax.post("index.php?r=fba/fba/edit-warehouse",param, data => {
                        if(data.status == 0){
                            this.initData();
                            this.amazon_tc_show = false;       // 弹窗关闭
                        }
                    });
                }else if(this.amazon_operate_type == 2){  // 等于 2 为新增亚马逊仓库
                    // this.amazonStore.push(this.amazon_edit);
                    this.$ajax.post("index.php?r=fba/fba/add-warehouse",param, data => {
                       if(data.status == 0){
                           this.initData();
                           this.amazon_tc_show = false;       // 弹窗关闭
                       }
                    });
                }
            },
            sureModifyThird(){
                var param = {
                    ware_type:"2",
                    warehouse_name: this.third_edit.storeName,
                    warehouse_admin:this.third_edit.contactPerson,
                    warehouse_phone:this.third_edit.tel,
                    post_code:this.third_edit.zipCode,
                    warehouse_address:this.third_edit.address
                };
                [param.ware_country,param.ware_province,param.ware_city] = this.third_edit.cou_pro_city.split("/");
                if(this.third_operate_type == 1){  // 等于 1 为修改第三方仓库
                    // this.thirdStore.splice(this.third_index, 1, this.third_edit);
                    param.warehouse_id = this.third_edit.warehouse_id;
                    this.$ajax.post("index.php?r=fba/fba/edit-warehouse",param, data => {
                        if(data.status == 0){
                            this.initData();
                            this.amazon_tc_show = false;       // 弹窗关闭
                        }
                    });
                }else if(this.third_operate_type == 2){  // 等于 2 为新增第三方仓库
                    this.$ajax.post("index.php?r=fba/fba/add-warehouse",param, data => {
                        if(data.status == 0){
                            this.initData();
                            this.third_tc_show = false;       // 弹窗关闭
                        }
                    });
                }
                this.third_tc_show = false;       // 弹窗关闭
            },
            deleteAmazon(data){
            	this.delete_false = true;
            	this.delete_data = data;
            },
            delete_btn () {//删除确认
            	if(this.delete_isfalse == false){return false;}
            	this.delete_isfalse = false;
            	var param = {warehouse_id : this.delete_data.warehouse_id}
            	this.$ajax.post("index.php?r=fba/fba/delete-warehouse",param, data => {
            		this.delete_isfalse = true;
                    if(data.status == 0){
                    	if(this.delete_data.operateStyle == 0){//亚马逊
                    		this.amazonStore.splice(this.delete_data.index,1);
                    	}else if(this.delete_data.operateStyle == 1){//第三方仓库
                    		this.thirdStore.splice(this.delete_data.index,1);
                    	}

                        this.delete_false = false;       // 弹窗关闭
                    }
                });
            },
            modifyAmazon(data){
                this.amazon_tc_show = true;                    // 弹窗关闭
                this.tc_title = "修改亚马逊仓库";              // 修改弹窗的标题名称
                let temp_data = this.amazonStore[data.index];
                this.amazon_edit = {
                    warehouse_id:temp_data.warehouse_id,
                    storeName:temp_data.warehouse_name,
                    storeCode:temp_data.ware_code,
                    cou_pro_city:[temp_data.ware_country,temp_data.ware_province,temp_data.ware_city].join("/"),
                    zipCode:temp_data.post_code,
                    address:temp_data.warehouse_address
                };
                this.amazon_index = data.index;
                this.amazon_operate_type = data.operateStyle;
                console.log(data.operateStyle);
            },
            deleteThird(data){
            	this.delete_false = true;
            	this.delete_data = data;
                console.log("index : " + data.index);
                console.log("style : " + data.operateStyle);
            },
            modifyThird(data){
                this.third_tc_show = true;                     // 弹窗显示
                this.tc_title = "修改第三方仓库";              // 修改弹窗的标题名称
                let temp_data = this.thirdStore[data.index];
                this.third_edit = {
                    warehouse_id:temp_data.warehouse_id,
                    storeName:temp_data.warehouse_name,
                    contactPerson:temp_data.warehouse_admin,
                    tel:temp_data.warehouse_phone,
                    cou_pro_city:[temp_data.ware_country,temp_data.ware_province,temp_data.ware_city].join("/"),
                    zipCode:temp_data.post_code,
                    address:temp_data.warehouse_address
                };
                this.third_index = data.index;
                this.third_operate_type = data.operateStyle;
            },
            ...mapMutations([
                "fresh_per_page"
            ])
        },
        components: {
            amazonCard, thirdCard
        },
        computed: {},
        watch: {}
    }
</script>
