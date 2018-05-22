<style scoped>
    .el-button--small{padding:6px 20px;font-size:14px;border-radius:20px;
        box-shadow:1px 1px 3px 3px rgba(0,0,0,0.12)}
    table {border: 1px solid #f4f9ed;border-radius: 10px;}
    table th {background: #99ce58;padding: 12px;}
    td.subtitle {padding: 10px;background: #f4f9ed;}
    .color_green{color:#99ce58 !important;}
</style>
<template>
    <table class="p_100 mb15">
        <thead v-if="index == 0">
            <tr class="f15 color_3030 tc">
                <th style="width:20%;">物流单号</th>
                <th style="width:30%;">物流方案</th>
                <th style="width:12%;">目的地</th>
                <th style="width:13%;">订单金额</th>
                <th style="width:15%;">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr class="f15">
                <td colspan="5" class="clear_float subtitle bor_bot_dashed">
                    <div class="fl">
                        <span class="inline_block pl15 pr15 mt5">订单号 : {{order.bee_id}}</span>
                        <i class="inline_block pl15 pr15 mt5 color_red"
                           :class="{color_green : (order.order_status == 4)}">
                            {{order.order_type | getStatus}}
                        </i>
                    </div>
                    <div class="fr">
                        <el-button type="success" @click="goToPay(order.fba_waybill_id)" v-if="order.order_type == 1">支付</el-button>
                        <el-button type="success" @click="goToReplenish(order.fba_waybill_id)" v-if="order.is_diff == 1">补充支付</el-button>
                        <el-button v-if="order.pickup_type == 2 && !order.express_company && !order.express_number"
                                   type="success" class="ml10"
                                   @click="shipBtn(order.fba_waybill_id,order.real_address)">发货</el-button>
                        <div class="inline_block w_80 unl color_green cursor pl15"
                             @click="lookDetails(order.fba_waybill_id,order.order_type)">
                            查看详情
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="tc">
                <td style="width:25%;" :style="{color: order.fba_waybill_num ? '#4c4c4c' : '#b8bfce'}">
                    {{order.fba_waybill_num ? order.fba_waybill_num : '发货后产生单号'}}
                </td>
                <td style="width:35%;">{{order.channel_name}}</td>
                <td style="width:12%;">{{order.country}}</td>
                <td style="width:13%;">￥{{order.price}}</td>
                <td style="width:15%;">
                    <el-button v-if="order.fba_status == 2" type="success" @click="printSingle(order.fba_waybill_id)">
                        打印面单
                    </el-button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        name: "orderItem",
        props:["order","index"],
        data(){ return {} },
        methods:{
            // 付款操作
            goToPay(fba_waybill_id){
                this.$emit("openPayWindow",{fba_waybill_id, type:0});
            },
            // 补充支付操作
            goToReplenish(fba_waybill_id){
            	this.$emit("openPayWindow",{fba_waybill_id, type:1});
            },
            // 打印面单
            printSingle(fba_waybill_id){
            	this.$emit("openPrintSingle",fba_waybill_id);
            },
            // 跳转到 查看详情页面
            lookDetails(fba_waybill_id,order_type){
                this.$router.push({path:"/orderDetails",query:{fba_waybill_id,order_type}});
            },
            // 发货按钮
            shipBtn(fba_waybill_id,real_address){
            	this.$emit("sureShip",{ fba_waybill_id, real_address });
            }
        },
        filters:{
            // 过滤 订单状态
            getStatus(param){
                switch (param){
                    case 1 : return "待付款";
                    case 2 : return "待发货";
                    case 3 : return "承运商待发货";
                    case 4 : return "承运商已发货";
                    case 5 : return "已妥投";
                    case 6 : return "补差价";
                    case 7 : return "未妥投";
                    case 8 : return "退款中";
                    case 9 : return "已退款";
                    case 10 : return "已取消";
                }
            }
        }
    }
</script>
