<style scoped>
   .content,.company_msg{width:1000px;margin:0 auto 20px;}
   .content p{text-indent:32px;line-height:24px;margin-top:20px;color:#303030;font-size:16px;text-align: justify;}
   .container img{width:100%}
   .company_msg p{line-height:24px;text-indent:32px;color:#5e5e5e;}
   .justify5{text-align: center;width:5em;}
   .justify4{letter-spacing:0.333333em;margin-right:-0.333333em;}

   .address_banner{width:400px;height:240px;}
   .address_banner img{width:100%;border:0;}
   .address_con{width:400px;left:50%;top:45%;transform:translate(-50%,-50%);}
   .address_con p{text-align:center;font-size:16px;margin-top:30px;font-weight:600}
   .circle_container{width:100%;height:80px;position:relative;}
   .circle,.circle_1,.circle_2{width:32px;height:32px;border-radius:50%;
       position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);
   }
   .circle{z-index:9;background:white;}
   .circle_1{animation:fluctuate 2s linear infinite; }
   .circle_2{animation:fluctuate 2s linear 1s infinite;}
   .circle_3{
       width:24px;height:24px;border-radius:50%;background:#99ce58;z-index:10;
       position:absolute;top:12.5%;left:12.5%;transform:scale3d(0.8,0.8,0.8);
       animation:change_scale 1s linear infinite;
   }
   .circle a{display:block;z-index:999;cursor:pointer;width:32px;height:32px;opacity:0;
       border-radius:50%;position: absolute;top:0;left:0;
   }
   @keyframes fluctuate{
       0%{width:32px;height:32px;background:rgba(0,0,0,0.3);transform:translate(-50%,-50%);}
       100%{width:80px;height:80px;background:rgba(0,0,0,0.02);transform:translate(-50%,-50%);}
   }
   @keyframes change_scale{
       0%,100%{transform:scale3d(0.8,0.8,0.8);}
       50%{transform:scale3d(0.6,0.6,0.6);}
   }
</style>

<template lang="html">
    <div class="container">
    	<img src="/src/assets/images/about_img.png"/>
        <div class="content">
        	<p v-for="item in rows">{{item}}</p>
        </div>
        <div class="company_msg f15">
        	<h2 class="pb5">联系方式</h2>
            <ul class="pb10">
                <li v-for="person in contactPerson" class="ml30 pt5 pb5">
                    <span>{{person.name}}</span> :
                    <i class="ml10 mr15">电话&nbsp;&nbsp;{{person.tel}}</i>
                    <i class="inline_block w_105">微信&nbsp;&nbsp;{{person.weChat}}</i>
                    <i>QQ&nbsp;&nbsp;{{person.QQ}}</i>
                </li>
            </ul>
        	<h2 class="pb5 pt5">公司地理位置</h2>
            <div class="pb10 clear_float">
                <ul class="pb10" v-for="(company,index) in companyAddress" :class="{fl:index == 0,fr:index == 1}">
                    <li class="ml30 pt5 pb10">
                        <span class="justify4">{{company.companyName}}</span> :
                        <span class="ml5">{{company.companyAddress}}</span>
                    </li>
                    <li class="ml30 address_banner pr">
                        <img :src="`/src/assets/images/${company.pictureName}.jpg`" alt="address_picture">
                        <div class="address_con par">
                            <p>{{company.companyCity}}<br>{{company.detailsAddress}}</p>
                            <div class="circle_container pr">
                                <div class="circle">
                                    <div class="circle_3"></div>
                                    <a :href="`/src/pages/map/${company.addressHref}.html`" target="_blank"></a>
                                </div>
                                <div class="circle_1"></div>
                                <div class="circle_2"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "about",
        created(){
            this.fresh_page({
                index:2,
                username:this.$wsCache.get("username")
            });
            this.show_head_foot();
        },
        data(){
            return {
                rows : [
                	"蜂云FBA国际物流平台成立于2015年6月，由知名天使投资人、跨境电商专家、专业跨境物流庄家协同" +
                    "智能化物流ERP开发团队联合创办，是国内首家基于云计算、大数据和人工智能技术的FBA头程物流平台。" +
                    "为亚马逊卖家提供全球物流FBA配套服务，包括快递直发、空运派送、中欧铁路派送、国际海运派送等物流渠道。",
                    
                	"蜂云FBA国际物流平台通过智能化物流系统，智能化匹配报价、自动化运单生成以及物流信息全程主动跟踪推送信息。" +
                    '让亚马逊卖家"省时省力省心省钱"的发货至FBA仓库。'
                ],
                contactPerson:[
                    {name:"张先生",tel:"17365395878",weChat:"FBA339",QQ:"389028123"},
                    {name:"周先生",tel:"17365395818",weChat:"fbafyxz",QQ:"1462366700"}
                ],
                companyAddress:[
                    {
                        companyName:"上海公司",
                        companyAddress:"上海市 徐汇区 石龙路569号 1322室",
                        pictureName:"shanghaiAddress",
                        companyCity:"中国 ·上海",
                        detailsAddress:"徐汇区石龙路569号1322室",
                        addressHref:"shanghai_address"
                    },
                    {
                        companyName:"苏州分公司",
                        companyAddress:"苏州市 姑苏区 人民路3188号 A幢 1907室",
                        pictureName:"suzhouAddress",
                        companyCity:"中国·苏州",
                        detailsAddress:"姑苏区人民路3188号A幢1907室",
                        addressHref:"suzhou_address"
                    }
                ]
            }
        },
        methods:{
            ...mapMutations([
                "fresh_page",
                "show_head_foot"
            ])
        }
    }
</script>
