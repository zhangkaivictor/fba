<style scoped>
    .center_aside li{
        line-height:49px;height:49px;border-bottom:1px solid #fff;padding-left:40px;
        cursor:pointer;transition: all 0.3s;
    }
    .center_aside li.active,
    .center_aside li:hover{color:#99ce58;border-bottom:1px solid #99ce58;}
    .center_aside li:first-child{background:url("/src/assets/images/icon_register_default.png") no-repeat 10px 12px;}
    .center_aside li:first-child.active,
    .center_aside li:first-child:hover{background:url("/src/assets/images/icon_register_on.png") no-repeat 10px 12px;}
    .center_main{overflow:hidden;}
    .center_aside li:last-child{background:url("/src/assets/images/icon_problems_default.png") no-repeat 10px 12px;}
    .center_aside li:last-child.active,
    .center_aside li:last-child:hover{background:url("/src/assets/images/icon_problems_on.png") no-repeat 10px 12px;}
    .center_main{overflow:hidden;}
</style>

<template lang="html">
    <div class="container pt40">
        <div class="inner">
            <!--主体部分-->
            <div class="person_center_main clear_float pb60">
                <ul class="fl center_aside w_130 f16 color_3030">
                    <li v-for="(item,index) in pathData" :class="{active:item.flag}"
                        @click="goToPage(index)">{{item.navTitle}}</li>
                </ul>
                <div class="fr center_main w_850 box_shadow border_box pl40 pr40 pt25 pb40">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "problem",
        created(){
            this.fresh_page({index:1,username:this.$wsCache.get("username")});
            this.show_head_foot();
        },
        data(){
            return {
                pathData:[
                    {navTitle:"注册使用",pathName:"commonProblemchild",flag:true},
                    {navTitle:"常见问题",pathName:"commonProblems",flag:false}
                ]
            }
        },
        methods:{
            ...mapMutations([
                "fresh_page",
                "show_head_foot"
            ]),
            goToPage(index){
                this.pathData.forEach(function (item,i) {
                    item.flag = i == index;
                });
                let path = {name:this.pathData[index].pathName};
                this.$router.push(path);
            }
        }
    }
</script>
