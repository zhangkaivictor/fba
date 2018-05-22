<style scoped>
    .problems dt{line-height: 54px;color: #b4db85;margin-top: 20px;font-size: 20px;}
    .problems dd{line-height: 24px;color: #5e5e5e;padding: 0 40px;text-align:justify;}

</style>
<template>
    <div class="container">
    	<!--状态导航-->
        <div class="info_bar bor_bot_solid f15 color_3030 mb5">
            <div class="inline_block lh30 mr15 cursor pr active">常见问题</div>
        </div>
       <dl v-for="(item,index) in rows" class="problems border_box f16">
	       	<dt>{{(index + 1) + '、' + item.name}}</dt>
	       	<dd v-for="child_time in item.content" v-html="child_time"></dd>
       </dl>
    </div>
</template>
<script>
    export default {
        name: "",
        data(){
            return {
                rows: [
                	{
                		name : "【关税】如何查询亚马逊各站点所在国的产品进口关税税率？",
                		content : [
                			"欧洲产品进口关税查询：<a href='http://ec.europa.eu' class='deco' target='_blank'>http://ec.europa.eu</a>",
                			"美国产品进口关税查询：<a href='https://hts.usitc.gov' class='deco' target='_blank'>https://hts.usitc.gov</a>",
                			"加拿大产品进口关税查询：<a href='http://www.cbsa-asfc.gc.ca' class='deco' target='_blank'>http://www.cbsa-asfc.gc.ca</a>",
							"日本产品进口关税查询：<a href='http://www.customs.go.jp' class='deco' target='_blank'>http://www.customs.go.jp</a>",
							"澳洲产品进口关税查询：<a href='https://ftaportal.dfat.gov.au' class='deco' target='_blank'>https://ftaportal.dfat.gov.au</a>"
                		]
                	},
                	{
                		name : "【FBA空运】空运时带磁性货物怎么处理？",
                		content : [
                			"带磁性货物不属于普通货物，因磁场的干扰可能影响飞行安全，所以航空公司要求带磁性的货物必须出具磁性检测报告，" +
                            "合理才可以上飞机。磁性检测报告有如下要求：",
                			"1、磁性报告是一次性报告，不可以多次使用。",
							"2、无磁性货物和磁性货物混装的，必须全部货物都要做磁性鉴定，不可以只是带磁性的货物做鉴定。",
							"3、磁性鉴定报告不可以提前做，必须货到机场现场测量后才能做，报告出具时间约2个小时。",
							"4、磁检费1元/kg或者20/箱+200操作费。"
                		]
                	},
                	{
                		name : "【FBA头程】空加派、海加派、快递分别是什么意思？有何区别？",
                		content : [
                			"跨境电商发展推动电商物流发展，逐步衍生出空派和海派的做法，和传统国际快递一样，都是跨境门到门的物流服务；",
                			"空加派，头程干线运输采用国际空运，目的国清关采用一般贸易或快件2种方式，再使用本地卡车或本土快递送上门的物流服务，" +
                            "可以理解成国际快递的草根板；",
							"海加派，头程干线运输采用国际海运，目的国清关采用一般贸易方式，再使用本地卡车或本土快递送上门的物流服务；",
							"国际快递，干线运输采用国际空运，目的国清关采用快件报关方式，本地使用快递送到门。相比空加派的稳定性和时效性都更高；"
                		]
                	},
                	{
                		name : "【FBA头程】产品去美国，产品上需要有made in china 的字符么？",
                		content : [
                			"是的，不管是产品标签还是箱唛都需要贴上”made in china“产地标签。个别线路不做强要求。"
                		]
                	},
                	{
                		name : "【国际快递】常见禁止限制投寄物品有哪些？",
                		content : [
                			"危险品：枪支弹药，武器，毒品，易燃易爆物品（打火机，汽油，蜡烛，燃气罐）",
                			"违禁品：膏状粉末液体等化工产品，印刷书籍，淫秽物品，宗教用品，动植物, 动物制品及纪念品，象牙、鱼翅、" +
                            "动物残骸，或者不是供人消费的动物副产品和衍生品, 人类遗体或者骨灰, 金条（以及任何贵金属）, 现金（现行的法定货币）, " +
                            "未镶嵌的钻石、宝石,非法物品麻醉毒品等航空禁运物仿牌及侵权：已在海关处备案的品牌" +
                            "（LV ，COACH MK， GUCCI，ADIDAS、PRADA、Rolex（劳力士） 、UGG、HERMES、Dior、Chanel、Armani（阿玛尼)、 " +
                            "New Balance、Jordan(乔丹)等），蓝牙标识，微软标识",
                			"其他：食品，电子烟，矿物质，",
                			"反倾销类;医疗，光碟，U盘，硒鼓，墨盒，彩印/印章，原木制品，压缩机（空调、冰箱），" +
                            "刀具（包装合格的厨具除外），代步车，平衡车，泵，瞄准镜。"
                		]
                	},
                	{
                		name : "【海关】如何理解产品的海关编码（HS Code），编码归类的主要依据是什么？",
                		content : [
                			"海关编码其实是依据《商品名称及编码协调制度的国际公约》（简称HS），用科学系统的方法将商品分类。" +
                            "HS采用六位数编码，把全部国际贸易商品分为22类，98章。章以下再分为目和子目。商品编码第一、二位数码代表“章”，" +
                            "第三、四位数码代表“目”（Heading），第五、六位数码代表“子目”（Subheading）。前6位数是HS国际标准编码，" +
                            "后2-4位数是各个国家海关按照实际情况再进行延伸，所以大家才会常说前6位海关编码是国际通用的。"
                		]
                	},
                	{
                		name : "【海运】国内报关哪些产品需要做商检，哪些产品需要做熏蒸？",
                		content : [
                			"现在只有木制品需要商检，其他都免检，除了灯具带木，还有乐器，其他带木都要检；" +
                            "是否要做熏蒸一般有目的地国家要求，据统计所有原木产品去任何国家都需要做熏蒸。"
                		]
                	},
                	{
                		name : "【报关】申报和实际不符会有影响吗？",
                		content : [
                			"需按规则申报，如低或高申报都有可能会被罚款或者到了目的地也可能被查导致二次清关。"
                		]
                	},
                	{
                		name : "【美国专线】哪些产品在美国会涉及FDA？",
                		content : [
                			"FDA是美国食品药品监督管理局（Food and Drug Administration）的简称，所有与人体直接接触" +
                            "或则跟食物接触的产品都可能涉及FDA认证。 FDA认证分强制认证和非强制认证两种。 " +
                            "FDA强制认证的必须提供FDA注册证明，常见的产品有太阳镜，陶瓷产品，体温计，血压计的医疗相关产品。 " +
                            "非强制认证的产品只需要提供产品制造商息和收发货人信息，由报关行提供给FDA备案，审查就可以通过。" +
                            "常见产品有厨房用具，水杯等。"
                		]
                	},
                	{
                		name : "【清关】美国哪些产品清关需要提供相应文件？",
                		content : [
                			"美国大部分产品清关都比较正常，但是凡是涉及直接跟人体密切接触的产品很多需要认证；" +
                            "纺织品、鞋类、蓝牙、HDMI、木制品、玩具、大件电器等产品需提供相应进口文件，" +
                            "品牌产品需提供有效的授权书，具体操作说明或咨询相应客服人员。"
                		]
                	},
                	{
                		name : "US—FBA货物每箱限重是多少？如果超重了怎么办？",
                		content : [
                			"答：美国站：在一个包裹中，如果包含了多件货物不能超过50英镑；" +
                            "如果一件货物超过50英镑需要单独配送而且需要注明，在顶部和边上注明team lift。"
                		]
                	}
                ]
            }
        }
    }
</script>
