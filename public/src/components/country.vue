<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .w_50{width:50px;}
    .flex_wrapper{-webkit-justify-content:flex-start;justify-content:flex-start;}
    .country{
        border:1px solid #99ce58;padding:10px 15px;color:#303030;z-index:9999;
        border-radius:4px;border-top-left-radius:0;
    }
    .country_title li{
        padding:0 5px;margin:0 3px -1px;border:1px solid #fff;border-bottom:1px solid #99ce58;
        border-top-left-radius:4px;border-top-right-radius:4px;cursor:pointer;transition:all 0.3s;
    }
    .country_title li:first-child{margin-left:0;}
    .country_title li.active{border:1px solid #99ce58;color:#99ce58;border-bottom:1px solid #fff;}
    .country_container li{border-radius:4px;height:30px;line-height:30px;padding:0 10px;cursor:pointer;}
    .country_container li.active{background:#99ce58;color:#fff;}
    .country_container li:hover{background:#99ce58;color:#fff;}
</style>

<template>
    <div class="country border_box f15 par bg_fff w_560 region_position">
        <ul class="country_title border_green clear_float pl10">
            <li class="fl lh30" v-for="(item,index) in countryTitle" :class="{active: item.flag}"
                @click.stop="switchTitle(index)">
                {{item.name}}
            </li>
        </ul>
        <div class="f13">
            <ul class="flex_wrapper country_container pt10" v-show="nav_index == 0">
                <li v-for="(item,index) in currentData" :class="{active:item.is_show}"
                    @click.stop="pipeCountry(item,index)">
                    {{item.zh_name}}
                </li>
            </ul>
            <ul class="pt10" v-show="nav_index > 0">
                <li v-for="(item,father_index) in currentData" class="clear_float pb5">
                    <div class="fl tc w_50 color_green f16 lh30">{{item.name}}</div>
                    <ul class="fl calc_50 flex_wrapper country_container">
                        <li v-for="(child_item,child_index) in item.countryArr" :class="{active: child_item.is_show}"
                            @click.stop="pipeCountryData(child_item,father_index,child_index)">
                            {{child_item.zh_name}}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "country",
        created(){ this.initData();},
        data(){
            return {
                nav_index:0,
                countryTitle:[
                    {name:"热门国家",flag:true},
                    {name:"ABC",flag:false},
                    {name:"DEF",flag:false},
                    {name:"GHI",flag:false},
                    {name:"JKL",flag:false},
                    {name:"MNO",flag:false},
                    {name:"PQR",flag:false},
                    {name:"STUV",flag:false},
                    {name:"WXYZ",flag:false}
                ],
                pipeParam:{ countryName:"", countryCode:"", flag:false},
                countryData:[],          // 总的数据
                currentData:[]           // 当前 数据
            }
        },
        methods:{
            // 初始化数据
            initData(){
                this.$http.get("/data/country").then(response => {
                    this.countryData = response.data;
                    this.switchTitle(0);
                });
            },
            // 切换标题
            switchTitle(index){
                this.nav_index = index;
                this.countryTitle.forEach((item,i) => {
                    item.flag = i == index;
                });
                if(index > 0){
                    let titleName = this.countryTitle[index].name;
                    let len = titleName.length;
                    // 箭头函数的 this 上下文始终指向父级
                    this.currentData = Array.apply(null,{length:len}).map((item, i) => {
                        let tempObj = {name:titleName.charAt(i)};
                        tempObj.countryArr = this.countryData.filter(item => {
                            return item.first_name == tempObj.name;
                        });
                        return tempObj;
                    });
                }else {
                    this.currentData = this.countryData.filter( item => { return item.hot == 1 });
                }
            },
            // 传输 数据
            pipeCountryData(data,fi,ci){
                this.countryData.forEach( obj => { obj.is_show = false; });
                this.currentData[fi].countryArr[ci].is_show = true;
                this.pipeParam.countryName = data.zh_name;
                this.pipeParam.countryCode = data.code;
                this.$emit("pipeCountryData",this.pipeParam);
            },
            // 热门城市 传输 数据
            pipeCountry(data,index){
                this.countryData.forEach( obj => { obj.is_show = false;});
                this.currentData[index].is_show = true;
                this.pipeParam.countryName = data.zh_name;
                this.pipeParam.countryCode = data.code;
                this.$emit("pipeCountryData",this.pipeParam);
            },
            // 重置数据及 样式
            resetData(){
                this.pipeParam = {countryName:"", countryCode:"", flag:false };
                this.countryData.forEach( item => { item.is_show = false; });
                this.switchTitle(0);
            }
        }
    }
</script>
