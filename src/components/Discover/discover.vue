<template>
  <div class="discover">   
    <div class="main" ref="activity">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  topDropText="" topPullText="" topLoadingText="" :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div class="main_box">
                    <ul class="box_ul">
                        <li class="box_li" v-for="(item,index) in discover_Data" :key="index" >
                           <div class="list_top">
                                <img :src="item.tpcauthor.headpic"></img>
                                <div> 
                                    <p>{{item.tpcauthor.nickname}}</p>
                                    <p>{{item.uptime}}</p>
                                </div>
                           </div>
                           <div class="list_bottom">
                               <p>{{item.title}}</p>
                               <p>{{item.content}}</p>
                               <div class="picurl">
                                   <ul>
                                       <li v-for="(item,index) in item.tpcpicList" :key="index">
                                           <img :src="item.picurl"></img>
                                       </li>
                                   </ul>
                               </div>
                               <p class="rpicurl" @click ="$router.push({path:'/activity/templace3',query:{id:item.adid,title:item.title}})">
                                   <img :src="item.rpicurl"></img>
                                   <span>{{item.rtitle}}</span>
                               </p>
                               <p class="zan">
                                   <i></i>
                                   <span>{{item.tpczan.zan}}</span>
                               </p>
                           </div>
                        </li>
                    </ul>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !=='loading'">
                        <span v-show="allLoaded">没有更多数据了</span>
                        <span v-show="!allLoaded">加载更多...</span>
                    </span>
                </div>
        </mt-loadmore>
     </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            allLoaded:false,
            bottomStatus:'',
            pageNumber:1,
            discover_Data:[]
        }
    },
    created() {
        this.fetchData();
    },
    mounted() {

    },
    methods:{
        fetchData(){
            var url = "https://www.dshui.cc/tpcwap/list?pageNo="+this.pageNumber+"&token=";
            this.$axios.get(url).then( result => {
                if(result && result.data.data){
                    var data = result.data.data;
                    if(data.length > 0){
                     this.discover_Data = this.discover_Data.concat(result.data.data);
                    }else{
                        this.allLoaded = true;
                    }
                }
            }).catch(error =>{
                console.log("discover模块报错"+error);
            })
        },
        loadBottom(){
            if (!this.allLoaded) {
                this.$refs.loadmore.onBottomLoaded();
                this.pageNumber++;
                this.fetchData();
            }
        },
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
            if(status == "loading"){
                this.$refs.loadmore.onBottomLoaded();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .discover{
        position:absolute;;
        left:0;
        top:0;
        right:0;
        max-width:640px;
        margin:0 auto;
        bottom:64px;
        background:#F0F0F0;
        font-size:1.5rem;
        overflow:hidden;
        .main{
            width:100%;
            height:100%;
            padding-right:2%;
            overflow-y:scroll;
            .main_box{
              width:100%;
              height:100%;
              .box_li{
                    width:100%;
                    height:100%;
                    padding:10px 10px 0;
                    box-sizing:border-box;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    align-items:flex-start;
                    text-align:left;
                    background:white;
                    margin-bottom:10px;
                    overflow:auto;
                    .list_top{
                        width:100%;
                        height:50px;
                        display:flex;
                        justify-content:flex-start;
                        align-items:center;
                        margin-bottom:10px;
                        img{
                            // width:5rem;
                            // height:5rem;
                            max-width:50px;
                            max-height:50px;
                            border-radius:50%;
                        }
                        div{
                            height:100%;
                            flex:1;
                            display:flex;
                            flex-direction:column;
                            justify-content:space-between;
                            align-items:flex-start;
                            padding-left:10px;
                            p:nth-child(1){
                                font-size:2rem;
                                color:black;
                            }
                            p:nth-child(2){
                                font-size:1.5rem;
                                color:gray;
                            }
                        }
                    };
                    .list_bottom{
                        width:100%;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        align-items:flex-start;
                        p:nth-child(1){
                            padding:3px;
                            box-sizing:border-box;
                            color:red;
                            font-size:1.3rem;
                            border:1px solid red;
                            
                        };
                        p:nth-child(2){
                            width:100%;
                            word-break:break-all;
                            line-height:22px;
                            margin:10px 0;
                        }
                    };
                    .picurl{
                        width:100%;
                        ul{
                            width:100%;
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            overflow:hidden;
                            li{
                                width:33%;
                                img{
                                    width:100%;
                                    height:100%;
                                  }
                              }
                          } 
                       }
                     .rpicurl{
                         width:100%;
                         height:5rem;
                         display:flex;
                         justify-content:flex-start;
                         align-items:center;
                         font-size:1.4rem;
                         color:black;
                         background:#F0F0F0;
                         margin:10px 0;
                         img{
                             width:5rem;
                             height:100%;
                             padding:5px;
                             box-sizing:border-box;   
                         }
                         span{
                             white-space:nowrap;
                             text-overflow:ellipsis;
                             overflow:hidden;
                         }
                     }
                  .zan{
                      width:100%;
                      padding:10px 0;  
                      border-top:1px solid #F0F0F0;
                      box-sizing:border-box;
                      display:flex;
                      justify-content:flex-end;
                      align-items:center;
                  }
                }
            }
        }
    }
</style>
