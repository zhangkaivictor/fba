<style>
    @import "assets/css/common.min.css";
    .container{height:100%;width:100%;}
    .defaultBrowser{float: left;margin-left: 20px;line-height: 80px;font-size: 20px;text-align: left;}
</style>

<template lang="html">
    <div id="container" class="container">
        <!--头部导航区-->
        <div class="header" v-show="head_foot_show">
            <div class="logo fl pt15 border_box cursor" @click="url_path">
                <img src="./assets/images/logo.png" alt="logo picture">
            </div>
            <div class="defaultBrowser" v-if="defaultBrowserFalse">
            	建议使用谷歌浏览器
            </div>
            <ul class="fr clear_float pr30">
                <li v-for="(nav, index) in navData" class="fl cursor"
                    :class="{active: nav.flag}" @click="goToPage(index)">
                    {{nav.name}}
                </li>
            </ul>
        </div>

        <!--主体区域 视图层-->
        <div class="main view_layer">
            <router-view></router-view>
        </div>

        <!--底部区域-->
        <div class="footer" v-show="head_foot_show">
            Copyright &copy; 2017 上海蜂运信息科技有限公司版权所有
        </div>

        <!--客服热线-->
        <customer-service v-show="customerServiceShow"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import customerService from "@/components/customerService.vue"
    import { mapState, mapMutations } from "vuex"
    export default {
        name: "index",
        created(){
            this.$wsCache.deleteAllExpires();   // 删除所有 清空缓存中过期数据。
            this.fresh_page({index: 0, username: this.$wsCache.get("username")});    // 刷新页面
            /*let hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?bd63655f4ebc28ecf15835531e07f567";
            let s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);*/
            // 检测浏览器类型
			let ua = window.navigator.userAgent;
		 	if(ua.indexOf("Chrome") > 0){
		 		if(ua.indexOf("QQBrowser") > 0){         // QQ浏览器提示
		  			this.defaultBrowserFalse = true;
		  		}
		  		if(ua.indexOf("BIDUBrowser") > 0){       // 百度浏览器
		  			this.defaultBrowserFalse = true;
		  		}
		  		let mimeTypes = navigator.mimeTypes;
		  		for (let mt in mimeTypes) {
                	if (mimeTypes[mt]["type"] == "application/vnd.chromium.remoting-viewer") {
                        this.defaultBrowserFalse = true; // 360浏览器
                 	}
             	}
		  	}
            else{
		  		this.defaultBrowserFalse = true;
		  	}
        },
        data(){
            return {
                defaultBrowserFalse : false  // 建议谷歌浏览器
            }
        },
        computed:{
            ...mapState([
                "navData",
                "head_foot_show",
                "customerServiceShow"
            ])
        },
        methods:{
            ...mapMutations([
                "show_head_foot",
                "hidden_head_foot",
                "update_jump_type",
                "operate_customer",
                "fresh_page"
            ]),
            goToPage(index){
                this.navData.forEach(function (item, i){
                    item.flag = i == index;
                });
                // 导航式编程
                if(this.navData[index].name == "登录" && index == 3){
                	if(document.getElementById("newBridge")){
                        document.getElementById('newBridge').style.display = "none";
                	}
                    this.update_jump_type(2);
                    this.operate_customer(false);
                }
                if(this.navData[index].name == "退出" && index == 4){
                    // 退出系统
                    this.$ajax.post("index.php?r=site/logout",{}, data => {
                        this.$wsCache.delete('username');
                        this.$wsCache.delete('user_id');
                        this.$wsCache.delete('telephone');
                        this.$router.push("/login");
                        // 刷新页面
                        this.fresh_page({index: 0, username: this.$wsCache.get("username")});
                    });
                    return false;
                }else {
                	if(document.getElementById("newBridge")){
                        document.getElementById('newBridge').style.display = "block";
                	}
                    this.show_head_foot();
                    this.operate_customer(true);
                }
                this.$router.push(this.navData[index].path);
            },
            url_path(){ // 返回首页
            	this.show_head_foot();
                this.operate_customer(true);
            	this.$router.push("/");
            }
        },
        components:{customerService}
    }
</script>
