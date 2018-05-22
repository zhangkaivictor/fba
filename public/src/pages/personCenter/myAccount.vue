<style scoped>
    .account_money{left:0;bottom:100px;text-shadow:1px 0 7px #30333c;}
    .Qr_code{width:202px;height:202px;border:1px dashed #99ce58;border-radius:10px;padding:30px;box-sizing:border-box;}
</style>

<template>
    <div class="my_account">
        <!--状态导航-->
        <div class="info_bar bor_bot_solid f15 color_3030">
            <div class="inline_block lh30 mr30 cursor pr" v-for="(item,index) in accountNavData"
                 :class="{active: item.flag}" @click="accountSwitch(index)">
                {{item.name}}
            </div>
        </div>

        <!--订单数据列表-->
        <div class="account_container">
            <!--账户余额-->
            <div class="pt40 pb50 account_balance" v-show="accountNavData[0].flag">
                <div class="my_money tc pr f0">
                    <img src="/src/assets/images/my_money.png" alt="我的金额">
                    <div class="account_money par color_green tc p_100">
                        <i class="f56 mr5"> &nbsp;{{account_balance}}</i>
                        <small class="f14" v-show="account_balance">元</small>
                    </div>
                </div>
                <div class="tc">
                    <el-button type="success" class="w_200 f16" @click="openAccountWindow">安全充值</el-button>
                </div>
            </div>
            <!--充值记录-->
            <top-up-record v-show="accountNavData[1].flag" :topUpData="topUpData"/>

            <!--支付记录-->
            <pay-record v-show="accountNavData[2].flag" :paymentData="paymentData"/>
        </div>

        <!--充值弹窗 第一步-->
        <tc_window v-show="tc_data.first_tc_show" :width="tc_data.width" title="安全充值" key="firstWidow" lastName="确定"
                   :haveBtn="tc_data.haveBtn"
                   :firstBtn="tc_data.haveFirstBtn"
                   @close_tc="tc_data.first_tc_show = false"
                   @operate="securityTopUp">
            <div class="tc_container pt20 pb5">
                <div class="clear_float mb10 pl5">
                    <div class="fl w_100 pr10 tr lh30">充值金额</div>
                    <div class="fl">
                        <el-input type="number" class="w_220" @focus="error_info=``"
                                  v-model="tc_data.account_amount" clearable></el-input>
                    </div>
                </div>
                <div class="clear_float mb10 pl5">
                    <div class="fl w_100 pr10 tr lh25">充值方式</div>
                    <div class="fl clear_float lh25">
                        <div class="fl payStyle" :class="{active:tc_data.pay_style == 2}"
                             @click="switch_pay_style(1)">
                            <img src="/src/assets/images/pic_alipay_h24.png" alt="支付宝">
                        </div>
                        <div class="fl payStyle" :class="{active:tc_data.pay_style == 3}"
                             @click="switch_pay_style(2)">
                            <img src="/src/assets/images/pic_wechat_pay_h24.png" alt="微信">
                        </div>
                         <div class="fl payStyle" :class="{active:tc_data.pay_style == 5}"
                             @click="switch_pay_style(3)">
                            <img src="/src/assets/images/unionpay.png" alt="银联支付">
                        </div>
                    </div>
                    <!--@click="switchBank(index,item.bankCode)"-->
                    <ul style="clear: both;" class="bankContainer clear_float pt20 pl25 bor_bot_slide" v-show="tc_data.pay_style == 5">
	                    <li class="fl payStyle p_25" v-for="(item,index) in bankCodeData"
	                        :class="{active:item.flag}" @click="switchBank(index,item.bankCode)">
	                        <img v-if="(index != 19 && index != 23)" :key="index" :src="`/src/assets/images/bank_${item.serialNumber}.jpg`">
	                        <img v-else :key="index" :src="`/src/assets/images/bank_${item.serialNumber}.png`">
	                    </li>
	                </ul>
                </div>
                <div class="error_info color_red tc lh30" v-show="error_info">{{error_info}}</div>
            </div>
        </tc_window>

        <!--扫码弹窗-->
         <tc_window width="400" v-show="tc_data.scan_tc_show" title="安全充值"
                   :haveBtn="!tc_data.haveBtn"
                   @close_tc="tc_data.scan_tc_show = false">
            <div class="tc_container pt20">
                <div class="mar_center f0 tc Qr_code">
                    <img :src="payImg" alt="支付宝二维码">
                </div>
                <div class="tc lh30 f15 color_3030 pt5">请使用扫码支付</div>
            </div>
            <div v-show="tc_data.scan_tc_failure" class="tc lh20 f18 color_3030 pt15 pb10">扫码支付失败！</div>
            <div v-show="tc_data.scan_tc_failure" class="tc lh20 color_deep pb30">请检查网络是否畅通或者稍后再试！</div>
        </tc_window>

        <!--充值成功 弹窗-->
        <tc_window v-show="tc_data.success_tc_show" width="360" title="安全充值"
                   :haveBtn="!tc_data.haveBtn"
                   @close_tc="tc_data.success_tc_show = false">
            <div class="tc_container pt20 pb20">
                <div class="f0 tc">
                    <img src="/src/assets/images/icon_success.png" alt="充值成功">
                </div>
                <div class="tc lh30 f18 color_3030 pt15 pb15">充值成功！</div>
            </div>
        </tc_window>

        <!--充值失败 弹窗-->
        <tc_window v-show="tc_data.fail_tc_show" width="360" title="安全充值" key="thirdWidow"
                   :haveBtn="!tc_data.haveBtn"
                   @close_tc="tc_data.fail_tc_show = false">
            <div class="tc_container pt20 pb20">
                <div class="f0 tc">
                    <img src="/src/assets/images/icon_failing.png" alt="充值失败">
                </div>
                <div class="tc lh20 f18 color_3030 pt15 pb5">充值失败！</div>
                <div class="tc lh20 color_deep pb15">请检查网络是否畅通或者稍后再试！</div>
            </div>
        </tc_window>

        <!--隐藏的表单数据-->
        <form action="https://upay.glbpay.com/upay/payment.aspx" method="post" id="formData" name="aspx" class="hide" target="_blank">
            <input type="text" name="bankcode" id="bankcode" ><!--银行编号-->
            <input type="text" name="deliveryaddress" id="deliveryaddress" ><!--收货人地址-->
            <input type="text" name="deliveryname" id="deliveryname"><!--收货人姓名-->
            <input type="text" name="merchantid" id="merchantid">
            <input type="text" name="orderdescription" id="orderdescription"><!--订单商品描述-->
            <input type="text" name="signature" id="signature">
            <input type="text" name="txnamount" id="txnamount"><!--订单金额-->
            <input type="text" name="txnbuyer" id="txnbuyer"><!--买方信息-->
            <input type="text" name="txncurrency" id="txncurrency"><!--交易币种-->
            <input type="text" name="txndatetime" id="txndatetime"><!--交易日期-->
            <input type="text" name="txnid" id="txnid"><!--商品订单号-->
            <input type="text" name="txnremark1" id="txnremark1"><!--订单备注1-->
            <input type="text" name="txnremark2" id="txnremark2"><!--订单备注2-->
            <input type="text" name="browserbackurl" value="http://www.beefba.com/public/template/payback.html"><!--浏览器返回地址-->
            <input type="text" name="s2sbackurl" value="http://www.beefba.com/index.php?r=site/pay-back"><!--服务器返回地址-->
            <input type="submit" id="submit_data" value="提交数据">
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import topUpRecord from "@/components/top_up_record.vue"
    import payRecord from "@/components/pay_record.vue"
    import tc_window from "@/components/tc_window.vue"
    import {mapMutations} from "vuex"
    require("../../assets/js/paymentjs.js");
    export default {
        name: "myAccount",
        created(){
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");
            this.fresh_per_page({index: 5});
            this.initData();
        },
        data(){
            return {
                accountNavData: [
                    {flag: true, name: "账户余额", navTitle: "allOrder"},
                    {flag: false, name: "充值记录", navTitle: "waitAudit"},
                    {flag: false, name: "支付记录", navTitle: "waitPay"}
                ],
                topUpData: [],
                paymentData: [],
                tc_data: {
                    first_tc_show: false,
                    haveBtn: true,
                    haveFirstBtn: false,
                    account_amount: "",                 // 充值的金额
                    pay_style: "2",
                    pay_type : "1" ,               // 1是支付宝、3是微信、2是银联
                    scan_tc_show: false,
                    success_tc_show: false,
                    fail_tc_show: false,
                    width : '530',
                    bank_code : '9997',
                    scan_tc_failure : '' //支付失败
                },
                account_balance: "",                  // 账户余额
                error_info: "",                        // 错误信息
                payImg : '',                                              //二维码
                bankCodeData: [
                    {bankCode:"01020000",serialNumber:"01",flag:true},      // 工商银行
                    {bankCode:"03080000",serialNumber:"02",flag:false},     // 招商银行
                    {bankCode:"01050000",serialNumber:"03",flag:false},     // 建设银行
                    {bankCode:"01030000",serialNumber:"04",flag:false},     // 农业银行
                    {bankCode:"01040000",serialNumber:"05",flag:false},     // 中国银行
                    {bankCode:"03030000",serialNumber:"06",flag:false},     // 中国光大银行
                    {bankCode:"03050000",serialNumber:"07",flag:false},     // 中国民生银行
                    {bankCode:"03010000",serialNumber:"08",flag:false},     // 交通银行
                    {bankCode:"03060000",serialNumber:"09",flag:false},     // 广发银行
                    {bankCode:"04012900",serialNumber:"10",flag:false},     // 上海银行
                    {bankCode:"03070000",serialNumber:"11",flag:false},     // 平安银行
                    {bankCode:"03100000",serialNumber:"12",flag:false},     // 上海浦东发展银行
                    {bankCode:"03020000",serialNumber:"13",flag:false},     // 中信银行
                    {bankCode:"01000000",serialNumber:"14",flag:false},     // 中国邮政储蓄银行
                    {bankCode:"03090000",serialNumber:"15",flag:false},     // 兴业银行
                    {bankCode:"03040000",serialNumber:"16",flag:false},     // 华夏银行
                    {bankCode:"04031000",serialNumber:"17",flag:false},     // 北京银行
                    {bankCode:"04083320",serialNumber:"18",flag:false},     // 宁波银行
                    {bankCode:"04341101",serialNumber:"19",flag:false},     // 天津银行
                    {bankCode:"03200000",serialNumber:"20",flag:false},     // 东亚银行
                    {bankCode:"03170000",serialNumber:"21",flag:false},     // 渤海银行
                    {bankCode:"65012900",serialNumber:"22",flag:false},     // 上海农商银行
                    {bankCode:"04243010",serialNumber:"23",flag:false},     // 南京银行
                    {bankCode:"04243010",serialNumber:"24",flag:false},     // 成都银行
                    {bankCode:"64296511",serialNumber:"25",flag:false}      // 徽商银行
                ]
            }
        },
        computed: {},
        methods: {
            ...mapMutations([
                "fresh_per_page"
            ]),
            // 数据初始化
            initData(){
                // 获取 账户余额
                this.$ajax.post("index.php?r=fba/fba/account-balance", {}, data => {
                    if (data.status == 0) {
                        this.account_balance = data.data;
                    }
                });
                // 获取 充值记录列表数据
                this.$ajax.post("index.php?r=fba/fba/account-list", {}, data => {
                    if (data.status == 0) {
                        this.topUpData = data.data;
                    }
                });
                // 获取 支付记录列表数据
                this.$ajax.post("index.php?r=fba/fba/paymark-list", {}, data => {
                    if (data.status == 0) {
                        this.paymentData = data.data;
                    }
                });
            },
            // tab切换
            accountSwitch(index){
                this.accountNavData.forEach(function (item, i) {
                    item.flag = i == index;
                });
            },
            // 打开 安全充值 弹窗
            openAccountWindow(){
                this.tc_data.first_tc_show = true;
                this.error_info = "";
            },
            // 跳转到 银行卡列表
            switch_pay_style(num){
                if (num == 1) {
                	this.tc_data.pay_style = 2;
                	this.tc_data.pay_type = 1;
                    this.tc_data.bank_code = "9997";
                    this.tc_data.width = 530;
                } else if (num == 2) {
                	this.tc_data.pay_style = 3;
                	this.tc_data.pay_type = 3;
                    this.tc_data.bank_code = "9998";
                    this.tc_data.width = 530;
                } else {
                    this.tc_data.pay_style = 5;
                    this.tc_data.pay_type = 2;
                    this.tc_data.width = 700;
                    this.tc_data.bank_code = this.bankCodeData[0].bankCode;
                    // 银行显示 复位
                    this.bankCodeData.forEach((item, i) => {
                        item.flag = i == 0;
                    });
                }
            },
            switchBank(index, code){//银联选择银行
                this.bankCodeData.forEach((item, i) => {
                    item.flag = i == index;
                });
                this.tc_data.bank_code = code;
                //console.log(this.bankCode);
            },
            // 安全充值 确定
            securityTopUp(){
                let {account_amount, pay_style, bank_code} = this.tc_data;
                if (!account_amount) {
                    this.error_info = "请输入充值的金额！";
                    return false
                }
                //console.log(this.tc_data.bank_code);
                //return false;

                this.$ajax.post("index.php?r=fba/fba/account-recharge",
                    {account_amount, pay_style, bank_code}, data => {
                    if (data.status == 0) {
                    	let data_data = data.data;
                        if(this.tc_data.bank_code.length == 4){
                            console.log("4444");
                        	this.payImg = data_data.content;
                            this.tc_data.first_tc_show = false;
                            this.tc_data.scan_tc_failure = false;
                            this.tc_data.scan_tc_show = true;
                            let start = setInterval(() => {
                                this.$ajax.post("index.php?r=fba/fba/pay-query",{
                                    txnid:data_data.txnid,
                                    type:this.tc_data.pay_type
                                },responseData => {
                                    console.log("5555");
                                    if(responseData.status == 100){
                                        clearInterval(start);
                                        this.tc_data.scan_tc_show = false;
                                        this.tc_data.success_tc_show = true;        // 支付成功 的部分显示

                                        // 刷新 数据 当前项的 支付按钮 隐藏
                                       	/*this.orderData.every((order) => {
                                            if(order.fba_waybill_id== param.fba_waybill_id){
                                                order.fba_paystatus = 2
                                            }
                                            return order.fba_waybill_id != param.fba_waybill_id;
                                        });*/
                                    }else if(responseData.status == 101){
                                    }else {
                                        clearInterval(start);
                                        this.tc_data.scan_tc_failure = true;
                                    }
                                })
                            },2000);
                        }
                        else if(this.tc_data.bank_code.length == 8){
                            console.log("6666");
                            this.tc_data.first_tc_show = false;
                            //this.$payment.createPayment(data_data.content, function(result, err) {
                            paymentjs.createPayment(data_data.content, function(result, err) {
                                console.log(result);
                                console.log(err.msg);
                                console.log(err.extra);
                            });
                            console.log("7777");
                            let start = setInterval(() => {
                                this.$ajax.post("index.php?r=fba/fba/pay-query",{
                                    txnid:data_data.txnid,
                                    type:this.tc_data.pay_type
                                },responseData => {
                                    if(responseData.status == 100){
                                        clearInterval(start);
                                        //this.tc_data.scan_tc_show = true;
                                        this.tc_data.success_tc_show = true;        // 支付成功 的部分显示

                                        // 刷新 数据 当前项的 支付按钮 隐藏
                                        /*this.orderData.every((order) => {
                                            if(order.fba_waybill_id== param.fba_waybill_id){
                                                order.fba_paystatus = 2
                                            }
                                            return order.fba_waybill_id != param.fba_waybill_id;
                                        });*/

                                    }else if(responseData.status == 101){
                                        console.log("请求中......")
                                    }else {
                                        clearInterval(start);
                                        this.tc_data.scan_tc_failure = true;        // 支付失败 的部分显示
                                    }
                                })
                            },2000);
                        }
                    }
                });
            }
        },
        components: {
            topUpRecord, payRecord, tc_window
        },
        watch: {}
    }
</script>
