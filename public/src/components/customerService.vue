<style scoped>
    .online_qq{position:fixed;right:10px;bottom:20px;z-index:6;padding:10px 0;
        box-shadow:0 0 20px 1px rgba(0,0,0,0.05);background:#fff;}
    .online_qq{width:140px;box-sizing:border-box;border:2px solid #99ce58;border-radius:10px;}
    .qq_top img{width:100%;}
    .qq_body{box-sizing:border-box;width:136px;
        min-height:100px;background-size:100%;padding-left:5px;padding-right:5px;color:#777}
    .qq_body .qq_title{font-size:16px;line-height:32px;}
    .qq_body .qq_contact{font-size:16px;line-height:32px;margin-top:10px}
    /*.qq_body .qq_contact1{font-size:14px;text-align:center;}*/
    .qqs .qq_titles{float:left;line-height:25px;}
    .qq_b_line{margin-top:20px;background:url(/src/assets/images/qq_line.png) center center;
        width:120px;height:3px;background-size:100%;}
    .qq_weChat img{width:100px;}
</style>

<template>
    <div class="online_qq box_shadow" id="online_qq">
        <div class="qq_body">
            <div class="qq_title">QQ客服</div>
            <div class="qqs f12 mb5" v-for="">
                <div class="qq_titles">业务咨询:</div>
                <a class="color_3030" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=389028123&site=qq&menu=yes">
                    <img class="fr cursor" border="0" src="/src/assets/images/qq.png" width="60">
                </a>
                <div class="clear_float"></div>
            </div>
            <div class="qqs f12 mb5">
                <div class="qq_titles">业务咨询:</div>
                <a class="color_3030" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1462366700&site=qq&menu=yes">
                    <img class="fr cursor" border="0" src="/src/assets/images/qq.png" width="60">
                </a>
                <div class="clear_float"></div>
            </div>
            <div class="qq_b_line"></div>
            <div class="qq_contact">联系方式</div>
            <div class="tl">
                <div class="qq_contact1 ml5"><span>固话: </span></div>
                <div class="qq_contact1 ml10 mt5"><span class="color_red f15">021-80370843</span></div>
                <div class="qq_contact1 mt5 ml5"><span>手机: </span></div>
                <div class="qq_contact1 ml10 mt5"><span class="color_red f15">173-6539-5878</span></div>
                <div class="qq_contact1 ml10 mt5"><span class="color_red f15">173-6539-5818</span></div>
            </div>
            <div class="qq_b_line"></div>
            <div class="qq_contact">微信公众号</div>
            <div class="qq_weChat tc"><img src="/src/assets/images/public_hao.jpg"></div>
            <div class="tc color_green">扫扫加微信</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "customerService"
    }
</script>
