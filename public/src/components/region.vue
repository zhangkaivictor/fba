<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*.flex_wrapper{-webkit-justify-content:space-between;justify-content:space-between;}*/
    .flex_wrapper{-webkit-justify-content:flex-start;justify-content:flex-start;}
    .region{
        border:1px solid #99ce58;padding:10px 15px;color:#303030;z-index:9999;
        border-bottom-left-radius:4px;border-bottom-right-radius:4px;
    }
    .region_title li{
        padding:0 8px;margin:0 3px -1px;border:1px solid #fff;border-bottom:1px solid #99ce58;
        border-top-left-radius:4px;border-top-right-radius:4px;cursor:pointer;transition:all 0.3s;
    }
    .region_title li:first-child{margin-left:0;}
    .region_title li.active{border:1px solid #99ce58;color:#99ce58;border-bottom:1px solid #fff;}

    .region_container li{border-radius:4px;height:30px;line-height:30px;padding:0 8px;cursor:pointer;}
    .region_container li.active{background:#99ce58;color:#fff;}
    .region_container li:hover{background:#99ce58;color:#fff;}
</style>

<template>
    <div class="region border_box f15 par bg_fff">
        <ul class="region_title border_green clear_float pl15">
            <li class="fl lh30" v-for="(item,index) in regionTitle" :class="{active: item.flag}"
                @click.stop="switchTitle(index)">{{item.name}}</li>
        </ul>
        <div class="region_container f13">
            <ul class="hotCity pt10 flex_wrapper" v-show="regionTitle[0].flag">
                <li v-for="(item,index) in hotCityData" @click.stop="operateHotCity(item,index)"
                    :class="{active: item.flag}">
                    {{item.region_name}}
                </li>
            </ul>
            <ul class="province pt10 flex_wrapper" v-show="regionTitle[1].flag">
                <li v-for="(item,index) in provinceData" @click.stop="getCityList(item,index)"
                    :class="{active: item.flag}">
                    {{item.region_name}}
                </li>
            </ul>
            <ul class="city pt10 flex_wrapper" v-show="regionTitle[2].flag">
                <li v-for="(item,index) in cityData" @click.stop="getAreaList(item,index)"
                    :class="{active: item.flag}">
                    {{item.region_name}}
                </li>
            </ul>
            <ul class="area pt10 flex_wrapper" v-show="regionTitle[3].flag">
                <li v-for="(item,index) in areaData" @click.stop="pipeData(item,index)"
                    :class="{active: item.flag}">
                    {{item.region_name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "region",
        created(){
            // 获取 省市区的 总的数据
            this.$http.get("/data/region").then( response => {
                this.regionData = response.data;
                this.getHotCity();        // 获取 热门城市数据
                this.getProvinceList();   // 获取 省 数据
            });
        },
        data () {
            return {
                regionTitle:[
                    {name:"热门城市",flag:true},
                    {name:"省份",flag:false},
                    {name:"城市",flag:false},
                    {name:"县区",flag:false}
                ],
                regionData:[],          // 总的数据
                hotCityData:[],         // 热门城市的 数据
                provinceData:[],        // 省 数据
                cityData:[],            // 市 数据
                areaData:[],            // 区 数据
                pipeParam:{             // 传递的数据对象
                    proName:"", proId:"", cityName:"", cityId:"",
                    areaName:"", areaId:"", flag:false
                }
            }
        },
        methods:{
            // 切换 标题
            switchTitle(index){
                this.regionTitle.forEach( (item,i) => { item.flag = i == index; });
            },
            // 获取 热门城市 列表
            getHotCity(){
                this.hotCityData = this.regionData.filter( item => { return item.hot == 1; });
            },
            // 获取省的 数据列表
            getProvinceList(){
                this.provinceData = this.regionData.filter( item => { return item.parent_id == 0; });
                this.cityData = [];
                this.areaData = [];
            },
            // 获取 城市数据列表
            getCityList(data,index){
                this.provinceData.forEach((item,i) =>{ item.flag = i == index; });
                this.cityData = this.regionData.filter( item => {
                    return item.parent_id == data.region_id;
                });
                this.areaData = [];
                this.pipeParam.proName = data.region_name;
                this.pipeParam.proId = data.region_id;
                // 切换到 城市模块
                this.switchTitle(2);
            },
            // 获取县区数据列表
            getAreaList(data,index){
                this.cityData.forEach((item,i) => {item.flag = i == index;});
                this.areaData = this.regionData.filter( item => {
                    return item.parent_id == data.region_id && item.region_name != "市辖区";
                });
                this.pipeParam.cityName = data.region_name;
                this.pipeParam.cityId = data.region_id;
                // 当前热门城市的 点击的 active 状态
                this.hotCityData.forEach( item => {item.flag = item.region_name == data.region_name;});
                // 切换到 县区模块
                this.switchTitle(3);
            },
            // 操作 热门城市
            operateHotCity(data,index){
                // 所有的当前的 active 全部为空
                this.regionData.forEach( item =>{ item.flag = false; });
                // 设置当前点击的 热门城市的 active
                this.hotCityData.forEach( (item,i) => {item.flag = i == index;});

                // 除了 义乌市之外 的城市的操作
                if(index < this.hotCityData.length - 1){
                    // 设置省的active
                    this.provinceData.forEach( item => {
                        if(item.region_id == data.parent_id){
                            item.flag = true;
                            this.pipeParam.proName = item.region_name;  // 获取省的 名字
                            this.pipeParam.proId = item.region_id;      // 获取省的 id
                            // 获取 当前省的 下属城市数据
                            this.cityData = this.regionData.filter( it => {
                                return item.region_id == it.parent_id;
                            });
                        }
                    });
                    // 获取当前城市下的 下属县区
                    this.areaData = this.regionData.filter( item => {
                        return item.parent_id == data.region_id && item.region_name != "市辖区";
                    });
                    this.pipeParam.cityName = data.region_name;  // 获取当前城市的 名字
                    this.pipeParam.cityId = data.region_id;      // 获取当前城市的 id
                    // 切换到 县区模块
                    this.switchTitle(3);
                }else {                             // 单独为义乌市 操作
                    let city_id = "";
                    let province_id = "";
                    this.regionData.every( item => {
                        if(item.region_id == data.parent_id){
                            city_id = item.region_id;
                            province_id = item.parent_id;
                        }
                        return item.region_id != data.parent_id;
                    });

                    this.provinceData.forEach( item => {
                        if(item.region_id == province_id){
                            item.flag = true;
                            this.pipeParam.proName = item.region_name;  // 获取省的 名字
                            this.pipeParam.proId = item.region_id;      // 获取省的 id
                            // 获取 当前省的 下属城市数据
                        }
                    });

                    this.cityData = this.regionData.filter( item => {
                        if(item.region_id == data.parent_id){
                            item.flag = true;
                            this.pipeParam.cityName = item.region_name;  // 获取当前城市的 名字
                            this.pipeParam.cityId = item.region_id;      // 获取当前城市的 id
                        }
                        return province_id == item.parent_id ;
                    });

                    // 获取当前城市下的 下属县区
                    this.areaData = this.regionData.filter( item => {
                        return item.parent_id == city_id && item.region_name != "市辖区";
                    });
                    this.areaData.forEach( (item) => {
                        item.flag = item.region_id == data.region_id;
                    });
                    this.pipeParam.areaName = data.region_name;
                    this.pipeParam.areaId = data.region_id;
                    // 切换到 县区模块
                    this.switchTitle(0);
                    this.$emit("pipeRegionData",this.pipeParam);
                }
            },
            // 传输 数据
            pipeData(data,index){
                this.areaData.forEach( (item,i) => { item.flag = i == index; });
                this.pipeParam.areaName = data.region_name;
                this.pipeParam.areaId = data.region_id;
                // 切换到 县区模块
                this.switchTitle(0);
                this.$emit("pipeRegionData",this.pipeParam);
            },
            // 重置
            resetData(){
                this.hotCityData.forEach( item => { item.flag = false; });
                this.provinceData.forEach( item => { item.flag = false; });
                this.cityData = [];
                this.areaData = [];
                // 切换到 热门城市模块
                this.switchTitle(0);
                // 重置数据
                this.pipeParam = {proName:"",proId:"",cityName:"",cityId:"",areaName:"",areaId:"",flag:false};
            }
        }
    }
</script>
