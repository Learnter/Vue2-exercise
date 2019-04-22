<template>
    <div class="cate_global">
         <div class="cate_box">
                <div class="h_img">
                    <img :src="imgAll"></img>
                </div>
                <div class="cate_tips">
                    <span>国家馆</span>
                </div>
                <div class="g_footer">
                    <ul class="footer_ul">
                        <li class="footer_li" v-for="(item,index) in contryImg" :key="index">
                            <img :src="item.img"></img>
                        </li>
                    </ul>
                </div>
        </div>  
    </div>
</template>
<script>
import img167 from '@/assets/image/contry/167.jpg';
import img168 from '@/assets/image/contry/168.jpg';
import img169 from '@/assets/image/contry/169.jpg';
import img200 from '@/assets/image/contry/200.jpg';
import img201 from '@/assets/image/contry/201.jpg';
import img202 from '@/assets/image/contry/202.jpg';
import img203 from '@/assets/image/contry/203.jpg';
import img205 from '@/assets/image/contry/205.jpg';
import img206 from '@/assets/image/contry/206.jpg';
import img1889 from '@/assets/image/contry/1889.jpg';
import img1932 from '@/assets/image/contry/1932.jpg';
import img2031 from '@/assets/image/contry/2031.jpg';
import img2048 from '@/assets/image/contry/2048.jpg';
import img2072 from '@/assets/image/contry/2072.jpg';
import imgAll from '@/assets/image/contry/all.jpg';
export default {
    props:["cateData"],
    data:function(){
        return{
            imgAll:imgAll,
            contryImg:[
                {id:167,img: img167},
                {id:168,img: img168},
                {id:169,img: img169},
                {id:200,img: img200},
                {id:201,img: img201},
                {id:202,img: img202},
                {id:203,img: img203},
                {id:205,img: img205},
                {id:206,img: img206},
                {id:1889,img: img1889},
                {id:1932,img: img1932},
                {id:2031,img: img2031},
                {id:2048,img: img2048},
                {id:2072,img: img2072}
            ]
        }
    },
    computed:{
        sortData(){
            return this.cateData.slice(1,this.cateData.length);      
        }
    },
    created() {
    }
}
</script>
<style scoped>
    .cate_global{
        width:100%;
        height:100%;
        
    }
    .cate_box{
        width:103%;
        height:100%; 
        padding:2rem 2rem 0;
        box-sizing:border-box;
        overflow-y:scroll;      
    }

    .h_img{
        width:100%;
        height:10rem;
    }
    .h_img>img{
        width:100%;
        height:100%;
        border-radius:3px;
    }
    .g_footer{
        width:100%;
        height:100%;
    }

    .footer_ul{
        width:100%;
        height:100%;
        display:flex;
        flex-wrap:wrap;
    }
    .footer_li{
        width:50%;
        height:13rem;
        padding:0.3rem;
        box-sizing:border-box;
    }
    .footer_li>img{
        width:100%;
        height:100%;
        border-radius:3px;
    }
    .cate_tips{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        color:black;
        margin:0.6rem 0 0.2rem 0;
    }
</style>
