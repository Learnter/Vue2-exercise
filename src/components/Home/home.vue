<template>
    <div class="home"  >
        <!--一键回顶-->
        <isTop v-show="backTop" @click.native="returnTop"></isTop>
        <photos></photos>

        <div class="home_main" ref="home">
            <!--搜索框--> 
            <div class="searchBox" v-if="isShow">
                <div class="searchTop"  @click="$router.push({name:'Search_box'})">
                    <i class="iconfont searchI">&#xe609;</i>
                    <div>搜索喜欢的宝贝</div>
                </div>  
                <span>注册</span>
            </div>
            <!--轮播图-->
            <div class="swiper">      
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index ) in swiperSlides" :key="index">
                        <img @click = "$router.push({path:'/activity/templace1',query:{id:item.rule.adid,title:item.title}})" :src="item.img" alt="加载失败"></img>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>

            <!--公告框-->
            <div class="notice">

                <span>NOTICE</span>

                <div class="text-container" >
                    <transition class="inner-container2" name="slide" mode="out-in">
                        <p class="notice_list" :key="text.id">{{text.val}}</p>
                    </transition>
                </div>

            </div>

            <!--新品专区-->
            <div class="newArrival">
                 <div class="newA_top">
                    <ul>
                        <li>
                            <img v-for="(item,index) in newTop " :key="index" @click ="$router.push({path:'/activity/templace2',query:{id:item.adid,title:item.title}})":src="item.img"></img>   
                        </li>
                    </ul>  
                 </div>
                 <div class="newA_bottom">
                     <ul>
                         <li v-for="(item,index) in newBottom" :key="index">
                            <p class="newArrTitle">{{item.title}}</p>
                            <p class="newArrSub">{{item.subtitle}}</p>
                            <img @click="$router.push({path:'/activity/templace4',query:{id:item.adid,title:item.title}})" v-lazy="item.img"></img>
                         </li>
                     </ul>
                 </div>

                       
            </div>

            <!--热卖专区-->
                <div class="hostSale">
                            <h1 class="tips">超值热卖</h1>
                            <ul>
                                <li @click ="$router.push({path:'/activity/templace3',query:{id:item.adid,title:item.title}})" v-for="(item,index) in hostSale" :key="index">
                                    <div class="hostList">
                                        <img v-lazy="item.img"></img>
                                        <p class="newArrTitle">{{item.title}}</p>
                                        <p class="newArrSub">{{item.subtitle}}</p>
                                    </div>   
                                </li>
                            </ul>
                </div>

                <!--底部提示-->
                <div class="bottomTips" v-if="bottomTips">
                        <p>亲!已经到底了哦</p>
                </div>
        </div>    
    </div> 
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import search from "@/components/common/search";
import isTop from "@/components/Common/isTop";
import vueSeamlessScroll from 'vue-seamless-scroll';/*公告栏插件*/
import photos from "../Common/Searchbox/animation";

export default {
    data:function(){
        return{
            isShow:false,
            number:0,
            count:1,/*上拉时加载获取数据*/
            backTop:false,/*回顶组件显示切换*/
            bottomTips:false,/*底部加载完成组件切换*/
            scrollPosition:0,/*页面滚动的距离*/
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay:{
                    delay:5000
                }
            },
            swiperSlides:[],
            notice:[{id:0,title:""}],
            newArrival:[],
            hostSale:[]

        }
    },
    components:{
        swiper,
        swiperSlide,
        search,
        isTop,
        vueSeamlessScroll,
        photos
    },
    computed: {
        text() {
            return {
                id: this.number,
                val: this.notice[this.number].title
            }
        },
        newTop(){
            return this.newArrival.slice(0,3);
        },
        newBottom(){
            return this.newArrival.slice(3);
        }

    },
    created() {
        
        //轮播图数据
        this.getSwiperSlides();

        //公告框数据
        this.getNotice();

        //新品专区数据
        this.getNewArrival();
        
        //热卖专区数据
        this.getHostSale();

        this.$nextTick(function(){
            this.isShow = true;
        })

    },
    mounted() {
         document.addEventListener("scroll",this.handleScroll,false);
         this.startMove();
    },
    methods:{
        startMove() {
            var _this = this;
            let timer = setTimeout(()=> {
                if(_this.number === 1) {
                    _this.number = 0;
                } else {
                    _this.number += 1;
                }
                _this.startMove();
            },5000);
        },
        handleScroll(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollPosition = scrollTop;
            if(scrollTop > 500){
                /*显示回顶组件*/
                this.backTop = true;
                if(scrollTop + window.innerHeight >= document.documentElement.scrollHeight-1){
                        this.count+=1;
                        this.getHostSale();
                        /*显示底部加载完成组件*/
                        this.bottomTips = true;
                }

            }else{
                this.backTop = false;
            }
        },
        returnTop(){
               document.documentElement.scrollTop = 0;
               this.backTop = false;
                },
        getHostSale(){

            var _this = this;

            var url = "https://www.dshui.cc/adwap/loadAdsByPadid?padid=6&pageNo=" + this.count + "&token=";

            this.$axios.get(url).then(hostSale => {
            
                    var newArr = _this.hostSale.concat(hostSale.data.data);
                    _this.hostSale = newArr;              
            })
        },
        getNewArrival(){
            var _this = this;
            var url = "https://www.dshui.cc/adwap/loadAds?adids=1%7C2%7C3%7C4%7C5&token=";
            this.$axios.get(url).then(newArrival => {
                 _this.newArrival = newArrival.data.data;
            })
        },
        getNotice(){
            var _this = this;
            var url = "https://www.dshui.cc/newswap/listNewsTops?&token=";
            this.$axios.get(url).then(function(notice) {
                _this.notice = notice.data.data;
                
            });
        },
        getSwiperSlides(){
            var _this = this;
            var url = "https://www.dshui.cc/adwap/listAllAdSlide?platform=wap&token=";
            this.$axios.get(url).then(swiper => {
                _this.swiperSlides = swiper.data.data;
            });
        },
    },
    activated() {   
        if(this.scrollPosition > 0){
            this.$refs.home.scrollTop = this.scrollPosition;
        }
    },
    destroyed() {
        this.$refs.home.removeEventListener("touchmove", this.handleScroll, false);
    }
}
</script>
<style lang="scss" scoped>
        .slide-enter-active,
        .slide-leave-active {
            transition: all 1.3s ease;
        }

        .slide-leave-to {
            transform: translateY(-10px);
            opacity: 0;
        }

        .slide-enter {
            transform: translateY(10px);
            opacity:0;
        }
    .home{
            height: 100%;
            max-width:640px;
            margin:0 auto;
            position: relative;
       .home_main{
            background: #f4f4f4;
            overflow:hidden;
            min-height: 100%;     
        .searchBox {
            width:100%;
            height:50px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:0 1rem;
            box-sizing:border-box;
            .searchTop{
                width:80%;
                height:80%;
                border-radius:8px;
                padding-left:1rem;
                box-sizing:border-box;
                display:flex;
                justify-content:flex-start;
                align-items:center;
                background:#F0F0F0;

            }
          }
          .swiper{
              width:100%;
              img{
                  width:100%;
                  height:100%;
              }
          }
          .notice{
            width:100%;
            height:40px;
            font-size:1.3rem;
            display:flex;
            justify-content: flex-start;
            align-items:center;
            background:whitesmoke;
            span{
                color:black;
                font-size:1.8rem;
                width:25%;
                font-weight:bold;
                display:flex;
                justify-content:flex-end;
                align-items:center;
                box-sizing:border-box;
                padding-right:10px;
                border-right:1px solid gray;
            }
            .text-container{
                width:75%;
                height:100%;
                box-sizing:border-box;
                padding-left:20px;
                display:flex;
                justify-content:center;
                align-items:center;
                .notice_list{
                    width:100%;
                    overflow:hidden;
                    white-space:nowrap;
                    display:block;
                    text-overflow:ellipsis;
                }
            }
          }
          .newArrival{
            width:100%;
            padding:0 2%;
            box-sizing:border-box;
            .newA_top{
                width:100%;
               li{
                    height:150px;
                    display:flex;
                    justify-content:space-between;
                    overflow:hidden;
                    img{
                        width:33.33%;
                        box-sizing:border-box;
                    }
                }
            }
            .newA_bottom{
                width:100%;
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
                text-align:left;
                
                img{
                    width:100%;
                }
            }
          }
          .hostSale{
            width:100%;
            padding:0 2%;
            box-sizing:border-box;
            .tips{
                font-size:2rem;
                color:black;
                font-weight:bold;
                margin:15px 0;
            }
            .hostList{
                width:100%;
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:flex-start;
                border-bottom: 1px  solid gray;
                margin-top:10px;
                img{
                     width:100%;
                }
            }
          }
       }
    }  
    .newArrTitle {
        padding-top:10px;
        font-weight: bold;
        font-size: 1.5rem;
        color: black;
    }

    .newArrSub {
        font-size: 1.3rem;
        margin: 10px 0 10px 0;
    }

    .bottomTips{
         width:100%;
         height:30px;
         background-color:lavenderblush;
         color:rebeccapurple;
         font-size:1.5rem;
         display:flex;
         justify-content:center;
         align-items:center;
     }
</style>
