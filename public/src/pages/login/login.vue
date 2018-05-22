<style scoped>
    .page_top{width:100%;font-size:0;left:0;top:0;}
    .page_top img{width:100%;}
    .page_main{width:350px;left:50%;top:50%;transform:translate(-50%,-50%);box-sizing:border-box;}
    .page_foot{width:100%;left:0;bottom:0;}
</style>

<template lang="html">
    <div id="login" class="login pr">
        <div class="page_top par">
            <img src="/src/assets/images/page_top.png">
        </div>
        <div class="page_main par tc ">
            <div class="f0 cursor" @click="goToIndexPage">
                <img src="/src/assets/images/logo2.png" height="83">
            </div>
            <router-view></router-view>
        </div>
        <div class="page_foot lh30 pb20 tc color_8d8d f12 par">
            <span class="mr30 cursor" @click="goAboutPage">关于我们</span>
            <span class="mr30 cursor" @click="goProblemPage">常见问题</span>
            <span>版权所有 &copy; 2017  上海蜂运信息科技有限公司</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "login",
        mounted(){
            // 隐藏头部
            this.hidden_head_foot();
            // 右客服隐藏
            if(document.getElementById("newBridge")) {
                document.getElementById('newBridge').style.display = "none";
            }
            // 左客服隐藏
            this.operate_customer(false);
            // 设置 容器的高度为 文档的高度
            var login = document.getElementById("login");
            login.style.height = document.documentElement.clientHeight + "px";
            // 监听 resize 事件
            window.addEventListener("resize",this.handleResize,false);
        },
        beforeDestroy(){
            window.removeEventListener("resize",this.handleResize,false);
        },
        data(){
            return {
                lr_module_show:true
            }
        },
        methods: {
            ...mapMutations([
                "show_head_foot",
                "operate_customer",
                "hidden_head_foot"
            ]),
            handleResize(e){
                var login = document.getElementById("login");
                login.style.height = document.documentElement.clientHeight + "px";
            },
            goAboutPage(){
                this.$router.push(`/about`);
            },
            goProblemPage(){
                this.$router.push(`/problem`);
            },
            goToIndexPage(){
                this.$router.push(`/`);
                this.show_head_foot();
                this.operate_customer(true);
            }
        }
    }
</script>
