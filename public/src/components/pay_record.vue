<style scoped>
    th{background:#4e5564;height:30px;color:#fff;padding:3px 5px;}
    td{border-bottom:1px dashed #d6d8dd;height:30px;padding:3px 5px;}
</style>
<template>
    <div class="top_up_record pt30">
        <table class="data_list p_100 tc">
            <thead><tr><th>支付金额</th><th>支付方式</th><th>订单号</th><th>支付时间</th></tr></thead>
            <tbody>
                <tr v-for="item in paymentData.slice((currentPage-1) * pageSize,currentPage * pageSize)">
                    <td>￥{{item.pay_amount}}</td>
                    <td>{{pay_style[item.pay_style]}}</td>
                    <td>{{item.fba_bee_id ? item.fba_bee_id : '暂无'}}</td>
                    <td>{{item.add_time}}</td>
                </tr>
            </tbody>
        </table>
        <!--分页列表-->
        <div class="tc pb50 pt30">
            <el-pagination background layout="pager"
                           :total="paymentData.length"
                           :page-size="pageSize"
                           :current-page="currentPage"
                           @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: "top_up_record",
        props:["paymentData"],
        data(){
            return {
                total: 0,       // 总的订单数量
                pageSize: 10,   // 设置每页的数据条数 10条
                currentPage: 1,  // 默认开始页面 第1页
                pay_style : {
                	"1" : "余额支付",
                	"2" : "支付宝",
                	"3" : "微信 " ,
                	"5" : "银行转账",
                }
            }
        },
        methods:{
            currentChange(currentPage){
                this.currentPage = currentPage;
            }
        }
    }
</script>
