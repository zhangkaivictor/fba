<style scoped>
    .el-button--small{padding:6px 16px;font-size:14px;border-radius:15px;
        box-shadow:0 2px 3px 3px rgba(0,0,0,0.12)}
    .time_line_list{display:flex;flex-flow:column-reverse wrap;}
    .time_line_list li div:first-child:before{
        content:"";display:block;width:8px;height:8px;border-radius:5px;background:#e4e4e4;position:absolute;
        right:-3px;top:11px;z-index:-9;
    }
    .time_line_list li div:first-child:after{
        content:"";display:block;width:2px;height:55px;background:#e4e4e4;position:absolute;
        right:0;top:14px;
    }
    .time_line_list li div.active{color:#99ce58;}
    .time_line_list li div.active:before{
        content:"";display:block;width:12px;height:12px;border-radius:7px;background:#99ce58;position:absolute;
        right:-5px;top:10px;z-index:1;
    }
    .time_line_list li div.first_step:after{    /* 时间线的 第一步的竖线隐藏 */
        content:"";display:block;width:0;height:0;visibility:hidden;
    }
</style>

<template>
    <!--时间线-->
    <div class="time_line pt30 pb10">
        <ul class="time_line_list f15 color_3030">
            <li class="clear_float lh30" v-for="(item,index) in logisticsList" :class="{pb25:index != 0}">
                <div class=" fl w_180 color_deep mr40 pr"
                     :class="{first_step: index == 0, active: index == (logisticsList.length - 1)}">
                    {{item.operate_time}}
                </div>
                <div class="fl calc_220">
                    <i class="inline_block">{{item.operate_content}}</i>
                    <el-button v-if="item.operate_content == '待支付'"
                               v-show="!already_pay"
                               type="success" class="ml10"
                               @click="openPayWindow(item.fba_waybill_id)">支付
                    </el-button>
                    <el-button v-if=" index == 1
                                      && order_info.pickup_type == 2
                                      && !order_info.express_company
                                      && !order_info.express_number
                                      || item.operate_content == '商户发货'"
                               type="success" class="ml10"
                               @click="shipment(item.fba_waybill_id)">发货
                    </el-button>
                   <!-- <el-button type="success" class="ml10" @click="openPayWindow">付款</el-button>
                    <span class="inline_block ml10 color_red">预估费用 ￥1560</span>-->
                </div>
            </li>
            <!--<li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">
                    <i class="inline_block">补差价</i>
                    <el-button type="success" class="ml10" @click="openPayWindow">付款</el-button>
                    <span class="inline_block ml10 color_deep">( 重量差值 : 3kg )</span>
                    <span class="inline_block ml10 color_red">差价费用 ￥100</span>
                </div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">
                    <i class="inline_block">商户发货</i>
                    <el-button type="primary" class="ml10" @click="tc_data.delivery_show = true">发货</el-button>
                </div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:38:10</div>
                <div class="fl calc_220">承运商发货</div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">运输中 <span class="ml10">抵达目的国港口</span></div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">
                    <i class="inline_block">补差价</i>
                    <el-button type="success" class="ml10" @click="openPayWindow">付款</el-button>
                    <span class="inline_block ml10 color_deep">( 税差价 )</span>
                    <span class="inline_block ml10 color_red">差价费用 ￥100</span>
                </div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">已妥投</div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">未妥投</div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">退款中</div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr">2017.11.09 22:54:29</div>
                <div class="fl calc_220">已退款</div>
            </li>
            <li class="clear_float lh30 pb25">
                <div class="fl w_180 color_deep mr40 pr active">2017.11.09 22:54:29</div>
                <div class="fl calc_220">已取消 <i class="color_red ml10 cursor">请致电客户</i></div>
            </li>-->
        </ul>

        <!-- 付款 弹窗 第一步-->
        <tc_window v-show="tc_data.show" width="450" title="付款" key="firstWidow" :lastName="tc_data.lastName"
                   :haveBtn="tc_data.haveBtn"
                   :firstBtn="tc_data.firstBtn"
                   @close_tc="tc_data.show = false"
                   @operate="goToNextStep">
            <div class="tc_container pt20">
                <table class="p_100 tc">
                    <thead>
                    <tr>
                        <th>订单号</th>
                        <!--<th v-if="orderListType == 1">原因</th>-->
                        <th>订单金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in orderListData">
                        <td>{{item.bee_id}}</td>
                        <!--<td v-if="orderListType == 1">{{item.reason}}</td>-->
                        <!--<td v-if="orderListType == 1">{{item.bill_money}}</td>-->
                        <!--<td v-if="orderListType == 0">{{item.price}}</td>-->
                        <td>{{item.price}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="clear_float pt15 pl20 pb5 lh20">
                    <div class="fl">
                        <el-checkbox v-model="tc_data.checked"></el-checkbox>
                        <span class="inline_block">余额支付</span>
                        （<i class="inline_block color_green">￥{{account_balance}}</i>）
                    </div>
                    <div class="fr"> - ￥{{deduct_amount}}</div>
                </div>
                <div class="clear_float pt10 pl20 pb10 lh20 border_green">
                    <div class="fl">
                        <el-checkbox v-model="tc_data.online_pay"></el-checkbox>
                        <span class="inline_block">在线支付</span>
                    </div>
                </div>
                <div class="clear_float pt15 pl20 pb25 lh20 ">
                    <div class="fl pl15">应付金额</div>
                    <div class="fr color_red">￥{{amountPayable}}</div>
                </div>
            </div>
        </tc_window>

        <!--选择支付的方式的 弹窗-->
        <tc_window v-show="tc_data.pay_show" :width="tc_data.width" title="付款" key="secondWindow"
                   firstName="返回" lastName="确认支付"
                   :haveBtn="tc_data.haveBtn"
                   :firstBtn="tc_data.firstPayBtn"
                   @close_tc="tc_data.pay_show = false"
                   @backPrev="backPrev"
                   @operate="surePay">
            <div class="tc_container pt20 pb20 tc">
                <ul class="border_green_solid p10 clear_float">
                    <li class="fl payStyle ml15" :class="{active:tc_data.bank_code == 9997}"
                        @click="switch_pay_style(1)">
                        <img src="/src/assets/images/pic_alipay_h24.png" class="ver_mid">
                    </li>
                    <li class="fl payStyle" :class="{active:tc_data.bank_code == 9998}"
                        @click="switch_pay_style(2)">
                        <img src="/src/assets/images/pic_wechat_pay_h24.png" class="ver_mid">
                    </li>
                    <li class="fl payStyle" :class="{active:tc_data.bank_code == 99999}"
                        @click="switch_pay_style(3)">
                        <img src="/src/assets/images/unionpay.png" class="ver_mid">
                    </li>
                </ul>

                <ul class="bankContainer clear_float pt20 pl25 bor_bot_slide" v-show="tc_data.bank_code == 99999">
                    <li class="fl payStyle p_25" v-for="(item,index) in bankCodeData"
                        :class="{active:item.flag}" @click="switchBank(index,item.bankCode)">
                        <img v-if="(index != 19 && index != 23)" :key="index" :src="`/src/assets/images/bank_${item.serialNumber}.jpg`">
                        <img v-else :key="index" :src="`/src/assets/images/bank_${item.serialNumber}.png`">
                    </li>
                </ul>

                <div class="clear_float pt15 pb5 pl30 pr30 lh20 ">
                    <div class="fl">应付金额</div>
                    <div class="fr color_red">￥{{amountPayable}}</div>
                </div>
            </div>
        </tc_window>

        <tc_window v-show="tc_data.scan_tc_show" width="400" title="安全充值" key="secondWidow"
                   :haveBtn="tc_data.haveScanBtn"
                   @close_tc="surePayBtn">
            <div class="tc_container pt20 pb20" v-show="scanCodeShow == 0">
                <div class="mar_center f0 tc Qr_code">
                    <img :src="payImg" alt="二维码">
                </div>
                <div class="tc lh30 f16 color_3030 pt15 pb20">请支付</div>
            </div>
            <div class="pt40" v-show="scanCodeShow == 1">
                <div class="f0 tc">
                    <img src="/src/assets/images/icon_success.png" alt="扫码成功">
                </div>
                <div class="tc lh30 f18 color_3030 pt25 pb30">支付成功！</div>
            </div>

            <div class="pt40" v-show="scanCodeShow == 2">
                <div class="f0 tc">
                    <img src="/src/assets/images/icon_failing.png" alt="扫码失败">
                </div>
                <div class="tc lh20 f18 color_3030 pt15 pb10">支付失败！</div>
                <div class="tc lh20 color_deep pb30">请检查网络是否畅通或者稍后再试！</div>
            </div>
        </tc_window>

        <!--发货 弹窗-->
        <tc_window v-show="tc_data.delivery_show" width="400" title="发货信息" key="delivery" lastName="确定"
                   :haveBtn="tc_data.haveBtn"
                   :firstBtn="tc_data.firstDeliveryBtn"
                   @close_tc="tc_data.delivery_show = false"
                   @operate="sureDelivery">
            <div class="tc_container pt20 pb20 pl15 tc">
                <div class="clear_float mb10">
                    <div class="fl w_100 pr10 tr lh30">公司名称</div>
                    <div class="fl">
                        <!--<el-input  class="w_250" clearable></el-input>-->
                        <el-select v-model="tc_data.companyValue" class="w_200" placeholder="请选择公司">
                            <el-option v-for="item in tc_data.companyOptions"
                                       :key="item.label"
                                       :label="item.label"
                                       :value="item.label">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="clear_float mb10">
                    <div class="fl w_100 pr10 tr lh30"><span class="justify3">运单号</span></div>
                    <div class="fl">
                        <el-input  class="w_200" v-model="tc_data.waybillnum" clearable></el-input>
                    </div>
                </div>
            </div>
        </tc_window>

        <!--是否支付 弹窗-->
        <div class="layer_window" v-if="pay_false">
            <div class="layout sender_tc pl20 pr20 pb100" style="width:340px;">
                <i class="el-icon-close f24 close_close color_gray cursor" @click="surePayBtn"></i>
                <div class="layer_title lh50 tc color_3030 f18 border_green">提示</div>
                <div class="lh20"></div>
                <ul class="pr30 pl45 f15">
                    <li class="clear_float mb10">是否支付成功？</li>
                </ul>
                <div class="operate_btn tc par">
                    <el-button class="w_100 f16" plain @click="surePayBtn">取消</el-button>
                    <el-button class="w_100 f16" type="success" @click="surePayBtn">确定</el-button>
                </div>
            </div>
        </div>

        <!--隐藏的表单数据-->
        <form action="https://cashier.sandpay.com.cn/allChannelPayAdapter" method="POST" id="formData" class="hide" target="_blank">
            <!--<form action="http://www.beeserp.com/public/login.html" method="POST" id="formData" name="aspx" class="hide" target="_blank">-->
            <input type="text" name="bizType" :value="form.bizType" />
            <input type="text" name="realSumbitUrl" :value="form.realSumbitUrl" />
            <input type="text" name="txnSubType" :value="form.txnSubType" />
            <input type="text" name="backUrl" :value="form.backUrl" />
            <input type="text" name="signature" v-model="form.signature" />
            <input type="text" name="orderId" :value="form.orderId" />
            <input type="text" name="issInsCode" :value="form.issInsCode" />
            <input type="text" name="merName" :value="form.merName" />
            <input type="text" name="txnType" :value="form.txnType" />
            <input type="text" name="frontUrl" :value="form.frontUrl" />
            <input type="text" name="channelType" :value="form.channelType" />
            <input type="text" name="certId" :value="form.certId" />
            <input type="text" name="encoding" :value="form.encoding" />
            <input type="text" name="version" :value="form.version" />
            <input type="text" name="merAbbr" :value="form.merAbbr" />
            <input type="text" name="accessType" :value="form.accessType" />
            <input type="text" name="txnTime" :value="form.txnTime" />
            <input type="text" name="merId" :value="form.merId" />
            <input type="text" name="merCatCode" :value="form.merCatCode" />
            <input type="text" name="currencyCode" :value="form.currencyCode" />
            <input type="text" name="txnAmt" :value="form.txnAmt" />
            <input type="text" name="signMethod" :value="form.signMethod" />
            <input type="submit" id="submit_data" value="提交数据">
        </form>
    </div>
</template>
<script type="text/ecmascript-6">
    import tc_window from "@/components/tc_window.vue"
    require("../../assets/js/paymentjs.js");
    export default {
        name: "timeLine",
        props:["order_info","logisticsList","pickup_type"],
        data(){
            return {
                tc_data: {
                    width: 450,
                    lastName: "下一步",           // 支付弹窗显示
                    show: false,                  // 支付弹窗显示
                    pay_show: false,              // 支付方式的 弹窗显示
                    haveBtn: true,                // 按钮组 是否显示
                    firstBtn: false,              // 支付弹窗 按钮组的第一个按钮 是否显示
                    firstPayBtn: true,            // 支付方式 按钮组的第一个按钮 是否显示
                    haveScanBtn: false,           // 扫码弹窗的 按钮组 是否显示
                    checked: false,               // 是否 进行 余额支付
                    online_pay:true,              // 在线支付
                    bank_code: "9997",             // 支付方式的 radio 切换
                    scan_tc_show:false,           // 扫码弹窗的显示
                    delivery_show : false,        // 发货
                    companyValue : '',             // 公司名
                    waybillnum : '',               // 运单号
                    fba_waybill_id:"",             // 当签订单的 fba_waybill_id
                    fba_logistics_id : '',         // 时间线ID
                    companyOptions:[
                        {value: "",label: "请选择快递公司"},
                        {value: "0",label: "申通快递"},
                        {value: "1",label: "中通快递"},
                        {value: "2",label: "圆通快递"},
                        {value: "3",label: "百世汇通"},
                        {value: "4",label: "韵达快递"},
                        {value: "5",label: "天天快递"},
                        {value: "7",label: "顺丰物流"},
                        {value: "8",label: "德邦物流"},
                        {value: "9",label: "中国邮政"},
                        {value: "10",label: "EMS"},
                        {value: "11",label: "快捷快递"}
                    ],
                    pay_type : "1"                // 1是支付宝、3是微信、2是银联
                },
                bankCode: "01020000",
                orderListData : [],              // 付款时列表
                orderListType : "",				 // 0是支付,1是补充支付
                order_no: "",                    // 订单号
                price: "",                       // 订单价格
                account_balance: "",             // 账户余额
                pay_type: "",                    // 支付类型 = 1 勾选余额支付 = 2 未勾选余额支付
                fba_waybill_id: "",              // 当签订单的 fba_waybill_id
                cur_index:"",                    // 当前订单的 index
                payImg:"",
                scanCodeShow:"0",
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
                ],
                form : {
                    bizType : "000201",
                    realSumbitUrl : "https://gateway.95516.com/gateway/api/frontTransReq.do",
                    txnSubType : "01",
                    backUrl : "http://payment.sandpay.com.cn/request/fjUnionpayInternetBankNotify",
                    signature : "",
                    orderId : "WG20180119071092800000000000825",
                    issInsCode : "CCB",
                    merName : "互赢",
                    txnType : "01",
                    frontUrl : "https://cashier.sandpay.com.cn/gateway/api/order/notice/allChannelPay",
                    channelType : "07",
                    certId : "73856618904",
                    encoding : "UTF-8",
                    version : "5.0.0",
                    merAbbr : "互赢",
                    accessType : "0",
                    txnTime : "20180119134315",
                    merId : "827330357340002",
                    merCatCode : "5734",
                    currencyCode : "156",
                    txnAmt : "12",
                    signMethod : "01"
                },
                pay_false : false               // 支付是否成功弹框
            }
        },
        computed:{
            already_pay(){
                return this.logisticsList.some( item => {
                    return item.operate_content == "已支付";
                });
            },
            // 账户余额克扣的 金额
            deduct_amount(){
                if(this.tc_data.checked){
                    if((1*this.account_balance) >= (1*this.price)){
                        return (1*this.price).toFixed(2);
                    }else {
                        return (1*this.account_balance).toFixed(2);
                    }
                }
                return 0
            },
            // 计算应付的 金额
            amountPayable(){
                if(this.tc_data.checked){
                    if((1*this.account_balance) >= (1*this.price)){
                        this.tc_data.lastName = "立即支付";
                        return 0;
                    }else {
                        this.tc_data.lastName = "下一步";
                        return ((1*this.price) - (1*this.account_balance)).toFixed(2);
                    }
                }else {
                    this.tc_data.lastName = "下一步";
                    return (1*this.price).toFixed(2);
                }
            }
        },
        methods:{
            // 打开 支付弹窗
            openPayWindow(fba_waybill_id){
                // 获取 当前订单的 订单信息.
                this.tc_data.checked = false;   // 默认情况 余额支付 不勾选
                this.$ajax.post("index.php?r=fba/fba/pay-finance", {
                    fba_waybill_id : fba_waybill_id,
                    request: "view"
                }, data => {
                    if (data.status == 0) {
                        this.orderListData = [];
                        var obj = {bee_id : data.data.bee_id,price : data.data.price};
                        this.orderListData.push(obj);
                        //this.order_no = data.data.bee_id;
                        this.price = data.data.price;

                        if ((1 * this.account_balance) >= (1 * this.price)) {
                            this.tc_data.checked = true;
                            this.tc_data.lastName = "立即支付";
                        } else {
                            this.tc_data.lastName = "下一步";
                        }
                        this.tc_data.show = true;   // 打开 支付弹窗
                    }
                });
                // 获取 当前订单的 账户余额
                this.$ajax.post("index.php?r=fba/fba/account-balance", {}, data => {
                    if (data.status == 0) {
                        this.account_balance = data.data;
                    }
                });
                this.fba_waybill_id = fba_waybill_id;
                // this.orderListType = data.type;
            },
            // 支付 下一步  按钮
            goToNextStep(){
                if (this.tc_data.lastName == "下一步") {
                    this.tc_data.show = false;
                    this.tc_data.pay_show = true;
                    this.tc_data.bank_code = "9997";
                    this.tc_data.width = 450;
                    this.bankCode = "01020000";
                } else {    // 如果 账户余额 大于 待支付金额 则立即支付
                    let param = {
                        fba_waybill_id: this.fba_waybill_id,
                        request: 1,
                        pay_type: this.tc_data.checked ? 1 : 2
                    };
                    this.$ajax.post("index.php?r=fba/fba/pay-finance", param, data => {
                        if (data.status == 0) {
                            // 刷新 数据 当前项的 支付按钮 隐藏
                            /*this.orderData.every((order) => {
                                if(order.fba_waybill_id == param.fba_waybill_id){
                                    order.fba_paystatus = 2
                                }
                                return order.fba_waybill_id != param.fba_waybill_id;
                            });*/
                        } else {
                            console.log(data.message);
                        }
                    });
                }
            },
            // 返回 上一步
            backPrev(){
                this.tc_data.show = true;
                this.tc_data.pay_show = false;
            },
            // 跳转到 银行卡列表
            switch_pay_style(num){
                if (num == 1) {
                    this.tc_data.bank_code = "9997";
                    this.tc_data.width = 450;
                    this.tc_data.pay_type = 1;
                } else if (num == 2) {
                    this.tc_data.bank_code = "9998";
                    this.tc_data.width = 450;
                    this.tc_data.pay_type = 3;
                } else {
                    this.tc_data.pay_type = 2;
                    this.tc_data.bank_code = "99999";
                    this.tc_data.width = 750;
                    //this.bankCode = "01020000";
                    this.bankCode = this.bankCodeData[0].bankCode;
                    // 银行显示 复位
                    this.bankCodeData.forEach( (item, i) => { item.flag = i == 0; } );
                }
            },
            // 银行卡之间的跳转
            switchBank(index, code){
                this.bankCodeData.forEach((item, i) => {
                    item.flag = i == index;
                });
                this.bankCode = code;
                // console.log(this.bankCode);
            },
            // 确认支付
            surePay(){
                let param = {
                    fba_waybill_id: this.fba_waybill_id,
                    request: 1,
                    bankcode: this.tc_data.bank_code == "99999" ? this.bankCode : this.tc_data.bank_code,
                    pay_type: this.tc_data.checked ? 1 : 2
                };
                this.$ajax.post("index.php?r=fba/fba/pay-finance", param, data => {
                    if (data.status == 0) {
                        let data_data = data.data;
                        if(param.bankcode.length == 4){
                            this.payImg = data_data.content;
                            this.tc_data.pay_show = false;
                            this.tc_data.scan_tc_show = true;
                            let start = setInterval(() => {
                                this.$ajax.post("index.php?r=fba/fba/pay-query",{
                                    txnid: data_data.txnid,
                                    type : this.tc_data.pay_type
                                },responseData => {
                                    if(responseData.status == 100){
                                        clearInterval(start);
                                        this.scanCodeShow = "1";        // 支付成功 的部分显示
                                        // 刷新 数据 当前项的 支付按钮 隐藏
                                        /*this.orderData.every((order) => {
                                            if(order.fba_waybill_id == param.fba_waybill_id){
                                                order.fba_paystatus = 2
                                            }
                                            return order.fba_waybill_id != param.fba_waybill_id;
                                        });*/
                                    }else if(responseData.status == 101){
                                        console.log("请求中......")
                                    }else {
                                        console.log("请求错误");
                                        clearInterval(start);
                                        this.scanCodeShow = "2";        // 支付失败 的部分显示
                                    }
                                })
                            },2000);
                        }
                        else if(param.bankcode.length == 8){
                            this.tc_data.pay_show = false;
                            paymentjs.createPayment(data_data.content, function(result, err) {
                                console.log(result);
                                console.log(err.msg);
                                console.log(err.extra);
                            });
                            this.pay_false = true;
                            let start = setInterval(() => {
                                this.$ajax.post("index.php?r=fba/fba/pay-query",{
                                    txnid: data_data.txnid,
                                    type : this.tc_data.pay_type
                                },responseData => {
                                    if(responseData.status == 100){
                                        clearInterval(start);
                                        this.pay_false = false;
                                        this.tc_data.scan_tc_show = true;
                                        // 支付成功 的部分显示
                                        this.scanCodeShow = "1";
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
                                        console.log("请求错误");
                                        clearInterval(start);
                                        this.tc_data.scan_tc_show = true;
                                        // 支付失败 的部分显示
                                        this.scanCodeShow = "2";
                                    }
                                })
                            },2000);
                        }
                    }
                });
            },
            // 打印面单
            /*openPrintSingle (fba_waybill_id) {
                this.$ajax.post("index.php?r=fba/fba/print",{
                    fba_waybill_id:fba_waybill_id
                },data => {
                    if(data.status == 0){
                        window.open(data.data.url);
                    }
                })
            },*/
            // 发货按钮
            shipment(fba_waybill_id){
                //this.tc_data.fba_logistics_id = data.fba_logistics_id;
                this.tc_data.fba_waybill_id = fba_waybill_id;
                this.tc_data.delivery_show = true;
            },
            // 确认发货
            sureDelivery(){
                var param = {
                    //fba_logistics_id : this.fba_logistics_id,
                    fba_waybill_id : this.tc_data.fba_waybill_id,
                    express_company : this.tc_data.companyValue,
                    express_number : this.tc_data.waybillnum
                };
                this.$ajax.post("index.php?r=fba/fba/deliver-goods",param, data => {
                    if(data.status == 0){
                        location.reload();
                    }else {
                        console.log(data.message);
                    }
                });
            },
            surePayBtn(){
                location.reload();
            }
        },
        components:{ tc_window }
    }
</script>
