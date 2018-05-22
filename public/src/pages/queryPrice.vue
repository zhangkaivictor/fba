<style scoped>
    .detailsLayout{width:400px;padding:20px 30px;left:35%;top:30%;}
    .forbid_title{
        width:135px;background:url("../assets/images/red_forbid.png") no-repeat 0 0;
        background-size:40px 40px;margin:0 auto;
    }
    .normal_title{
    	width:290px;background:url("../assets/images/icon_amazon_big.png") no-repeat 0 5px;
        background-size:100px;margin:0 auto;
    }
    label.label_title{display:inline-block;width:70px;text-align:right;margin-right:5px;}
    .query_price_con{background:url("../assets/images/bg_banner.png")no-repeat left top;background-size:cover;}
    .forbid .contraband{display:inline-block;background:url("../assets/images/forbid.png") no-repeat left 10px;
        height:44px;line-height:44px;padding-left:30px;}
    .forbid .normal{display:inline-block;background:url("../assets/images/icon_amazon.png") no-repeat left 10px;
        height:44px;line-height:44px;padding-left:100px;}
    .icon_icon{vertical-align:middle;margin-top:-3px;}
    .partners img{width:80%}
    table th{padding:8px 5px;border-bottom:1px solid #e4e4e4;}
    .platformAscendancy{width: 1000px;margin: 0 auto;overflow: hidden;}
    .platformAscendancy ul{width: 100%;box-sizing: border-box;padding: 0 2%;}
    .platformAscendancy li{width: 24%;float: left;height: 60px;line-height: 60px;color: #b1d785;}
    .platformAscendancy li img{height: 45px;vertical-align: middle;}
    .nowSubscribeInput{
        width:398px;height:48px;border:2px solid #99ce58;background-color: #f8fafa;color: #c0c0c0;
        box-sizing: border-box;padding: 0 20px;outline: none;font-size: 18px;transition: all 0.2s;
    }
    .nowSubscribeInput::-webkit-input-placeholder {color: #c0c0c0;}
    .nowSubscribe{padding:11px 20px;color: #fff;background-color: #99ce58;font-size: 20px;cursor: pointer;}
    .subscribePrompt{height: 33px; line-height: 33px;}
    .subscribePrompt img{vertical-align: middle;height: 33px;}
    .color_99ce58{color: #99ce58;}
    .region_position{right:84px;}
</style>

<template lang="html">
    <div class="container" @click="componentHidden">
        <!--平台优势的简介-->
    	<div class="platformAscendancy">
    		<ul>
    			<li>
    				<img src="../assets/images/icon_shouhuo.png"/>
    				<span>江浙沪全境上门收货</span>
    			</li>
    			<li>
    				<img src="../assets/images/icon_yanqipeichang.png"/>
    				<span>签收延期按天赔偿</span>
    			</li>
    			<li>
    				<img src="../assets/images/icon_diushipeichang.png"/>
    				<span>货物丢失照单赔偿</span>
    			</li>
    			<li>
    				<img src="../assets/images/icon_baojia.png"/>
    				<span>报价外无附加费</span>
    			</li>
    		</ul>
    	</div>

        <!--上半部分-->
        <div class="query_price_con pt50 pb50 f15">
            <div class="inner query_price box_shadow bg_fff pt15 pb15 pl70 pr70 border_box border_radius5">
                <div class="forbid lh45 tr cursor">
                	<div class="color_red normal" @click="show_tc_window(`normal_show`)">亚马逊货品标准</div>
                    <div class="color_red contraband" @click="show_tc_window(`forbid_show`)">禁寄违禁品</div>
                </div>
                <div class="clear_float">
                    <div class="fl pr">
                        <label class="w_75 inline_block mr5"><i class="color_red"> * </i><span class="justify4">我的地址</span></label>
                        <!--<el-input class="w_320" v-model="query_data.address" @focus="region_show = true" readonly></el-input>-->
                        <input type="text" class="input w_320 cursor" :class="{'focused_country':region_show}" v-model="myAddress"
                               @click.stop="region_show = true;searchText='';" readonly>
                        <region class="w_365 region_position" v-show="region_show" style="left:84px;" ref="regionComponent"
                                @pipeRegionData="pipeRegionData"></region>
                    </div>
                    <div class="fr pr">
                        <label class="w_75 inline_block mr5"><i class="color_red"> * </i><span class="justify4">目的国家</span></label>
                        <!--<el-input class="w_320" v-model="query_data.country"  @change="checkQueryData"></el-input>-->
                        <input type="text" class="input w_320 cursor" :class="{'focused_country':country_show}" v-model="countryName"
                               @click.stop="country_show = true;searchText='';" readonly>
                        <country class="w_500 region_position" v-show="country_show" style="left:84px;" ref="countryComponent"
                                 @pipeCountryData="pipeCountryData"></country>
                    </div>
                </div>
                <ul class="query_list pt10 pb10">
                    <li v-for="(item, index) in query_data.goods_list" :key="index" class="pt5 pb5">
                        <label class="w_75 inline_block mr5"><i class="color_red"> * </i><span class="justify3">货品{{index+1}}</span></label>
                        <i>长</i><el-input class="w_85 mr5 ml5" type="number" v-model="item.length"  @input="checkQueryData"></el-input><em class="mr8">cm</em>
                        <i>宽</i><el-input class="w_85 mr5 ml5" type="number" v-model="item.width"  @input="checkQueryData"></el-input><em class="mr8">cm</em>
                        <i>高</i><el-input class="w_85 mr5 ml5" type="number" v-model="item.height"  @input="checkQueryData"></el-input><em class="mr8">cm</em>
                        <i>重量</i><el-input class="w_85 mr5 ml5" type="number" v-model="item.weight"  @input="checkQueryData"></el-input><em class="mr8">kg</em>
                        <i>此尺寸</i><el-input class="w_85 mr5 ml5" type="number" v-model="item.numbers"  @input="checkQueryData"></el-input><em class="mr8">箱</em>
                        <i v-if="index == 0" class="el-icon-circle-plus icon_icon ver_mid mt-3" @click="addQueryItem"></i>
                        <i v-else class="el-icon-remove icon_icon color_red ver_mid mt-3" @click="delQueryItem(index)"></i>
                    </li>
                </ul>
                <div class="select_radio">
                    <label class="w_70 tr inline_block mr5"><i class="color_red"> * </i>货品类别</label>
                   	<el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="0" checked>普货</el-radio>
                    <el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="1">带粉末</el-radio>
                    <el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="2">带电</el-radio>
                    <el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="3">不带电</el-radio>
                    <el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="4">纺织品</el-radio>
                    <el-radio name="goods_type" class="w_75" v-model="query_data.goods_class" label="5">液体</el-radio>
                </div>
                <div class="tc pt20 pb25">
                    <div class="error lh25 color_red">{{searchText}}</div>
                    <el-button class="w_300 f18 mt10" native-type="button" type="success"
                       @click="getGoodsInfo" :disabled="btn_dis" v-show="show">立即询价</el-button>
                    <el-button class="f18 mt10" native-type="button" type="success"
                       @click="nowPlaceOrder" v-show="show">快捷下单</el-button>
                    <div v-show="!show" class="f18">
                        若错误填写有误，点击
                        <el-button type="success" class="f15" @click="clearQueryData">清除</el-button>
                        后重新询价
                    </div>
                </div>
            </div>
        </div>

        <!--下半部分-->
        <div class="introduce bg_fff">
            <div class="inner">
            	<!--查询后的推荐方案-->
                <div class="recommendation mb60 tc pr" v-show="!show && getPlanData.air_arr.length != 0">
                    <h3 class="color_3030 tl lh80 f24">推荐方案|空运|</h3>
                    <table class="w_1000">
                        <thead>
                            <tr>
                                <th>方案名称</th>
                                <th>参考时效(工作日)</th>
                                <th>计费单价</th>
                                <th>运输方式</th>
                                <!--<th>稳定性</th>-->
                                <th>预计总价(含燃油)</th>
                                <th>下单</th>
                            </tr>
                        </thead>
                        <tbody>
                            <recommend-item tag="tr" v-for="(item,index) in getPlanData.air_arr"
                                            :key="index"
                                            :item="item"
                                            :index="index"
                                            @showDetails="showDetails"
                                            @goToPlaceOrder="goToPlaceOrder">
                            </recommend-item>
                        </tbody>
                    </table>
                </div>

                <!--查询后的推荐方案-->
                <div class="recommendation mb60 tc pr" v-show="!show && getPlanData.sea_arr.length != 0">
                    <h3 class="color_3030 tl lh80 f24">推荐方案|海运|</h3>
                    <table class="w_1000">
                        <thead>
                            <tr>
                                <th>方案名称</th>
                                <th>参考时效(工作日)</th>
                                <th>计费单价</th>
                                <th>运输方式</th>
                                <!--<th>稳定性</th>-->
                                <th>预计总价(含燃油)</th>
                                <th>下单</th>
                            </tr>
                        </thead>
                        <tbody>
                            <recommend-item tag="tr" v-for="(item,index) in getPlanData.sea_arr"
                                            :key="index"
                                            :item="item"
                                            :index="index"
                                            @showDetails="showDetails"
                                            @goToPlaceOrder="goToPlaceOrder">
                            </recommend-item>
                        </tbody>
                    </table>
                </div>

                <!--公司描述-->
                <div class="describe">
                    <!--平台优势-->
                    <h3 class="color_3030 tc lh80 f24">每周FBA特价推送</h3>
                    <div class="tc" v-if="subscribeStatus == 1">
                    	<input class="nowSubscribeInput ver_top" type="email"
                               v-model="subscribeData"
                               @focus="subscribeError = false"
                               placeholder="请输入您的邮箱地址"><em class="nowSubscribe inline_block ver_top"
                                                           @click="SubscribeBtn">立即订阅</em>
                    </div>
                    <div class="tc" v-if="subscribeError">
                    	<em class="color_red lh40" >请填写正确的邮箱</em>
                    </div>

                    <div class="tc subscribePrompt" v-if="subscribeStatus == 2">
                    	<img src="../assets/images/icon_dingyue.png"/>
                    	<em class="color_99ce58" v-if="dataStatus == 0">你已订阅成功</em>
                    	<em class="color_red" v-if="dataStatus != 0">{{ubScribeText}}</em>
                    </div>
                    <h3 class="color_3030 tc lh80 f24">服务流程</h3>
                    <p class="tc lh40 color_4c4c">一站式物流服务，让亚马逊卖家“省时、省力、省钱、省心”</p>
                    <img class="p_100" src="/src/assets/images/flowPictrue.png"/>
                    <!--合作伙伴-->
                    <h3 class="color_3030 tc lh80 f24">合作伙伴</h3>
                    <ul class="pt10 pb50 pl30 pr30 border_box flex_wrapper">
                        <li><img src="../assets/images/postal.png"></li>
                        <li><img src="../assets/images/dhl.png"></li>
                        <li><img src="../assets/images/ups.png"></li>
                        <li><img src="../assets/images/fedEx.png"></li>
                        <li><img src="../assets/images/tnt.png"></li>
                    </ul>
                </div>
            </div>
        </div>

        <!--禁寄违禁品 弹窗-->
        <div class="layer_window" v-show="forbid_show">
           <div class="layout forbidLayout pt20 pb30 pl40 pr40">
                 <i class="el-icon-close f24 close_close color_gray cursor" @click="hide_tc_window(`forbid_show`)"></i>
                 <div class="color_red tc f24 p10">
                     <div class="forbid_title lh40 pl45">禁寄违禁品</div>
                 </div>
                 <h3 class="tc f16 p5">违禁品说明</h3>
                 <ul><li class="pt3 pb3 color_4c4c" v-for="info in forbidInfo">{{info}}</li></ul>
                 <p class="color_red tc pt20">如对违禁品信息有疑问，请联系蜂云客服。</p>
           </div>
        </div>

		<!--亚马逊标准 弹窗-->
        <div class="layer_window" v-show="normal_show">
           <div class="layout forbidLayout pt20 pb30 pl40 pr40">
                 <i class="el-icon-close f24 close_close color_gray cursor" @click="hide_tc_window(`normal_show`)"></i>
                 <div class="color_red tc f24 p10">
                     <div class="normal_title lh40 pl45">亚马逊货品标准</div>
                 </div>
                 <h3 class="tc f16 p5"> 您的货品请按照亚马逊要求填写 </h3>
                 <ul><li class="pt3 pb3 color_4c4c" v-for="info in amazonInfo">{{info}}</li></ul>
           </div>
        </div>

        <!--方案详情 弹窗-->
        <div class="layer_window" v-show="details_show">
            <div class="layout detailsLayout">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="hide_tc_window(`details_show`)"></i>
                <h2 class="tc color_green f18">渠道详情</h2>
                <div class="pt30 f16 color_3030">{{detailed_description}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import recommendItem from "@/components/recommendItem.vue"
    import region from "@/components/region.vue"
    import country from "@/components/country.vue"
    import { mapMutations } from "vuex"
    export default {
        name: "queryPrice",
        created(){
            // 显示头部、底部
            this.show_head_foot();

            // 显示对话框
			if(document.getElementById("newBridge")) {
                document.getElementById('newBridge').style.display = "block";
            }
            // 刷新页面
            this.fresh_page({index: 0,username: this.$wsCache.get("username")});
            // 获取 禁止的内容信息
            this.$http.get("/data/forbidInfo").then( response => {
                let data = response.data;
                if(data.status == 0){
                    this.forbidInfo = data.data;
                }
            });
            // 获取亚马逊标准规格信息
            this.$http.get("/data/amazonInfo").then( response => {
                let data = response.data;
                if(data.status == 0){
                    this.amazonInfo = data.data;
                }
            });
        },
        data(){
            return {
                show:true,                  // 推荐方案的 显示 / 隐藏
                forbid_show:false,          // 违禁品弹窗 显示 / 隐藏
                normal_show:false,          // 亚马逊标准弹框 显示 / 隐藏
                details_show:false,         // 订单详情弹窗 显示 / 隐藏
                region_show:false,          // 省市区 显示 / 隐藏
                country_show:false,         // 国家 显示 / 隐藏
                btn_dis:true,               // 询价按钮 是否 disabled
                myAddress:"",               // 我的地址
                countryName:"",             // 国家名称
                query_data:{                // 查询的数据对象
                    start_province:"",
                    start_citys:"",
                    start_district:"",
                    destination_country:"",
                    goods_class:"0",
                    goods_list:[{length:"",width:"",height:"",weight:"",numbers:""}]
                },
                getPlanData:[],             // 方案推荐的数据
                forbidInfo:[],              // 禁止的数据
                amazonInfo:[],              // 亚马逊的标准规格
                detailed_description:"",    //  方案的详情描述
                searchText : "",            // 立即查询的错误提示
                subscribeData : "",         // 邮箱
                subscribeError : false,     // 邮箱错误提示
                emailIsFalse : true,        // 邮箱重复提交
                subscribeStatus : 1,        // 邮箱订阅  1是显示订阅输入框，2是提示订阅的状态
                dataStatus : "",            // 订阅的状态,0是成功，不是0没有成功
                ubScribeText : ""           // 失败后的提示
            }
        },
        methods:{
            ...mapMutations([
                "fresh_page",
                "show_head_foot",
                "update_place_info",
                //"full_screen",
                "update_jump_type"
            ]),

            // 组件隐藏
            componentHidden(){
                this.region_show = false;   // 省市区组件隐藏
                this.country_show = false;  // 国家组件隐藏
            },

            // 传递数据 设置省市区的值
            pipeRegionData(data){
                this.myAddress = [data.proName,data.cityName,data.areaName].join(" ");
                this.query_data.start_province = data.proId;
                this.query_data.start_citys = data.cityId;
                this.query_data.start_district = data.areaId;
                this.region_show = data.flag;
                this.checkQueryData();   // 数据检测
            },

            // 传递数据 设置国家的值
            pipeCountryData(data){
                this.countryName = data.countryName;
                this.query_data.destination_country = data.countryCode;
                this.country_show = data.flag;
                this.checkQueryData();   // 数据检测
            },

            // 添加新的商品项
            addQueryItem(){
                let newItem = {length:"",width:"",height:"",weight:"",numbers:""};
                this.query_data.goods_list.push(newItem);
                this.checkQueryData();   // 检测数据
            },

            // 删除商品项
            delQueryItem(index){
                this.query_data.goods_list.splice(index, 1);
                this.checkQueryData();   // 检测数据
            },

            // 检测数据 判定 启用 or 禁用 询价按钮
            checkQueryData(){
                var total_num = 0, child_num = 0;
                for (let items of Object.values(this.query_data)) {
                    if (typeof items == "string") {
                        if (!items && items.length == 0) this.btn_dis = true;
                        else child_num++;
                        total_num++;
                    } else if(items instanceof Array) {
                        for (let item of items) {
                            for (let val of Object.values(item)) {
                                if (!val && val.length == 0) this.btn_dis = true;
                                else child_num++;
                                total_num++;
                            }
                        }
                    }
                }
                // 符合条件的数据的数量 与 总的检测的数量相等时  询价按钮 启用
                if(child_num != 0 && total_num == child_num) this.btn_dis = false;
                this.size_weight_normal(this.query_data);
            },

            // 获取 询价后的 推荐方案
            getGoodsInfo(){
                let param = Object.assign({},this.query_data);
                // let isFalse = this.size_weight_normal(param);
                // if(isFalse == 1){this.normal_show = true;return false;}
                this.$ajax.post("index.php?r=search/index",param,data => {
                    if(data.status == 0){
                        this.show = false;  // 介绍 隐藏 推荐方案列表显示
                        this.getPlanData = data.data;
                    }else if(data.status == 1){
                    	this.searchText = data.message;
                        console.log(data.message);
                    }
                });
            },

            // 填写有误时 清除数据 然后重新询价
            clearQueryData(){
                this.show = true;       // 平台优势 显示
                this.btn_dis = true;    // 询价按钮 禁用状态
                let len = this.query_data.goods_list.length;
                let new_arr = Array.apply(null,{length:len}).map(function () {
                                 return {length:"",width:"",height:"",weight:"",numbers:""};
                              });
                this.query_data = {
                    start_province:"",
                    start_citys:"",
                    start_district:"",
                    destination_country:"",
                    goods_class:"0",
                    goods_list:new_arr
                };
                this.myAddress = "";
                this.countryName = "";

                this.searchText = "";   // 错误清空
                // 调用子组件的 方法
                this.$refs["regionComponent"].resetData();  // 省市区 重置
                this.$refs["countryComponent"].resetData(); // 目的国家 重置
            },

            // 显示方案详情的弹窗显示
            showDetails(data){
                this.detailed_description = data.item.detailed_description;
                this.details_show = true;
            },

            // 立即下单
            goToPlaceOrder(data){
                let {pi_id,channel_id,channel_name,channel_type} = data.item;
                let address = this.myAddress;
                let country = this.countryName;

                // 若账户已登录  跳转到下单页面
                if(this.$wsCache.get("user_id")){
                    this.$router.push({path:"/placeOrder"});
                }
                // 若账户未登录  跳转到登录页面 进行登录或注册
                else {
                    this.$router.push("/login");
                    this.update_jump_type(1);
                }
                this.update_place_info({
                    pi_id,
                    channel_id,
                    channel_name,
                    channel_type,
                    address,
                    country,
                    ...this.query_data
                });
            },

            //立即订阅
            SubscribeBtn(){
                // 邮箱的正则表达式
            	let regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            	if(!this.subscribeData) return false;
            	if(!regex.test(this.subscribeData)){
            		this.subscribeError = true; return false;
            	}
            	if(this.emailIsFalse == false) return false;
            	this.emailIsFalse = false;
            	let param = {con_email:this.subscribeData, request:1};
                this.$ajax.post("index.php?r=search/index",param,data => {
                	this.subscribeStatus = 2;
                	this.emailIsFalse = true;
                    if(data.status == 0){
                        this.dataStatus = 0;
                    }else {
                    	this.ubScribeText = data.message;
                       this.dataStatus = 1;
                    }
                });
            },

            // 快捷下单
            nowPlaceOrder(){
                // 若账户已登录 跳转到下单页面
                if(this.$wsCache.get("user_id")){
                    this.$router.push({path:"/placeOrder"});
                }
                // 若账户未登录  跳转到登录页面 进行登录或注册
                else {
                    this.$router.push("/login");
                    this.update_jump_type(1);
                }
                this.update_place_info({
                    pi_id : "",
                    channel_id : "",
                    channel_name : "",
                    channel_type: "",
                    address: "",
                    country: "",
                    start_province:"",
                    start_citys:"",
                    start_district:"",
                    destination_country:"",
                    goods_class:"0",
                    goods_list:[
                        {length:"",width:"",height:"",weight:"",numbers:""}
                    ]
                });
            },

            // 亚马逊货品标准判断
            size_weight_normal(param){
                let flag = 0;
                param.goods_list.every( (item,i) => {
                    if(item.length > 120) {
                        flag = 1; this.searchText = `货品${i+1}: 长度超出亚马逊标准规格！`;
                    }
                    if(item.width > 120) {
                        flag = 1; this.searchText = `货品${i+1}: 宽度超出亚马逊标准规格！`;
                    }
                    if(item.height > 120) {
                        flag = 1; this.searchText = `货品${i+1}: 高度超出亚马逊标准规格！`;
                    }
                    if(item.weight > 30 ) {
                        flag = 1; this.searchText = `货品${i+1}: 重量超出亚马逊标准规格！`;
                    }
                    if((1*item.length)+(1*item.width)+(1*item.height) > 360) {
                        flag = 1; this.searchText = `货品${i+1}: 周长超出亚马逊标准规格！`;
                    }
                    return flag != 1;
                });
                flag == 0 && (this.searchText = "");
            },

            // 显示弹窗
            show_tc_window(key){
                this[key] = true;
                // this.full_screen(true);
            },
            // 显示弹窗
            hide_tc_window(key){
                this[key] = false;
                // this.full_screen(false);
            }
        },
        components: {recommendItem,region,country}
    }
</script>
