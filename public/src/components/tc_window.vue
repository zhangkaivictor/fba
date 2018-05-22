<style scoped>
    .el-button--small{padding:8px 10px;font-size:15px;border-radius:3px;}
    .pb66{padding-bottom:66px;}
    .operate_btn{left:0;bottom:0;}
</style>

<template>
    <div class="layer_window">
        <div class="layout sender_tc pl20 pr20" :class="{pb66: haveBtn}" :style="{width: width + `px`}">
            <i class="el-icon-close f24 close_close color_gray cursor" @click="close"></i>
            <div class="layer_title lh50 tc color_3030 f18 border_green">{{title}}</div>
            <div class="slot_container">
                <slot></slot>
            </div>
            <div class="tc bg_fff par operate_btn pt15 pb15" v-if="haveBtn">
                <div class="inline_block mr10" v-if="firstBtn">
                    <el-button plain class="w_125" @click="operateOne">{{firstName}}</el-button>
                </div>
                <div class="inline_block">
                    <el-button type="success" class="w_125" @click="operateTwo">{{lastName}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tc_window",
        props:["width","title","haveBtn","firstBtn","firstName","lastName"],
        data(){
            return {}
        },
        methods:{
            close(){
                this.$emit("close_tc");
            },
            operateOne(){
                if(this.firstName == "取消"){
                    this.$emit("close_tc");
                }else if(this.firstName == "返回") {
                    this.$emit("backPrev");
                }
            },
            operateTwo(){
                this.$emit("operate");
            }
        }
    }
</script>
