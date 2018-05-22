<style scoped>
    .sys_info_list li {
        height: 56px;
        line-height: 56px;
        border-bottom: 1px dashed #e4e4e4;
    }
</style>

<template>
    <div class="modify_password">
        <div class="title_bar lh40 bor_bot_solid">
            <div class="title_title inline_block color_green pr f16">
                系统消息
            </div>
        </div>
        <div class="pt20 f15 ml20 mr20">
            <div class="lh10 bor_bot_dashed"></div>

            <!--信息数据列表-->
            <ul class="sys_info_list color_3030">
                <li class="clear_float" v-for="(item,index) in currentInfo" :key="index">
                    <div class="fl border_box tl pl15 f15" :class="{color_deep: item.order_status == 4}">
                        <span class="pr10">{{item.content}}</span>
                    </div>
                    <div class="fr border_box tr pr15 color_deep f13">
                        {{item.msg_release_time}}
                    </div>
                </li>
            </ul>

            <div class="pt120 pb50 tc color_deep f40" v-show="currentInfo.length == 0"> 暂无系统信息 ！</div>

            <!-- 分页列表 -->
            <div class="tc pb20 pt50">
                <el-pagination background layout="pager"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="currentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from "vuex"
    export default {
        name: "systemInfo",
        created(){
            if(!this.$wsCache.get("user_id")) this.$router.push("/login");
            this.fresh_per_page({index: 1});
            this.$ajax.post("index.php?r=fba/fba/message-list",{}, data => {
                if(data.status == 0){
					this.infoData = data.data.data;
                    this.total = this.infoData.length;
                }else {
                    console.log(data.message);
                }
            });
        },
        data() {
            return {
                total: 0,        // 总的订单数量
                pageSize: 10,    // 设置每页的数据条数 10条
                currentPage: 1,  // 默认开始页面 第1页
                infoData:[]      // 信息数据
            }
        },
        computed: {
            currentInfo(){
                return this.infoData.slice(
                    (this.currentPage - 1) * this.pageSize,
                    this.currentPage * this.pageSize
                );
            }
        },
        methods: {
            ...mapMutations([
                "fresh_per_page"
            ]),
            currentChange(currentPage){
                this.currentPage = currentPage;
            }
        }
    }
</script>
