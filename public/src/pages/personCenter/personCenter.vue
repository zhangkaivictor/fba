<style scoped>
    .person_pic{border-radius:32px;overflow:hidden;}
    .center_aside li{
        line-height:49px;height:49px;border-bottom:1px solid #fff;padding-left:40px;
        cursor:pointer;transition: all 0.3s;
    }
    .center_aside li.active,
    .center_aside li:hover{color:#99ce58;border-bottom:1px solid #99ce58;}

    .center_aside li:first-child{background:url("/src/assets/images/icon_my_order_default.png") no-repeat 6px 10px;}
    .center_aside li:first-child.active,
    .center_aside li:first-child:hover{background:url("/src/assets/images/icon_my_order_on.png") no-repeat 6px 10px;}

    .center_aside li:nth-child(2){background:url("/src/assets/images/icon_message_default.png") no-repeat 6px 10px;}
    .center_aside li:nth-child(2).active,
    .center_aside li:nth-child(2):hover{background:url("/src/assets/images/icon_message_on.png") no-repeat 6px 10px;}

    .center_aside li:nth-child(3){background:url("/src/assets/images/icon_send_default.png") no-repeat 6px 10px;}
    .center_aside li:nth-child(3).active,
    .center_aside li:nth-child(3):hover{background:url("/src/assets/images/icon_send_on.png") no-repeat 6px 10px;}

    /*.center_aside li:nth-child(4){background:url("/src/assets/images/icon_recive_default.png") no-repeat 6px 10px;}
    .center_aside li:nth-child(4).active,
    .center_aside li:nth-child(4):hover{background:url("/src/assets/images/icon_recive_on.png") no-repeat 6px 10px;}*/

    .center_aside li:nth-child(4){background:url("/src/assets/images/icon_account_default.png") no-repeat 6px 10px;}
    .center_aside li:nth-child(4).active,
    .center_aside li:nth-child(4):hover{background:url("/src/assets/images/icon_account_on.png") no-repeat 6px 10px;}

    .center_aside li:nth-child(5){background:url("/src/assets/images/icon_password_default.png") no-repeat 6px 10px;}
    .center_aside li:nth-child(5).active,
    .center_aside li:nth-child(5):hover{background:url("/src/assets/images/icon_password_on.png") no-repeat 6px 10px;}

    .center_aside li:last-child{background:url("/src/assets/images/icon_recharge_default.png") no-repeat 6px 10px;}
    .center_aside li:last-child.active,
    .center_aside li:last-child:hover{background:url("/src/assets/images/icon_recharge_on.png") no-repeat 6px 10px;}

    .center_main{overflow:hidden;}

    .el-button--small{padding:8px 25px;font-size:17px;border-radius:20px;
        box-shadow:1px 1px 3px 3px rgba(0,0,0,0.12)}

</style>
<template>
    <div class="container">
        <div class="inner">
            <!--个人中心的头部-->
            <div class="person_center_head p20 clear_float box_shadow mb20">
                <div class="fl w_60 person_pic">
                    <img src="/src/assets/images/portrait_pic.png" alt="个人头像">
                </div>
                <div class="fl pl20 f16">
                    <p class="lh25 pt5 color_green">{{username}}</p>
                    <p class="lh25 pb5 color_deep">{{telephone}}</p>
                </div>

                <div class="fr tr mb10 mt10">
                    <el-button class="f18" native-type="button" type="success"	@click="nowPlaceOrder">快捷下单</el-button>
                </div>

            </div>

            <!--个人中心的主体部分-->
            <div class="person_center_main clear_float pb60">
                <ul class="fl center_aside w_130 f16 color_3030">
                    <li v-for="(item,index) in pathData" :class="{active:item.flag}"
                        @click="goToPage(index)">{{item.navTitle}}</li>
                </ul>
                <div class="fr center_main w_850 box_shadow border_box pl30 pr30 pb40 pt20">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapState,mapMutations } from "vuex"
    export default {
        name: "placeOrder",
        created(){
            if(!this.$wsCache.get("user_id")){
                this.$router.push("/login");
            }
            if(document.getElementById('newBridge')){
                document.getElementById('newBridge').style.display = "none";
            }
            this.operate_customer(false);
            this.username = this.$wsCache.get("username");
            this.telephone = this.$wsCache.get("telephone");
            this.fresh_page({index: 3,username: this.$wsCache.get("username")});
        },
        data() {
            return {
            	username : "",
            	telephone : ""
            }
        },
        computed:{
            ...mapState(["pathData"])
        },
        methods: {
            ...mapMutations([
                "fresh_page",
                "operate_customer",
                "update_place_info"
            ]),
            goToPage(index){
                this.pathData.forEach(function (item,i) {
                    item.flag = i == index;
                });
                let path = {name:this.pathData[index].pathName};
                this.$router.push(path);
            },
            nowPlaceOrder(){//快捷下单
            	this.$router.push({path:"/placeOrder"});
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
                    goods_list:[{length:"",width:"",height:"",weight:"",numbers:""}]
                });
            }
        }
    }
</script>
