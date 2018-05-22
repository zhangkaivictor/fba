<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .border_dashed_green{border:1px dashed #29ce11;}
    .card{height:210px;border-radius:5px;overflow:hidden;}
    .circle{top:7px;left:11px;width:18px;height:18px;border-radius:13px;}
    .big_circle{right:-30px;bottom:-30px;width:60px;height:60px;border-radius:35px;}
    .small_circle{right:-15px;bottom:-15px;width:30px;height:30px;border-radius:18px;}
    .del_btn{top:11px;right:42px;}
    .edit_btn{top:12px;right:12px;}
</style>

<template>
    <div class="card w_365 pr border_box pr10 pl10 border_dashed_green mb30">
        <div class="person_name tc color_green f18 lh35 pb5 pt5">{{item.contact_name}}</div>
        <ul class="f15 color_3030">
            <li class="clear_float lh25">
                <div class="fl w_75 pr5 color_deep tr">公司名称 : </div>
                <div class="fl calc_80">{{item.company}}</div>
            </li>
            <li class="clear_float lh25">
                <div class="fl w_75 pr5 color_deep tr">联系人 : </div>
                <div class="fl calc_80">{{item.contact_name}}</div>
            </li>
            <li class="clear_float lh25">
                <div class="fl w_75 pr5 color_deep tr">联系电话 : </div>
                <div class="fl calc_80"><i class="pr15">{{item.contact_phone}}</i></div>
            </li>
            <li class="clear_float lh25">
                <div class="fl w_75 pr5 color_deep tr">取件地址 : </div>
                <div class="fl calc_80">{{item.pro_ci_ar | compile_pca}}&nbsp;{{item.address}}</div>
            </li>
            <!--<li class="clear_float lh25">-->
                <!--<div class="fl w_75 pr5 color_deep tr">&nbsp;</div>-->
                <!--<div class="fl calc_80">{{item.address}}</div>-->
            <!--</li>-->
        </ul>
        <div class="del_btn par f18 color_green" @click="delSender">
            <i class="el-icon-delete cursor f22"></i>
        </div>
        <div class="edit_btn par f18 color_green" @click="editSender">
            <i class="el-icon-edit-outline cursor f22"></i>
        </div>
        <div class="circle par border_dashed_green"></div>
        <div class="big_circle par border_dashed_green"></div>
        <div class="small_circle par border_dashed_green"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "card",
        props:["item","index"],
        data () {
            return {
                msg: "this is a card !",
                regionData:null
            }
        },
        methods:{
            delSender(e){
                this.$emit("del", {index:this.index,sender_id:this.item.sender_id});
            },
            editSender(e){
                this.$emit("edit", {index:this.index,operateStyle:1})
            }
        },
        filters:{
            compile_pca(obj){
                return Object.values(obj).join(" ");
            }
        }
    }
</script>
