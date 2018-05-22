<style scoped>
    .uploaded{background:#d3e8ba;border:1px solid #99ce58;}
</style>
<template>
    <!--基本信息-->
    <div class="sender_receiver_container pb50">
        <!--发件人-->
        <div class="pt20 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">发件人</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">公司名称 : </div>
                    <div class="fl calc_80">{{order_info.company}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">联系人</span> : </div>
                    <div class="fl calc_80">{{order_info.contact_name}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">联系电话 :</div>
                    <div class="fl calc_80">{{order_info.contact_phone}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">取件地址 :</div>
                    <div class="fl calc_80">{{order_info.province}}/{{order_info.city}}/{{order_info.area}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">详细地址 :</div>
                    <div class="fl calc_80">{{order_info.address}}</div>
                </li>
            </ul>
        </div>

        <!--收件人-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">收件人</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <!--<li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">仓库名称 : </div>
                    <div class="fl calc_80">{{order_info.warehouse_name}}</div>
                </li>-->
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">仓库代码 : </div>
                    <div class="fl calc_80">{{order_info.fba_code}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">邮编</span> :</div>
                    <div class="fl calc_80">{{order_info.fba_postcode}}</div>
                </li>
                <li class="fl p_50 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">国家州市 :</div>
                    <div class="fl calc_80">
                        {{order_info.fba_country}}<i v-show="order_info.fba_province">/</i>
                        {{order_info.fba_province}}<i v-show="order_info.fba_city">/</i>
                        {{order_info.fba_city}}
                    </div>
                </li>
                <li class="fl p_100 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">详细地址 :</div>
                    <div class="fl calc_80">{{order_info.fba_address}}</div>
                </li>
            </ul>
        </div>

        <!--取件方式-->
        <!--<div class="pt15 pb5 bor_bot_dashed" v-if="order_info.pickup_type == 1">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">取件方式</i>
            </div>
            <ul class="f15 color_3030">
                <li class="clear_float pb10">
                    <div class="fl w_75 pr5 color_deep tr">上门取件 : </div>
                    <div class="fl calc_80 lh20 pl5 border_box">
                        请您保持联系方式的畅通，我们将会派人上门取件。
                    </div>
                </li>
                <li class="clear_float pb10" v-else>
                    <div class="fl w_75 pr5 color_deep tr">自己发货 : </div>
                    <div class="fl calc_80">
                        <ul>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">仓库地址 : </span>
                               {{ myself_address.rec_province + myself_address.rec_city + myself_address.rec_area + myself_address.rec_address}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr"><span class="justify3">收货人</span> : </span>
                                {{myself_address.pk_contact_name}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">联系电话 : </span>
                                {{myself_address.pk_contact_phone}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">工作时间 : </span>
                                工作日 9:00 -&#45;&#45; 17:00
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "basicInfo",
        props:["order_info","myself_address"]
    }
</script>
