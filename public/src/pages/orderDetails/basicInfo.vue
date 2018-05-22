
<template>
    <!--基本信息-->
    <div class="basic_info pb30">
        <!--方案名称-->
        <div class="pt15 pb5 bor_bot_dashed">
            <ul class="clear_float f15 color_3030">
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">方案名称 :</div>
                    <div class="fl calc_80">{{order_info.channel_name}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">订单号</span> :</div>
                    <div class="fl calc_80">{{order_info.bee_id}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_105 pr5 color_deep tr">国外物流单号 :</div>
                    <div class="fl calc_110">{{order_info.fba_waybill_num}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">运单状态 :</div>
                    <div class="fl calc_80">{{order_type | getStatus}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">创建时间 :</div>
                    <div class="fl calc_80">{{order_info.way_add_time}}</div>
                </li>
            </ul>
        </div>

        <!--仓库名称-->
        <div class="pt15 pb5 bor_bot_dashed">
            <ul class="clear_float f15 color_3030">
                <!--  <li class="fl p_33 clear_float lh25 pb10">
                      <div class="fl w_75 pr5 color_deep tr">仓库名称 : </div>
                      <div class="fl calc_80">{{order_info.warehouse_name}}</div>
                  </li> -->
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">仓库代码 :</div>
                    <div class="fl calc_80">{{order_info.fba_code}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">国家州市 :</div>
                    <div class="fl calc_80">
                        {{order_info.fba_country}} / {{order_info.fba_province}} / {{order_info.fba_city}}
                    </div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">邮编</span> :</div>
                    <div class="fl calc_80">{{order_info.fba_postcode}}</div>
                </li>
                <li class="fl p_60 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">详细地址 :</div>
                    <div class="fl calc_80">{{order_info.fba_address}}</div>
                </li>
            </ul>
        </div>

        <!--取件方式-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">取件方式</i>
            </div>
            <ul class="f15 color_3030">
                <li class="clear_float pb10" v-if="order_info.pickup_type == 1">
                    <div class="fl w_75 pr5 color_deep tr">上门取件 :</div>
                    <div class="fl calc_80 lh20 pl5 border_box">
                        请您保持联系方式的畅通，我们将会派人上门取件。
                    </div>
                </li>
                <li class="clear_float pb10" v-else>
                    <div class="fl w_75 pr5 color_deep tr">自己发货 :</div>
                    <div class="fl calc_80">
                        <ul>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">仓库地址 : </span>
                                {{ myself_address.rec_province + myself_address.rec_city + myself_address.rec_area +
                                myself_address.rec_address}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr"><span class="justify3">收货人</span> : </span>
                                {{myself_address.pk_contact_name}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">联系电话 : </span>
                                {{myself_address.pk_contact_phone}}
                            </li>
                            <li class="lh25">
                                <span class="inline_block w_75 pr5 tr">工作时间 : </span>
                                工作日 9:00 --- 17:00
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>

        <!--运单 -- 客户数据-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">运单 -- 客户数据</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">原重</span> :</div>
                    <div class="fl calc_80">{{goods_data.weightTotal}} kg</div>
                </li>
                <li class="fl p_60 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">原总体积 :</div>
                    <div class="fl calc_80">
                        {{goods_data.volumeTotal}} cm³ (长 {{goods_data.fba_lengthTotal}} cm 宽
                        {{goods_data.fba_widthTotal}} cm 高 {{goods_data.fba_heightTotal}} cm)
                    </div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">原价</span> :</div>
                    <div class="fl calc_80">{{goods_data.priceTotal}} 元</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">货品数量 :</div>
                    <div class="fl calc_80">{{goods_data.box_numTotal}} 箱</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">挂号费</span> :</div>
                    <div class="fl calc_80">{{goods_data.registered_fee}} 元</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">退件费</span> :</div>
                    <div class="fl calc_80">{{goods_data.returnable}} 元</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">赔偿金</span> :</div>
                    <div class="fl calc_80">{{goods_data.damage}} 元</div>
                </li>
            </ul>
        </div>

        <!--报关信息-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_green pt5 pb5 pl10 pr10">报关信息</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">报关总数 :</div>
                    <div class="fl calc_80">{{cus_data.cusCount}}</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">报关总重 :</div>
                    <div class="fl calc_80">{{cus_data.cusWeightTotal}} kg</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">原价</span> :</div>
                    <div class="fl calc_80">{{cus_data.priceTotal}} USD</div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify2">币种</span> :</div>
                    <div class="fl calc_80">{{cus_data.currency}}</div>
                </li>
            </ul>
        </div>

        <!--运单 -- 承运数据-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_blue pt5 pb5 pl10 pr10">运单 -- 承运数据</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">重计重</span> :</div>
                    <div class="fl calc_80">{{transfer_data.re_weight}} kg</div>
                </li>
                <li class="fl p_60 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr">重计体积:</div>
                    <div class="fl calc_80">
                        {{transfer_data.re_volume}} cm³ (长 {{transfer_data.re_length}} cm 宽 {{transfer_data.re_width}}
                        cm 高 {{transfer_data.re_height}} cm)
                    </div>
                </li>
                <li class="fl p_33 clear_float lh25 pb10">
                    <div class="fl w_75 pr5 color_deep tr"><span class="justify3">重计价</span> :</div>
                    <div class="fl calc_80">{{transfer_data.re_price}} 元</div>
                </li>
            </ul>
        </div>

        <!--附加费-->
        <div class="pt15 pb5 bor_bot_dashed" v-if="additiveFee.length != 0">
            <div class="pb10 color_white">
                <i class="inline_block bg_blue pt5 pb5 pl10 pr10">附加费</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_33 clear_float lh25 pb10" v-for="item in additiveFee">
                    <div class="fl w_100 pr5 color_deep tr">{{item.reason}} :</div>
                    <div class="fl">{{item.additive_fee}} 人民币</div>
                </li>
            </ul>
        </div>

        <!--报关信息-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_blue pt5 pb5 pl10 pr10">报关信息</i>
            </div>
            <div class="p_60 pt5 pb5 tc bg_cf5 mar_center mb10 " style="border-radius:5px;">
                <i class="inline_block mr10">报关单</i>
                <el-button type="success" class="w_100 f13 mr5"
                           :disabled="order_info.is_channel_customs == 1"
                           @click="downloadBill(order_info.channel_id)">下载
                </el-button>

                <el-upload class="inline_block" name="file" ref="uploadDataRef"
                           action="123"
                           :show-file-list="false"
                           :before-upload="uploadBefore"
                           :with-credentials="bool">
                    <el-button type="success" class="w_100 f13">上传</el-button>
                </el-upload>
            </div>
        </div>

        <!--订单备注-->
        <div class="pt15 pb5 bor_bot_dashed">
            <div class="pb10 color_white">
                <i class="inline_block bg_blue pt5 pb5 pl10 pr10">订单备注</i>
            </div>
            <ul class="clear_float f15 color_3030">
                <li class="fl p_100 clear_float pb10 pl15 color_3030">
                    {{order_info.mark}}
                </li>
            </ul>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    export default {
        name: "basicInfo",
        props: ["order_info", "goods_data", "cus_data", "transfer_data",
            "additiveFee", "fba_waybill_id", "myself_address","order_type"],
        data(){ return {bool:true} },
        methods: {
            // 文件上传之前进行检测
            uploadBefore(file) {
                let suffix = file.name.substring(file.name.lastIndexOf(".") + 1);
                if (!/xls|xlsm|xlsx|xlt/.test(suffix)) {
                    this.$message({message: "上传文件只能是 excel 格式的文档 !", type: "warning"});
                } else {
                    let formData = new FormData();
                    // 此时的 key属性 等同于 type="file" 类型的name属性
                    // formData.append("fba_customs_order", file);
                    formData.append("file", file);
                    formData.append("fba_waybill_id", this.fba_waybill_id);
                    this.$http({
                        method: "POST",
                        url: "index.php?r=fba/fba/upload-customs",
                        data: formData,
                        timeout: 8000,
                        baseURL: rootURL,
                        withCredentials: true
                    }).then((res) => {
                        if (res.data.status == 0) {
                            this.$message({message: "文件上传成功 ！", type: "success"});
                        } else {
                            this.$message({message: res.data.message, type: "warning"});
                        }
                    });
                }
                return true;
            },
            // 下载报关单
            downloadBill(channel_id){
                let query = "index.php?r=fba/fba/download-customs&channel_id=" + channel_id;
                window.location.href = rootURL + query;
            }
        },
        filters: {
            decideCurrency(param){
                switch (param) {
                    case "1": return "美元";
                    case "2": return "人民币";
                    case "3": return "日元";
                    case "4": return "欧元";
                    case "5": return "英镑";
                    case "6": return "加元";
                    case "7": return "澳元";
                    default: return "";
                }
            },
            getStatus(param){
                switch (param) {
                    case "1" : return "待付款";
                    case "2" : return "待发货";
                    case "3" : return "商户已发货";
                    case "4" : return "承运商已发货";
                    case "5" : return "已妥投";
                    case "6" : return "补差价";
                    case "7" : return "未妥投";
                    case "8" : return "退款中";
                    case "9" : return "已退款";
                    case "10" : return "已取消";
                }
            }
        }
    }
</script>
