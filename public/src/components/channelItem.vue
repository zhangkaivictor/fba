<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    td{padding:20px 5px 15px;border-bottom:1px dashed #e4e4e4;}
    td:first-child{padding:20px 0 15px;}
    td:first-child p{box-sizing:border-box;padding-left:25px;text-align:left;}
    .flag_icon{top:-1px;left:0;font-size:0;}
    .flag_font{left:55px;top:0;width:80px;}
    .price{background:#dce3d4;font-weight:600;border-radius:20px;padding:1px;}
</style>

<template>
    <tr>
        <td class="pr">
            <div class="par flag_icon"><img :src="'/src/assets/images/icon_' + item.mark + '.png'"></div>
            <div class="par color_blue flag_font lh25 f15 tl">{{item.mark | flag_font}}</div>
            <p class="pt3 pb3">{{item.channel_name}}</p>
            <p class="cursor unl color_green pt3 pb3" @click="showDetails">详情</p>
        </td>
        <td>{{item.true_aging}}</td>
        <td>
            <p class="pt3 pb3">计费重: {{item.weightCount}}kg (除{{item.weight_number}})</p>
            <p class="price ">单价: ￥{{item.price}}元/kg</p>
        </td>
        <td>{{item.channel_type | filter_channel_type}}</td>
        <td>
            <p class="color_red pt3 pb3">￥{{item.true_price}}</p>
            <p class="middle_line pt3 pb3">市场价: {{item.market_price}}元</p>
        </td>
        <td>
            <el-button type="success" class="w_80 f14" @click="selectChannel">选择方案</el-button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "recommend-item",
        props:["item","index"],
        data () {
            return {
                msg: "this is recommend-item component !"
            }
        },
        methods:{
            showDetails(){
                let item = this.item,index = this.index;
                this.$emit("showDetails", {item,index})
            },
            selectChannel(){
                let item = this.item,index = this.index;
                this.$emit("selectChannel", {item,index})
            }
        },
        filters:{
            flag_font(param){
                switch (param){
                    case 1 : return "最快";
                    case 2 : return "普快";
                    case 3 : return "性价比最高";
                    case 4 : return "最便宜";
                }
            },
            filter_channel_type(param){
                switch (param){
                    case "40" : return "DHL";
                    case "50" : return "UPS";
                    case "60" : return "TNT";
                    case "70" : return "Fedex";
                    case "80" : return "空加派";
                }
            }
        }
    }
    /*
         ac_id :"0"
         aging                          时效
         bee_discount
         channel_id                     渠道id
         channel_name                   渠道名字
         channel_type                   渠道类型
         country_code                   国家二字码
         detailed_description           详情描述
         goods_class                    货品类别
         mark                           标志
         market_price                   市场价
         pi_id
         price                          单价
         start_city                     起运城市
         true_aging                     真实时效
         true_price                     真实价格
         weightCount                    重量
     */
</script>
