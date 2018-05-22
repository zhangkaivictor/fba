<style scoped>
    .back_prev_page{background:url("/src/assets/images/back_prev_page.png") no-repeat 16px 15px;}
    .content_main{background:url("/src/assets/images/triangle.png") no-repeat left top;}
    .info_remind_flag{top:-5px;right:-19px;}
</style>
<template>
    <div class="container">
        <div class="inner">
            <div class="back_prev_page f18 border_box lh60 pl50 mb20 box_shadow color_3030 cursor"
                 @click="backMyOrder">
                返回我的订单
            </div>

            <div class="content_main order_main box_shadow pr">
                <h2>订单详情</h2>
                <div class="info_bar bor_bot_solid f18 color_3030 pt20">
                    <div class="inline_block lh40 mr20 cursor pr"
                         :class="{active: basic_show == 0}" @click="basic_show = 0">
                        订单信息
                    </div>
                    <div class="inline_block lh40 mr20 cursor pr"
                         :class="{active: basic_show == 1}" @click="basic_show = 1">
                        发/收件人
                    </div>
                    <div class="inline_block lh40 cursor pr"
                         :class="{active: basic_show == 2}" @click="timeLineShow">
                        时间线
                        <div class="par info_remind_flag" v-show="info_flag_num == 0">
                            <img src="/src/assets/images/info_remind_icon.png" alt="信息提醒">
                        </div>
                    </div>
                </div>

                <div class="main_information pl40 pr40">
                    <!--订单信息-->
                    <basic-info v-show="basic_show == 0"
                                :order_info = "order_data.waybill_data"
                                :goods_data = "order_data.waybill_goods_data"
                                :cus_data = "order_data.cus_data"
                                :transfer_data = "order_data.transfer_data"
                                :additiveFee = "order_data.additiveFee"
                                :myself_address="order_data.pickup_address"
                                :fba_waybill_id = "fba_waybill_id"
                                :order_type = "order_type">
                    </basic-info>

                    <!--发/收件人-->
                    <sender_receiver v-show="basic_show == 1"
                                     :order_info = "order_data.waybill_data"
                                     :myself_address="order_data.pickup_address">
                    </sender_receiver>

                    <!--时间线-->
                    <time-line v-show="basic_show == 2"
                               :order_info = "order_data.waybill_data"
                               :logisticsList="order_data.logisticsList"
                               :pickup_type="order_data.waybill_data.pickup_type">
                    </time-line>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import basicInfo from "./basicInfo.vue"
    import sender_receiver from "./sende_receiver.vue"
    import timeLine from "./timeLine.vue"
    import { mapMutations } from "vuex"

    export default {
        name: "placeOrder",
        props:["fba_waybill_id","order_type"],
        created(){
            // 判定是否处于已登录状态
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");

            // 客服隐藏
            this.operate_customer(false);

            // 获取订单详情数据
            let param = {fba_waybill_id: this.fba_waybill_id};
            this.$ajax.post("index.php?r=fba/fba/order-info", param, data => {
               if(data.status == 0){
                   this.order_data = data.data;
               }else {
                   this.$message({ message: data.message, type: "warning" });
               }
            });
        },
        data() {
            return {
                basic_show:"0",
                info_flag_num:0,
                order_data:{
                    additiveFee:[],
                    cus_data:{},
                    transfer_data:{},
                    waybill_data:{},
                    waybill_goods_data:{}
                }
            }
        },
        methods: {
            ...mapMutations([
                "operate_customer"
            ]),
            timeLineShow(){
                this.basic_show = "2";
                if(this.info_flag_num == 0) {
                    this.info_flag_num = 1;
                }
            },
            backMyOrder(){
                this.$router.push({name:"myOrder"})
            }
        },
        components: {
            basicInfo,sender_receiver,timeLine
        }
    }
</script>
