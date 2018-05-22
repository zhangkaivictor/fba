<style scoped>
	.problems dt{line-height: 54px;color: #b4db85;margin-top: 20px;font-size: 20px;}
	.problems dd{line-height: 24px;color: #5e5e5e;padding: 0 40px;text-align:justify;}
</style>
<template>
    <div class="container">
    	<!--状态导航-->
        <div class="info_bar bor_bot_solid f15 color_3030 mb5">
            <div class="inline_block lh30 mr15 cursor pr active">注册使用</div>
        </div>
       <dl v-for="(item,index) in rows" class="problems border_box f16 ">
	       	<dt>{{index + 1 + '、' +item.name}}</dt>
	       	<dd v-for="child_time in item.content">{{child_time}}</dd>
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
                		name : "如何注册？",
                		content : [
                			"在蜂云系统注册界面，用户可以使用手机号进行注册，注册完成后需完善【企业信息】，以便于以管理企业形式账号。"
                		]
                	},
                	{
                		name : "要完善资料？",
                		content : [
                			"注册完毕后完善【发货人】与【收件人（仓库）】信息，此信息将在下单发货时使用。"
                		]
                	},
                	{
                		name : "如何推荐渠道？",
                		content : [
                			"用户输入查价条件后，系统将为用户推荐【优质渠道】最多4条以供选择，用户可以选择其中之一进行下单操作。"
                		]
                	},
                	{
                		name : "何时支付？",
                		content : [
                			"货运订单会在不同阶段需要用户及时进行【支付】或者【补差价支付】，如因用户自身未及时【支付】而导致订单延误，蜂云平台概不负责。"
                		]
                	},
                	{
                		name : "关于测量误差？",
                		content : [
                			"货物在交予物流承运商后，承运商会对货物进行标准测量，如测量结果与用户提交的数据存在误差，请以承运商的测量结果为准。如因此而产生【补差价支付】，请用户及时支付，用户未及时【支付】而导致订单延误，蜂云平台概不负责。"
                		]
                	},
                	{
                		name : "消息通知重要吗？",
                		content : [
                			"蜂云平台的【通知系统】会将货运订单的订单状态及物流状态实时更新，如【支付】通知，请及时查看。"
                		]
                	},
                	{
                		name : "人工帮助？",
                		content : [
                			"若需人工帮助，请及时联系【张先生17365395878】。"
                		]
                	}
                ]
            }
        }
    }
</script>
