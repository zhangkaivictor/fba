<style scoped>
    /*分割线背景*/
    .no_outline{outline:none;}
    .bg_deliver{background:url("/src/assets/images/divider_line.png") no-repeat left bottom;background-size:contain;}
    label.label_title{display:inline-block;width:75px;}
    .order_head{justify-content:space-evenly;}
    .order_head > *{height:60px;padding:30px 0;line-height:60px;}
    .order_head div{padding-left:70px;}
    .order_head div:first-of-type{background:url("/src/assets/images/order_01.png") no-repeat left 30px;}
    .order_head div:last-of-type{background:url("/src/assets/images/order_02.png") no-repeat left 30px;}
    .order_head div:last-of-type.active{background:url("/src/assets/images/order_22.png") no-repeat left 30px;color:#99ce58}

    .content_main{background:url("/src/assets/images/triangle.png") no-repeat left top;}
    .order_info_list li:nth-child(2n){padding-left:50px;}

    .goods_info_list>li{border:1px dashed #e4e4e4;}
    .goods_info_list li h3{height:50px;line-height:50px;}
    .suffix_con{height:32px;width:33px;vertical-align:middle;padding-left:3px;font-size:14px;line-height:32px;}
    .suffix_l{height:16px;width:33px;font-size:14px;line-height:16px;display:block;}
    .take_self_con p{width:70px;text-align:right;padding-right:5px;}
    .cost_card{background:url("/src/assets/images/estimate_cost_card.png") no-repeat left top;width:612px;height:206px;margin:0 auto;}

    .correct_person_list{height:240px;overflow-y:auto;overflow-x:hidden;}
    .correct_person_list li:hover .list_icon,
    .correct_person_list li.active .list_icon{
        background:url("/src/assets/images/btn_radio_on.png") no-repeat left center;
        background-size:15px;
    }
    .correct_person_list li:hover .list_con,
    .correct_person_list li.active .list_con{border:1px solid #99ce58;}
    .list_icon{
        cursor: pointer;left:-30px;top:50%;transform:translateY(-50%);
        width:15px;height:15px;background:url("/src/assets/images/btn_radio_off.png") no-repeat left center;
        background-size:15px;
    }
    .correct_person_list::-webkit-scrollbar{width:5px;}
    .correct_person_list::-webkit-scrollbar-track{background-color:#fff;}
    .correct_person_list::-webkit-scrollbar-thumb{background-color:#99ce58;}
    .correct_person_list::-webkit-scrollbar-thumb:hover{background-color:#b8b297;}
    .correct_person_list::-webkit-scrollbar-thumb:active{background-color:#99ce58;}
    table th{padding:8px 5px;border-bottom:1px solid #e4e4e4;}
    .storeCode{top:40px;left:0;z-index: 10;transition: all 1s;}
    .remind_con:hover .storeCode{display:block;}
</style>

<template>
    <div class="container" @click="componentHidden">
        <div class="inner"  >
            <div class="flex_wrapper order_head box_shadow mb20">
                <div class="f18 color_green">完善订单信息</div>
                <p><img src="/src/assets/images/trans_line.png" alt="状态过渡"></p>
                <div class="f18 color_deep" :class="{active: order_show_step == 1}">下单成功</div>
            </div>

            <div class="content_main order_main box_shadow pr">
                <!--完善订单信息-->
                <div class="order_info_container" v-show="order_show_step == 0">
                    <!--订单信息-->
                    <h2>订单信息</h2>
                    <ul class="clear_float pt40 pb40 bg_deliver">
                        <li class="fl p_50 mb15 pr">
                            <label class="w_75 inline_block"><i class="color_red"> * </i><span class="justify4">我的地址</span></label>
	                        <input type="text" class="input w_320 cursor" :class="{'focused_country':region_one_show}" v-model="orderData.address"
	                               @click.stop="region_one_show = true;" readonly>
	                        <region class="w_365 region_position" v-show="region_one_show" style="left:78px;"
	                                @pipeRegionData="pipeRegionDataFirst"></region>
                        </li>
                        <li class="fl p_50 mb15 border_box pl30 pr">
                            <label class="w_75 inline_block"><i class="color_red"> * </i><span class="justify4">目的国家</span></label>
	                        <input type="text" class="input w_320 cursor" :class="{'focused_country':country_show}" v-model="orderData.country"
	                               @click.stop="country_show = true;" readonly>
	                        <country v-show="country_show" style="left:108px;" @pipeCountryData="pipeCountryData"></country>
                        </li>
                        <li class="fl p_100 mb20">
                            <label class="w_70 tr inline_block mr5"><i class="color_red"> * </i>货品类别</label>
		                   	<el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="0" checked>普货</el-radio>
		                    <el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="1">带粉末</el-radio>
		                    <el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="2">带电</el-radio>
		                    <el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="3">不带电</el-radio>
		                    <el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="4">纺织品</el-radio>
		                    <el-radio name="goods_type" class="w_75" v-model="orderData.goods_class" label="5">液体</el-radio>
                        </li>
                    </ul>

                    <!--货品信息-->
                    <h2 class="pt40 pb40">货品信息</h2>
                    <div class="pb50 bg_deliver">
                        <ul class="goods_info_list">
                            <li class="mb20 pl40 pr40 f15 pr" v-for="(goods,index) in goodsData">
                                <!--删除商品项icon-->
                                <i v-if="index != 0" @click="delGoodsItem(index)"
                                   class="el-icon-close f24 close_close color_gray cursor"></i>
                                <h3 class="tc f15">货物{{index+1}}的信息</h3>
                                <ul class="clear_float">
                                    <li class="fl p_50 mb15">
                                        <label class="label_title"><i class="color_red"> * </i>中文名称 </label>
                                        <el-input class="w_280" v-model="goods.goods_chinese_name" placeholder="请填写商品中文名"></el-input>
                                    </li>
                                    <li class="fl p_50 mb15 border_box pl30">
                                        <label class="label_title"><i class="color_red"> * </i>英文名称 </label>
                                        <el-input class="w_280" v-model="goods.goods_english_name" placeholder="请填写商品英文名"></el-input>
                                    </li>
                                    <li class="fl p_50 mb15">
                                        <label class="label_title"><i class="color_red"> * </i>海关编码 </label>
                                        <el-input class="w_280" v-model="goods.custome_code" placeholder="10位海关编码"></el-input>
                                        <a class="unl color_green no_outline" href="http://www.hsbianma.com/" target="_blank">查询</a>
                                    </li>
                                    <li class="fl p_50 mb15 border_box pl30">
                                        <label class="label_title"><i class="color_red"> * </i>申报单价 </label>
                                        <el-input class="w_150" v-model="goods.cus_money" type="number" placeholder="单个商品价值">
                                            <!--<i slot="suffix" class="input_suffix pr5">元/个</i>-->
                                        </el-input>
                                        <el-select v-model="currencyValue" placeholder="请选择币种"
                                                   class="w_125 ver_top" :disabled="index != 0">
                                            <el-option v-for="item in currencyOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </li>
                                    <li class="fl p_100 mb20">
                                        <label class="label_title"><i class="color_red"> * </i>箱子规格 </label>

                                        <el-input class="w_75" v-model="goods.fba_length" type="number" @input="computedWeightVolume"></el-input><i class="inline_block suffix_con"><span class="suffix_l">长</span><span class="suffix_l">cm</span></i>

                                        <el-input class="w_75" v-model="goods.fba_width" type="number" @input="computedWeightVolume"></el-input><i class="inline_block suffix_con"><span class="suffix_l">宽</span><span class="suffix_l">cm</span></i>

                                        <el-input class="w_75" v-model="goods.fba_height" type="number" @input="computedWeightVolume"></el-input><i class="inline_block suffix_con"><span class="suffix_l">高</span><span class="suffix_l">cm</span></i>

                                        <el-input class="w_75" v-model="goods.fba_weight" type="number" @input="computedWeightVolume"></el-input><i class="inline_block suffix_con" style="width:48px;">kg/箱</i>

                                        <el-input class="w_75" v-model="goods.fba_num" type="number"></el-input><i class="inline_block suffix_con" style="width:48px;">个/箱</i>

                                        <el-input class="w_75" v-model="goods.fba_boxnum" type="number" @input="computedWeightVolume"></el-input><i class="inline_block suffix_con">箱</i>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="tc pb5">    <!--添加新的商品项icon-->
                            <i class="el-icon-circle-plus icon_icon add_icon" @click="addNewGoods"></i>
                        </div>
                        <div class="color_red lh25 tc f16 pt10" v-show="goods_standard_error">{{goods_standard_error}}</div>
                        <div class="border_dashed pl40 pr40 pt10 pb10 mt10">
                            <span class="ml5 mr30">实重: {{totalWeight}} kg</span>
                            <span class="mr40" v-if="pao_type == 1" key="paoOne">泡重: {{volume}} cm³ / 6000 = {{ (volume / 6000).toFixed(2) }} kg</span>
                            <span class="mr70" v-else key="paoTwo">泡重: {{volume}} cm³ / 5000 = {{ (volume / 5000).toFixed(2) }} kg</span>
                        </div>
                        <div class="mt20 tc color_red bg_stand f16 pb10">
                            <p class="lh20 pt10">计费重量为实重和泡重中最大,申报总价在800美金以下不收税 ！</p>
                        </div>
                    </div>

                    <!--预估费用-->
                    <h2 class="pt40 pb20">预估费用</h2>
                    <div class="pb50 bg_deliver f15">
                        <div class="cost_card tc">
                            <div class="pt40 clear_float">
                                <div class="fl tr p_45"><el-button type="success" class="w_100 f15" @click="selectChannelPlan">选择渠道</el-button></div>
                                <p class="fl p_50 border_box tl pl10 lh35">当前渠道 : <i class="color_green f16">{{orderData.channel_name}}</i></p>
                            </div>
                            <div class="clear_float pt20">
                                <div class="fl tr p_45"><el-button type="success" class="w_100 f15" @click="showOffer">显示报价</el-button></div>
                                <p class="fl p_50 border_box tl pl10 lh35">运费预计 : <i class="color_green f28 lh35">{{custom_price}}</i> 元</p>
                            </div>
                            <div class="color_deep pt10">实际费用可能会增加代缴税或服务费等，多退少补 ！</div>
                        </div>
                    </div>

                    <!--报关信息-->
                    <h2 class="pt40 pb20">报关信息</h2>
                    <div class="pb50 bg_deliver f15">
                        <div class="p_60 pt5 pb5 tc mar_center mb10 " style="border-radius:5px;">
                            <i class="inline_block mr10">报关单</i>
                            <el-button type="success" class="w_100 f13 mr5"
                                       :disabled="is_customs == 1"
                                        @click="downTemplate">下载</el-button>

                            <el-upload class="inline_block" name="file"
                                       action="123"
                                       :show-file-list="false"
                                       :before-upload="uploadBefore">
                                <el-button type="success" class="w_100 f13">上传</el-button>
                            </el-upload>

                        </div>
                        <div class="mt20 tc color_red bg_stand f16 pb10">
                            <p class="lh20 pt10">如果需要上传报关单的，请先下载模板，填好后再进行上传</p>
                        </div>
                    </div>

                    <!--发件人 && 亚马逊仓库-->
                    <div class="pb50 bg_deliver f15 pt40">
                        <ul class="clear_float">
                            <li class="fl p_48">
                                <h2 class="tl">发件人</h2>
                                <div class="lh40">
                                    <el-radio name="pickup_type" v-model="pickup_type" label="1" @change="changePickup">上门取件</el-radio>
                                    <el-radio name="pickup_type" v-model="pickup_type" label="2" @change="changePickup">自己发货</el-radio>
                                </div>
                                <div class="border_dashed border_box pt10 pb10 pl20 pr20">
                                    <ul>
                                        <li>
                                            <label class="label_title" style="visibility:hidden;"></label>
                                            <el-button type="success" class="w_150 f15 mt10 mb20" @click="selectSenderList">选择已有联系人</el-button>
                                            <el-button type="success" class="w_120 f15 mt10 mb20" @click="add_contact_show = true">新建联系人</el-button>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red" style="visibility: hidden"> * </i>公司名称
                                            <el-input class="w_280 ml5" v-model="senderPerson.companyName"  :disabled="true"></el-input>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red"> * </i><span class="justify3">联系人</span>
                                            <el-input class="w_280 ml5" v-model="senderPerson.contactPerson"  :disabled="true"></el-input>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red"> * </i>联系电话
                                            <el-input class="w_280 ml5" v-model="senderPerson.contactTel"  :disabled="true"></el-input>
                                        </li>
                                        <li class="mb10 pr">
                                            <i class="color_red"> * </i>取件地址
                                            <!--<input type="text" class="input w_280 ml5 cursor" :class="{focused_country:region_two_show}"
                                                   v-model="senderPerson.takeAddress"
                                                   @click.stop="region_two_show = true" :disabled="true">
                                            <region class="w_365 region_position" v-show="region_two_show" key="first"
                                                    @pipeRegionData="pipeRegionDataSecond"></region>-->
                                            <el-input class="w_280 ml5" v-model="senderPerson.takeAddress"  :disabled="true"></el-input>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red ver_top"> * </i><span class="inline_block ver_top">详细地址</span>
                                            <el-input class="w_280 ml5" v-model="senderPerson.detailAddress" type="textarea" :disabled="true"
                                                      autosize ></el-input>
                                        </li>
                                    </ul>
                                </div>
                                <!--<div class="border_dashed border_box pt10 pb10 pl20 pr20" v-show="pickup_type == 2" style="height:298px;">
                                    <div class="mb20 mt20">请尽快将货物发送到以下地址 : </div>
                                    <ul>
                                        <li class="clear_float mb10">
                                            <p class="fl color_deep">仓库地址 : </p>
                                            <div class="fl w_305">{{myself.detailAddress}}</div>
                                        </li>
                                        <li class="clear_float mb10">
                                            <p class="fl color_deep"><span class="justify3">收货人</span> : </p>
                                            <div class="fl w_305">{{myself.contactPerson}}</div>
                                        </li>
                                        <li class="clear_float mb10">
                                            <p class="fl color_deep">联系电话 : </p>
                                            <div class="fl w_305">{{myself.contactTel}}</div>
                                        </li>
                                        <li class="clear_float mb10">
                                            <p class="fl color_deep">工作时间 : </p>
                                            <div class="fl w_305">{{myself.time}}</div>
                                        </li>
                                    </ul>
                                </div>-->
                            </li>
                            <li class="fr p_48">
                                <h2 class="tl">亚马逊收件仓</h2>
                                <div class="lh40 ml20 color_red cursor f16 pr remind_con w_200">
                                    <div class="lh40">仓库代码提示</div>
                                    <div class="par storeCode hide">
                                        <img src="/src/assets/images/storeCodeRemind.png" alt="仓库代码提示">
                                    </div>
                                </div>
                                <div class="border_dashed border_box pt10 pb10 pl20 pr20" style="height:298px;">
                                    <ul>
                                        <li>
                                            <label class="label_title" style="visibility:hidden;"></label>
                                            <el-button type="success" class="w_150 f15 mt10 mb20" @click="selectStoreList">选择已有仓库</el-button>
                                            <el-button type="success" class="w_120 f15 mt10 mb20" @click="supplementaryMissingWarehouse">补充缺失仓库</el-button>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red"> * </i>仓库代码
                                            <!--<el-input class="w_280 ml5" v-model="amazonData.aStoreCode"></el-input>-->
                                            <el-input class="w_170 ml5 ver_top" v-model="amazonData.aStoreCode" clearable></el-input>
                                            <el-button type="success" @click="syncStoreInfo">同步仓库信息</el-button>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red"> * </i>国家州市
                                            <el-input class="w_280 ml5" v-model="amazonData.aCountryProvinceCity"
                                                      placeholder="国家、州、市之间用‘ / ’分隔" :disabled="true"></el-input>
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red"> * </i> <span class="justify2">邮编</span>
                                            <!--<el-input class="w_200" v-model="amazonData.aPostCode"></el-input>-->
                                            <el-input class="w_280 ml5" v-model="amazonData.aPostCode" :disabled="true"></el-input>
                                            <!--<el-button class="w_75"  plain>校验邮编</el-button>-->
                                        </li>
                                        <li class="mb10">
                                            <i class="color_red ver_top"> * </i><span class="inline_block ver_top">详细地址</span>
                                            <el-input class="w_280 ml5" type="textarea" :rows="3" v-model="amazonData.aDetailsAddress"
                                                     :disabled="true"></el-input>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div class="mt20 tc color_red bg_stand f16">
                            <p class="lh30 pt5">如果您填写的邮编为偏远地区，订单审核时客服会与您进行联系确认</p>
                            <p class="lh30 pb5">判定偏远判定以及收费标准，将按照供应商数据为准</p>
                        </div>
                    </div>

                    <!--订单备注-->
                    <h2 class="pt40 pb40">订单备注</h2>
                    <div class="order_remark bg_deliver pb40 f15">
                        <div>
                            <el-input type="textarea" :rows="4" v-model="orderNote"
                                      :maxlength="100" placeholder="请输入不多于100字的订单备注">
                            </el-input>
                        </div>
                        <div class="tr color_deep f14 pt5">
                            <span class="color_green">{{orderNote.length}}</span> / 100字以内
                        </div>
                    </div>

                    <!--同意使用用户协议-->
                    <div class="user_agreement_con pt40 tc">
                        <div class="lh40 f16">
                            <el-checkbox name="goods_type" v-model="agreement">&nbsp;</el-checkbox>
                            <span class="inline_block" style="margin-left:-12px;">
                                我已阅读且同意 <i class="color_green unl cursor">《蜂云平台使用协议》</i>
                            </span>
                        </div>
                        <div class="pt10">
                            <el-button class="w_200 f15" type="success" @click="sureSubmit" :disabled="!agreement">提交订单</el-button>
                        </div>
                    </div>
                </div>

                <!--下单成功-->
                <div class="place_order_success_container" v-show="order_show_step == 1">
                    <div class="place_order_success pt70 pb130 tc">
                        <div class="tc lh100"><img src="/src/assets/images/correct_icon.png"></div>
                        <div class="lh60 f18 color">提交成功，将有业务人员与您取得联系，请保持手机畅通 ！</div>
                        <div class="lh30 f16">订单号 : <i class="color_green">{{bee_id}}</i></div>
                        <!--<div class="lh30 unl color_green f16 cursor" @click="goToOrderDetailsPage(fba_waybill_id)">查看订单详情</div>-->
                        <div class="lh30 unl color_green f16 cursor" @click="goToMyOrderPage">查看我的订单</div>
                        <div class="lh60 f18 color hide">提交失败，请检查网络是否通畅或联系客服 ！</div>
                        <div class="pt20 pb50 hide">
                            <el-button type="danger" class="w_200 f16">再次提交</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--选择已有的发件人 弹窗-->
        <div class="layer_window" v-show="scp_show">
            <div class="layout sender_tc pl20 pr20 pb30" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="scp_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">选择已有联系人</div>
                <div class="lh20"></div>
                <ul class="pr30 pl30 f15 correct_person_list">
                    <li class="clear_float mb10" v-for="(item,index) in selectCorrectData" @click="operateCorrect(item)">
                        <div class="pr list_con w_400 border_gray_solid border_box ml30 cursor" style="border-radius:7px;">
                            <div class="par list_icon"></div>
                            <div class=" pt5 pl10 pb5">
                                <span class="mr10">{{item.contact_name}}</span>{{item.contact_phone}}</div>
                            <div class=" pb5 pl10 pb5">
                                {{Object.values(item.pro_ci_ar).join(" ")}}&nbsp;{{item.address}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--选择已有的亚马逊仓库的 弹窗-->
        <div class="layer_window" v-show="amazon_store_show">
            <div class="layout sender_tc pl20 pr20 pb30" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="amazon_store_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">选择亚马逊仓库</div>
                <div class="lh20"></div>
                <ul class="pr30 pl30 f15 correct_person_list">
                    <li class="clear_float mb10" v-for="(item,index) in amazonStoreData" @click="operateAmazon(item)">
                        <div class="pr list_con w_400 border_gray_solid border_box ml30 cursor" style="border-radius:7px;">
                            <div class="par list_icon"></div>
                            <div class=" pt5 pl10 pb5">
                                <span class="mr10">{{item.fba_code}}</span> {{item.fba_postcode}}
                            </div>
                            <div class=" pb5 pl10 pb5">
                                {{item.fba_country}} / {{item.fba_province}} / {{item.fba_city}}
                                &nbsp;&nbsp;{{item.fba_address}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--补充缺失仓库 弹窗-->
        <div class="layer_window" v-show="amazon_tc_show">
            <div class="layout sender_tc pl20 pr20 pb130" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="amazon_tc_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">补充缺失仓库</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i>仓库代码
                        <el-input v-model="amazon_edit.aStoreCode" class="w_300 pl5" clearable placeholder="请输入仓库代码"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i>国家州市
                        <el-input v-model="amazon_edit.aCountryProvinceCity" class="w_300 pl5" clearable placeholder="国家、州、市之间用 / 号分割"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red"> * </i><span class="justify2">邮编</span>
                        <el-input v-model="amazon_edit.aPostCode" class="w_300 pl5" clearable clearable placeholder="请输入邮编"></el-input>
                    </li>
                    <li class="mb10 pl20">
                        <i class="color_red ver_top"> * </i><span class="inline_block ver_top">详细地址</span>
                        <el-input type="textarea" autosize v-model="amazon_edit.aDetailsAddress" class="w_300 pl5" clearable placeholder="请输入详细住址"></el-input>
                    </li>
                </ul>
                <div class="operate_btn tc par pb45">
                    <el-button class="w_170 f16" plain @click="amazon_tc_show = false">取消</el-button>
                    <el-button class="w_170 f16" type="success" @click="sureModifyAmazon">确定</el-button>
                </div>
                <div class="color_red tc par tips">
                    <p class="lh20">客服人员将尽快联系您，并帮助您添加缺失仓库信息 ！</p>
                    <p class="lh20">【张先生  电话: 17365395878  微信: FBA339   QQ: 389028123 】</p>
                    <p class="lh20">【周先生  电话: 17365395818  微信: fbafyxz  QQ: 1462366700 】</p>
                </div>
            </div>
        </div>

        <!--新建联系人 弹窗-->
        <div class="layer_window" v-show="add_contact_show">
        	<div class="layout sender_tc pl20 pr20 pb100" style="width:540px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="add_contact_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">新建联系人</div>
                <div class="lh20"></div>
	        	<ul class="tc f15">
	                <li class="mb10">
	                    <i class="color_red" style="visibility: hidden;"> * </i><span class="justify4">公司名称</span>
	                    <el-input class="w_280 ml5" v-model="newCorrectPerson.company" ></el-input>
	                </li>
	                <li class="mb10">
	                    <i class="color_red"> * </i><span class="justify3">联系人</span>
	                    <el-input class="w_280 ml5" v-model="newCorrectPerson.contact_name" ></el-input>
	                </li>
	                <li class="mb10">
	                    <i class="color_red w_105"> * </i><span class="justify4">联系电话</span>
	                    <el-input class="w_280 ml5" v-model="newCorrectPerson.contact_phone" ></el-input>
	                </li>
	                <li class="mb10 pr">
	                    <i class="color_red "> * </i><span class="justify4">取件地址</span>
	                    <!--<el-input class="w_280" v-model="doorToDoor.takeAddress"></el-input>-->
	                    <input type="text" class="input w_280 ml5 cursor" :class="{focused_country:region_three_show}"
	                           v-model="newCorrectPerson.takeAddress"
	                           @click.stop="region_three_show = true" readonly>
	                    <region class="w_365 region_position" v-show="region_three_show" key="second" style="left:149px;top:-125px;"
	                            @pipeRegionData="pipeRegionDataThird"></region>
	                </li>
	                <li class="mb10">
                        <i class="color_red ver_top"> * </i><span class="justify4 ver_top">详细地址</span>
	                    <el-input type="textarea" autosize class="w_280 ml5"
	                              v-model="newCorrectPerson.address"  ></el-input>
	                </li>
	            </ul>
                <div class="error color_red tc lh25" v-show="create_correct_error_info">
                    {{create_correct_error_info}}
                </div>
                <div class="operate_btn tc par">
                    <el-button class="w_150 f16" plain @click="add_contact_show = false">取消</el-button>
                    <el-button class="w_150 f16" type="success" @click="create_new_correct">确定</el-button>
                </div>
            </div>
        </div>

        <!--选择渠道的 弹窗-->
        <div class="layer_window" v-show="channel_tc_show">
            <div class="layout sender_tc pl20 pr20 pb30 border_box" style="width:1040px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="channel_tc_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">推荐方案</div>
                <div class="lh20"></div>
                <table class="w_1000 tc" v-show="getPlanData.air_arr.length > 0">
                    <thead>
                        <tr>
                            <th>方案名称</th>
                            <th>参考时效</th>
                            <th>计费单价</th>
                            <th>运输方式</th>
                            <th>预计总价(含燃油)</th>
                            <th>下单</th>
                        </tr>
                    </thead>
                    <tbody>
                        <channel-item tag="tr" v-for="(item,index) in getPlanData.air_arr"
                                        :key="index"
                                        :item="item"
                                        :index="index"
                                        @showDetails="showDetails"
                                        @selectChannel="selectChannel">
                        </channel-item>
                    </tbody>
                </table>

                <table class="w_1000" v-show="getPlanData.sea_arr.length > 0">
                    <thead>
                        <tr>
                            <th>方案名称</th>
                            <th>参考时效</th>
                            <th>计费单价</th>
                            <th>运输方式</th>
                            <!--<th>稳定性</th>-->
                            <th>预计总价(含燃油)</th>
                            <th>下单</th>
                        </tr>
                    </thead>
                    <tbody>
                        <channel-item tag="tr" v-for="(item,index) in getPlanData.sea_arr"
                                        :key="index"
                                        :item="item"
                                        :index="index"
                                        @showDetails="showDetails"
                                        @selectChannel="selectChannel">
                        </channel-item>
                    </tbody>
                </table>
            </div>
        </div>

        <!--方案详情 弹窗-->
        <div class="layer_window" v-show="details_show">
            <div class="layout sender_tc pl20 pr20 pb30 border_box">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="details_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">渠道详情</div>
                <div class="lh20"></div>
                <div class="p30 f16 color_3030">{{detailed_description}}</div>
            </div>
        </div>

        <!--亚马逊标准 弹窗-->
        <div class="layer_window" v-show="normal_show">
            <div class="layout forbidLayout pt20 pb30 pl40 pr40">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="normal_show = false"></i>
                <div class="color_red tc f24 p10">
                    <div class="normal_title lh40 pl45">亚马逊货品标准</div>
                </div>
                <h3 class="tc f16 p5"> 您的货品请按照亚马逊要求填写 </h3>
                <ul><li class="pt3 pb3 color_4c4c" v-for="info in amazonInfo">{{info}}</li></ul>
            </div>
        </div>

        <!--信息提示型 弹窗-->
        <div class="layer_window" v-show="remind_tc_show">
            <div class="layout sender_tc pl20 pr20 pb30" style="width:400px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="remind_tc_show = false"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">提示信息</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="clear_float mb10 color_red tc">{{remind_info}}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import region from "@/components/region.vue"
    import country from "@/components/country.vue"
    import channelItem from "@/components/channelItem.vue"
    import { mapState,mapMutations } from "vuex"
    export default {
        name: "placeOrder",
        created(){
            // 判定是否已登录
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");

            // // 左客服隐藏
            if(document.getElementById("newBridge")) {
                document.getElementById('newBridge').style.display = "none";
            }
            // 右客服隐藏
            this.operate_customer(false);

            // 复制 传递进来的 下单的数据
            this.orderData = {...this.placeOrderInfo};

            // 循环 商品的数量信息
            this.placeOrderInfo.goods_list.forEach((item) => {
                this.goodsData.push({               // 货品信息数据
                    goods_chinese_name:"",          // 中文名
                    goods_english_name:"",          // 英文名
                    custome_code:"",                // 海关编码
                    cus_money:"",                   // 申报价值
                    fba_length:item.length,         // 长
                    fba_width:item.width,           // 宽
                    fba_height:item.height,         // 高
                    fba_weight:item.weight,         // 每箱的重量
                    fba_num:"",                     // 每箱的个数
                    fba_boxnum:item.numbers         // 箱的数量
                })
            });

            // 计算所有商品的实际的 总重量 总体积
            this.computedWeightVolume();

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
                order_show_step: "0",                // 订单信息显示
                region_one_show:false,              // 省市区弹窗显示  第一个
                region_two_show:false,              // 省市区弹窗显示  第二个
                region_three_show:false,            // 省市区弹窗显示  第三个
                country_show:false,                 // 目的国家显示
                order_region_show : false,          // 订单信息的我的地址  显示 / 隐藏
                remind_tc_show:false,               // 信息提示弹窗 显示 / 隐藏
                channel_tc_show:false,              // 选择渠道弹窗 显示 / 隐藏
                details_show:false,                 // 渠道详情 显示 / 隐藏
                amazon_store_show:false,            // 亚马逊仓库列表 显示 / 隐藏
                normal_show:false,                  // 亚马逊标准规格 显示 / 隐藏
                amazonInfo:[],
                detailed_description:"",             // 渠道详情信息
                orderData:{},                        // 订单的信息数据
                goodsData:[],                       // 货物的参数数据的集合
                goods_standard_error:"",
                currencyOptions:[
                    {value:"", label:"请选择币种"},
                    {value:"1",label:"美元"},
                    {value:"2",label:"人民币"},
                    {value:"3",label:"日元"},
                    {value:"4",label:"欧元"},
                    {value:"5",label:"英镑"},
                    {value:"6",label:"加元"},
                    {value:"7",label:"澳元"}
                ],
                currencyValue:"",
                volume:0,                   // 商品的总体积
                totalWeight:0,              // 商品的总重量
                custom_price: 0,            // 显示报价的 价格
                getPlanData:{
                    air_arr:[],
                    sea_arr:[]
                },
                check_sender: 0,            // 是否新增  1  已有联系人  0  新增联系人
                senderPerson:{
                    sender_id:"",           // 发件人 id
                    companyName:"",         // 联系公司
                    contactPerson:"",       // 联系人
                    contactTel:"",          // 联系电话
                    takeAddress:"",         // 取件地址
                    detailAddress:"",       // 详细地址
                    province:"",            // 省
                    city:"",                // 市
                    area:""                 // 区
                },

                pickup_type: "1",         // 发件人 radio之间的切换
                amazonTempData:{},          // 亚马逊 临时数据
                amazonData:{                // 亚马逊仓库的数据
                    check_warehouse: 1,     // 是否新增 1 已有亚马逊仓库  2 新增亚马逊仓库
                    amazon_id:"",           // 发件人 id
                    aStoreCode:"",          // 仓库代码
                    aCountryProvinceCity:"",// 国家州市
                    aPostCode:"",           // 邮政编码
                    aDetailsAddress:""      // 详细地址
                },

               /*myself:{
                	union_id: "",            // 取件入库 sender_id
                    contactPerson:"",        // 联系人
                    contactTel:"",           // 联系电话
                    detailAddress:"",        // 详细地址
                    time : "工作日 9:00 --- 17:00" //工作时间
                },*/
                orderNote:"",               // 订单备注

                agreement:true,             // 同意协议
                fba_waybill_id:"",
                bee_id:"",
                // 各个弹窗的显示与否
                scp_show:false,              // 已有联系人的弹窗的显示
                selectCorrectPerson:"0",     // 选择已有联系人的 radio
                selectCorrectData:[],

                add_contact_show : false,  // 新建联系人弹框
                // 创建新的联系人
                newCorrectPerson:{
                    company:"",             // 联系公司
                    contact_name:"",        // 联系人
                    contact_phone:"",       // 联系电话
                    takeAddress:"",         // 取件地址
                    address:"",             // 详细地址
                    province:"",            // 省
                    city:"",                // 市
                    area:""                 // 区
                },
                create_correct_error_info:"",
                amazon_tc_show:false,
                amazon_edit: {
                    aStoreCode:"",          // 仓库代码
                    aCountryProvinceCity:"",// 国家州市
                    aPostCode:"",           // 邮政编码
                    aDetailsAddress:""      // 详细地址
                },
                is_customs:1,
                cus_file:"",
                amazonStoreData:[],         // 亚马逊仓库的数据
                remind_info:""
            }
        },
        computed: {
            ...mapState([
                "placeOrderInfo"
            ]),
            pao_type(){
                switch(this.orderData.channel_type){
                    case "40":
                    case "50":
                    case "60":
                    case "70": return 0;
                    case "80": return 1;
                }
            }
        },
        methods: {
            ...mapMutations([
                "operate_customer"
            ]),
            // 关闭 省市区 和 国家的弹窗
            componentHidden(){
                this.region_one_show = false;
                this.region_two_show = false;
                this.region_three_show = false;
                this.country_show = false;
            },
            // 传递数据 设置国家的值
            pipeCountryData(data){
                this.orderData.country = data.countryName;
                this.orderData.destination_country = data.countryCode;
                this.country_show = data.flag;
            },
            // 传递数据 设置省市区的值
            pipeRegionDataFirst(data){
                this.orderData.address = [data.proName,data.cityName,data.areaName].join(" ");
                this.orderData.start_province = data.proId;
                this.orderData.start_citys = data.cityId;
                this.orderData.start_district = data.areaId;
                this.region_one_show = data.flag;
            },
            // 传递 发件人 省市区的 相关数据
            pipeRegionDataSecond(data){
                this.region_two_show = false;
                this.senderPerson.takeAddress = [data.proName,data.cityName,data.areaName].join(" ");
                this.senderPerson.province = data.proId;
                this.senderPerson.city = data.cityId;
                this.senderPerson.area = data.areaId;
                // this.check_sender = this.checkUpdate(this.senderTempData,this.senderPerson);
            },
            // 传递 新建联系人 省市区的 相关数据
            pipeRegionDataThird(data){
                this.region_three_show = false;
                this.newCorrectPerson.takeAddress = [data.proName,data.cityName,data.areaName].join(" ");
                this.newCorrectPerson.province = data.proId;
                this.newCorrectPerson.city = data.cityId;
                this.newCorrectPerson.area = data.areaId;
                // this.check_pickup = this.checkUpdate(this.doorTempData,this.doorToDoor);
            },
            // 添加新的商品
            addNewGoods(){
                let newGoodsItem = {
                    goods_chinese_name:"",          // 中文名
                    goods_english_name:"",          // 英文名
                    custome_code:"",                // 海关编码
                    cus_money:"",                   // 申报价值
                    fba_length:"",                  // 长
                    fba_width:"",                   // 宽
                    fba_height:"",                  // 高
                    fba_weight:"",                  // 每箱的重量
                    fba_num:"",                     // 每箱的个数
                    fba_boxnum:""                   // 箱的数量
                };
                this.goodsData.push(newGoodsItem);
            },
            // 删除已有的商品
            delGoodsItem(index){
                this.goodsData.splice(index,1);
                // 重新计算商品的 volume weight
                this.computedWeightVolume();
            },
            // 计算所有商品的实际的 总重量 总体积
            computedWeightVolume(){
                let weight = 0,volume = 0;
                this.goodsData.forEach((item) => {
                    if(item.fba_weight && item.fba_boxnum){
                        weight += item.fba_weight * item.fba_boxnum;
                    }
                    if(item.fba_length && item.fba_width && item.fba_height && item.fba_boxnum){
                        volume += item.fba_length * item.fba_width * item.fba_height * item.fba_boxnum;
                    }
                });
                this.totalWeight = weight;  // 总重量
                this.volume = volume;       // 总体积

                let flag = 0;
                this.goodsData.every( (item,i) => {
                    if(item.fba_length > 120) {
                        flag = 1; this.goods_standard_error = `货品${i+1}: 长度超出亚马逊标准规格！`;
                    }
                    if(item.fba_width > 120) {
                        flag = 1; this.goods_standard_error = `货品${i+1}: 宽度超出亚马逊标准规格！`;
                    }
                    if(item.fba_height > 120) {
                        flag = 1; this.goods_standard_error = `货品${i+1}: 高度超出亚马逊标准规格！`;
                    }
                    if(item.fba_weight > 30 ) {
                        flag = 1; this.goods_standard_error = `货品${i+1}: 重量超出亚马逊标准规格！`;
                    }
                    if((1*item.fba_length)+(1*item.fba_width)+(1*item.fba_height) > 360) {
                        flag = 1; this.goods_standard_error = `货品${i+1}: 周长超出亚马逊标准规格！`;
                    }
                    return flag != 1;
                });
                flag == 0 && ( this.goods_standard_error = "" );
            },
            // 获取 发件人数据
            selectSenderList(){
                this.scp_show = true;
                this.$ajax.post("index.php?r=fba/fba/sender-managent",{}, data => {
                    if(data.status == 0){
                        this.selectCorrectData = data.data;
                    }
                });
            },
            // 选择 已有联系人列表
            operateCorrect(item){
                this.senderPerson = {
                    sender_id :item.sender_id,              // 发件人 id
                    companyName:item.company,               // 联系公司
                    contactPerson: item.contact_name,       // 联系人
                    contactTel: item.contact_phone,         // 联系电话
                    takeAddress:Object.values(item.pro_ci_ar).join(" "), // 取件地址
                    detailAddress: item.address,             // 详细地址
                    province:item.province,
                    city:item.city,
                    area:item.area
                };
                this.scp_show = false;
            },
            // 检测 发件人是否更新
            checkSenderUpdate(){
                this.check_sender = this.checkUpdate(this.senderTempData,this.senderPerson);
            },
            // 检测数据 是否更新
            checkUpdate(temp,data){
                let flag = Object.keys(data).every((key) => {
                    return temp[key] == data[key]
                });
                return flag ? 1 : 0;
            },
            // 同步仓库信息
            syncStoreInfo(){
                let param = {fba_code:this.amazonData.aStoreCode};
                this.$ajax.post("index.php?r=fba/fba/syncaws-warehouse",param, data => {
                    if(data.status == 0){
                        let d = data.data;
                        this.amazonData.aCountryProvinceCity = [d.fba_country,d.fba_province,d.fba_city].join(" / ");
                        this.amazonData.aPostCode = d.fba_postcode;
                        this.amazonData.aDetailsAddress = d.fba_address;
                        this.amazonData.amazon_id = d.fbacode_id;
                        this.amazonData.check_warehouse = 1;
                    }else if(data.status == 1){
                        this.remind_tc_show = true;
                        this.remind_info = data.message;
                    }else {
                        this.remind_tc_show = true;
                        this.remind_info = `权限不足,请设置权限！`;
                    }
                });
            },
            // 显示报价
            showOffer(){
                let param = {
                    pi_id:this.orderData.pi_id,
                    channel_id:this.orderData.channel_id,
                    destination_country:this.orderData.destination_country,
                    channel_type:this.orderData.channel_type,
                    customs_list:[...this.goodsData],
                    request:1
                };
                if(!param.destination_country){
                    this.remind_tc_show = true;
                    this.remind_info = `请选择当前订单下的目的国家！`;
                    return false;
                }
                if(!this.currencyValue){
                    this.remind_tc_show = true;
                    this.remind_info = `货品信息: 请选择申报价值的币种！`;
                    return false;
                }
                let goods_flag = this.checkGoods();
                if(goods_flag == 1) return false;
                if(!param.pi_id){
                    this.remind_tc_show = true;
                    this.remind_info = `请选择当前订单下的渠道类型 ！`;
                    return false;
                }
                this.$ajax.post("index.php?r=search/place-order",param,data => {
                    if(data.status == 0){
                        this.custom_price = data.data.custom_price;
                    }else {
                        this.remind_tc_show = true;
                        this.remind_info = data.message;
                    }
                });
            },
            // 货品的检测
            checkGoods(){
                // let hs_reg = /^\d{4,10}$/;  // 海关编码的正则表达式
                let goods_problem = ["中文名称","英文名称","海关编码","申报价值",
                    "长","宽","高","每箱的重量","每箱包含的物品的数量","箱子的数量"];
                let goods_flag = 0;
                this.goodsData.forEach( (item,i) => {
                    Object.values(item).every( (value, index) => {
                        if(!value){
                            goods_flag = 1;
                            this.remind_tc_show = true;
                            this.remind_info = `货物 ${i+1}: ${goods_problem[index]} 不能为空！`;
                        }else{
                            /*if(index == 2){
                                if(!hs_reg.test(value)){
                                    goods_flag = 1;
                                    this.remind_tc_show = true;
                                    this.remind_info = `货物 ${i+1}: 请输入格式正确的海关编码！`;
                                }
                            }*/
                        }
                        return !!value && !goods_flag;
                    });
                });
                return goods_flag;
            },
            // 发件人的检测
            checkSender(){
                // let tel_reg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[3|4|5|7|8][0-9]{9}$)/; // 联系电话的正则表达式
                // let tel_reg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0?1[3|4|5|7|8][0-9]{9}$)/; // 联系电话的正则表达式
                let sender_problem = ["联系人","联系电话","取件地址","详细地址"];
                let sender_flag = 0;
                Object.values(this.senderPerson).slice(2,6).every((value,index) => {
                    if(!value){
                        sender_flag = 1;
                        this.remind_tc_show = true;
                        this.remind_info = `发件人: ${sender_problem[index]} 不能为空！`;
                    }else {
                        /*if(index == 1){
                            if(!tel_reg.test(value)){
                                sender_flag = 1;
                                this.remind_tc_show = true;
                                this.remind_info = `发件人: 请输入格式正确的联系电话 ！`;
                            }
                        }*/
                    }
                    return !!value && !sender_flag;
                });
                return sender_flag;
            },
            // 改变发件人的状态
            changePickup(){
                // 重置发件人的数据
                Object.keys(this.senderPerson).forEach( key => { this.senderPerson[key] = "" });
            },
            // 亚马逊仓库的检测
            checkAmazon(){
                let post_code_reg = /^[1-9][0-9]{5}$/;  // 邮编的正则表达式
                let amazon_problem = ["仓库代码","国家","州","市","邮编","地址"];
                let amazon_flag = 0;
                let {aStoreCode,aPostCode,aDetailsAddress} = this.amazonData;
                let [country,province,city] = this.amazonData.aCountryProvinceCity.split("/");
                let amazon = {
                    aStoreCode,country,province,city,aPostCode,aDetailsAddress
                };
                Object.values(amazon).every((value,index) => {
                    if(!value){
                        amazon_flag = 1;
                        this.remind_tc_show = true;
                        this.remind_info = `亚马逊仓库: ${amazon_problem[index]} 不能为空！`;
                    }else {
                        if(index == 4){
                            if(!post_code_reg.test(value)){
                                amazon_flag = 1;
                                this.remind_tc_show = true;
                                this.remind_info = `亚马逊仓库: 请输入格式正确的邮政编码 ！`;
                            }
                        }
                    }
                    return !!value && !amazon_flag;
                });
                return amazon_flag;
            },
            // 创建新的联系人
            create_new_correct(){
                let param = { ...this.newCorrectPerson };
                delete param["takeAddress"];
                if(!param.company){this.create_correct_error_info = "公司名称不能为空";return false}
                if(!param.contact_name){this.create_correct_error_info = "联系人不能为空";return false}
                if(!param.contact_phone){this.create_correct_error_info = "联系电话不能为空";return false}
                if(!param.province){this.create_correct_error_info = "省不能为空";return false}
                if(!param.city){this.create_correct_error_info = "市不能为空";return false}
                if(!param.area){this.create_correct_error_info = "区不能为空";return false}
                if(!param.address){this.create_correct_error_info = "详细地址不能为空";return false}
                // console.log(param);
                this.$ajax.post("index.php?r=fba/fba/add-sender",param, data => {
                    if(data.status == 0){
                        this.senderPerson.sender_id = data.data.sender_id;
                        this.senderPerson.companyName = this.newCorrectPerson.company;
                        this.senderPerson.contactPerson = this.newCorrectPerson.contact_name;
                        this.senderPerson.contactTel = this.newCorrectPerson.contact_phone;
                        this.senderPerson.takeAddress = this.newCorrectPerson.takeAddress;
                        this.senderPerson.detailAddress = this.newCorrectPerson.address;
                        this.senderPerson.province = this.newCorrectPerson.province;
                        this.senderPerson.city = this.newCorrectPerson.city;
                        this.senderPerson.area = this.newCorrectPerson.area;
                        this.add_contact_show = false;
                        Object.keys(this.newCorrectPerson).forEach( key => {
                            this.newCorrectPerson[key] = "";
                        });
                    }else{
                        this.remind_tc_show = true;
                        this.remind_info = data.message;
                    }
                });
            },
            // 打开 补充缺失仓库 的弹窗
            supplementaryMissingWarehouse(){
                this.amazon_tc_show = true;
                this.amazon_edit = {
                    aStoreCode:"",          // 仓库代码
                    aCountryProvinceCity:"",// 国家州市
                    aPostCode:"",           // 邮政编码
                    aDetailsAddress:""      // 详细地址
                };
            },
            // 补充缺失仓库 确定按钮
            sureModifyAmazon(){
                let sender_problem = ["仓库代码","国家","州","市","邮编","详细地址"];
                let sender_flag = 0;
                [
                    this.amazon_edit.aStoreCode,                        // 仓库代码
                    ...this.amazon_edit.aCountryProvinceCity.split("/"),// 国家州市
                    this.amazon_edit.aPostCode,                         // 邮政编码
                    this.amazon_edit.aDetailsAddress                    // 详细地址
                ].every((value,index) => {
                    if(!value){
                        sender_flag = 1;
                        this.remind_tc_show = true;
                        this.remind_info = `补充缺失仓库: ${sender_problem[index]} 不能为空！`;
                    }
                    return !!value;
                });
                if(sender_flag == 0){
                    this.amazonData = {
                        check_warehouse: 2,     // 是否新增 1 已有亚马逊仓库  2 新增亚马逊仓库
                        amazon_id:"",           // 发件人 id
                        ...this.amazon_edit
                    };
                    // console.log(this.amazonData);
                    this.amazon_tc_show = false;
                }
            },
            // 选择渠道方案
            selectChannelPlan(){
                let {start_province,start_citys,start_district,destination_country,goods_class} = this.orderData;
                let param = {start_province,start_citys,start_district,destination_country,goods_class};
                param.goods_list = this.goodsData.map((item) => {
                    return {
                        length:item.fba_length,
                        width:item.fba_width,
                        height:item.fba_height,
                        weight:item.fba_weight,
                        numbers:item.fba_boxnum
                    }
                });
                if(!param.start_province){
                    this.remind_tc_show = true;
                    this.remind_info = "我的地址不能为空！";
                    return false
                }
                if(!param.destination_country){
                    this.remind_tc_show = true;
                    this.remind_info = "目的国家不能为空！";
                    return false
                }
                if(!this.currencyValue){
                    this.remind_tc_show = true;
                    this.remind_info = `货品信息: 请选择申报价值的币种！`;
                    return false;
                }
                let goods_flag = this.checkGoods();
                if(goods_flag == 1) return false;

                this.$ajax.post("index.php?r=search/index",param,data => {
                    if(data.status == 0){
                        this.channel_tc_show = true;  // 介绍 隐藏 推荐方案列表显示
                        this.getPlanData = data.data;
                    }else if(data.status == 1){
                        this.remind_tc_show = true;
                        this.remind_info = data.message;
                    }
                });
            },
            // 显示渠道详情
            showDetails(data){
                // 显示方案详情的弹窗显示
                this.detailed_description = data.item.detailed_description;
                this.details_show = true;
            },
            // 选择渠道的操作
            selectChannel(data){
                let item = data.item;
                this.orderData.pi_id = item.pi_id;
                this.orderData.channel_id = item.channel_id;
                this.orderData.channel_name = item.channel_name;
                this.orderData.channel_type = item.channel_type;
                this.is_customs = item.is_customs;
                this.channel_tc_show = false;
                // 显示报价
                this.showOffer();
            },
            // 获取仓库的列表数据
            selectStoreList(){
                this.$ajax.post("index.php?r=fba/fba/warehouse-managent",{}, data => {
                    if(data.status == 0){
                        this.amazon_store_show = true;
                        this.amazonStoreData = data.data;
                    }
                });
            },
            // 操作 选择亚马逊的 仓库
            operateAmazon(item){
                this.amazonData = {
                    check_warehouse: 1,                         // 是否新增 1 已有亚马逊仓库  2 新增亚马逊仓库
                    amazon_id : item.fbacode_id,                // 仓库id
                    aStoreCode:item.fba_code,                   // 仓库代码
                    aCountryProvinceCity:[item.fba_country,item.fba_province,item.fba_city].join(" / "), // 国家州市
                    aPostCode:item.fba_postcode,                   // 邮政编码
                    aDetailsAddress:item.fba_address      // 详细地址
                };
                this.amazon_store_show = false;
            },
            // 跳转到 订单详情页面
            goToOrderDetailsPage(fba_waybill_id){
                this.$router.push({path:"/orderDetails",query:{fba_waybill_id}});
            },
            // 跳转到 个人中心的 我的订单页面
            goToMyOrderPage(){
                this.$router.push("/personCenter");
            },
            // 确认提交订单
            sureSubmit(){
                let param = {
                    pi_id:this.orderData.pi_id,
                    channel_id:this.orderData.channel_id,
                    destination_country:this.orderData.destination_country,
                    start_province:this.orderData.start_province,
                    start_citys:this.orderData.start_citys,
                    start_district:this.orderData.start_district,
                    goods_class:this.orderData.goods_class,
                    channel_type:this.orderData.channel_type,
                    customs_list:[...this.goodsData],
                    money_type:this.currencyValue,                      // 货币单位
                    pickup_type:this.pickup_type,
                    sender_id:this.senderPerson.sender_id,
                    check_warehouse:this.amazonData.check_warehouse,     // 仓库是否是 新增的  1 已有 2 新增
                    cus_file:this.cus_file
                };
                if(!param.channel_id){
                    this.remind_tc_show = true;
                    this.remind_info = `请选择该订单的渠道类型`;
                    return false;
                }
                // 检测货物
                let goods_flag = this.checkGoods();
                if(goods_flag == 1) return false;
                if(!this.currencyValue){
                    this.remind_tc_show = true;
                    this.remind_info = `货物 : 请选择申报价值的币种！`;
                    return false;
                }

                // 检测发件人
                let sender_flag = this.checkSender();
                if(sender_flag == 1) return false;

                // 检测亚马逊仓库
                if(param.check_warehouse){
                    if(param.check_warehouse == 1){
                        param.fbacode_id = this.amazonData.amazon_id;
                    }else if(param.check_warehouse == 2){
                        let amazon_flag = this.checkAmazon();
                        if(amazon_flag == 1) return false;
                        param.fba_code = this.amazonData.aStoreCode;
                        param.post_code = this.amazonData.aPostCode;
                        [
                            param.fba_country,
                            param.fba_province,
                            param.fba_city
                        ] = this.amazonData.aCountryProvinceCity.split("/");
                        param.fba_address = this.amazonData.aDetailsAddress;
                    }
                }else {
                    this.remind_tc_show = true;
                    this.remind_info = "请执行仓库信息的操作！";
                }

                // 订单备注
                param.mark = this.orderNote;

                let formData = new FormData();
                Object.keys(param).forEach( key => {
                    if(key == "customs_list"){
                        // formData.append()方法无法添加对象或者数组,只能添加字符串
                        // 因此把对象数组的各个对象的value值逐条插入到formData里
                        param[key].forEach((goods,i) => {
                            Object.keys(goods).forEach( k => {
                                formData.append("customs_list["+ i +"]["+ k +"]",goods[k]);
                            })
                        });
                    }else {
                        formData.append(key,param[key]);
                    }
                });
                this.$http({
                    method: "POST",
                    url: "index.php?r=search/place-order",
                    data: formData,
                    timeout: 8000,
                    baseURL: rootURL,
                    withCredentials: true
                }).then((res) => {
                    let data = res.data;
                    if (data.status == 0) {
                        this.order_show_step = "1";
                        this.fba_waybill_id = data.data.fba_waybill_id;
                        this.bee_id = data.data.bee_id;
                        window.scrollTo(0, 0);
                    }else {
                        this.$message({message: data.message, type: "warning"});
                    }
                });
            },
            uploadBefore(file) {
                let suffix = file.name.substring(file.name.lastIndexOf(".") + 1);
                if (!/xls|xlsm|xlsx|xlt/.test(suffix)) {
                    this.$message({message: "上传文件只能是 excel 格式的文档 !", type: "warning"});
                } else {
                    this.cus_file = file;
                }
                return true;
            },
            // 下载报关单模板
            downTemplate(){
                let query = "index.php?r=fba/fba/download-customs&channel_id=" + this.orderData.channel_id;
                window.location.href = rootURL + query;
            }
        },
        components: {region,country,channelItem},
        filters:{
            filter_class(param){
                switch (param){
                    case "0" : return "普货";
                    case "1" : return "带粉末";
                    case "2" : return "带电";
                    case "3" : return "不带电";
                    case "4" : return "纺织品";
                    case "5" : return "液体";
                    default :  return ""
                }
            }
        }
    }
</script>
