<template>   
    <div class="animation" id="moveDiv" ref="drap" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end">   
        <img :src="address" >
    </div>
</template>


<script>
import address from "@/assets/image/view.gif";//导入图片
export default {
    data() {
        return {
            address:address,
            flags: false,
            position: { x: 0, y: 0 },
            nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
        }
    },
    mounted() {
         //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove

    },
   methods: {
        // 实现移动端拖拽
        down() {

             //点击动画时不允许home页面滚动
            $("body").addClass("show");

            this.flags = true;
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            this.position.x = touch.clientX;
            this.position.y = touch.clientY;
            this.dx = moveDiv.offsetLeft;
            this.dy = moveDiv.offsetTop;
        },
        move() {
            if (this.flags) {
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                this.nx = touch.clientX - this.position.x;
                this.ny = touch.clientY - this.position.y;
                this.xPum = this.dx + this.nx;
                this.yPum = this.dy + this.ny;
                moveDiv.style.left = this.xPum + "px";
                moveDiv.style.top = this.yPum + "px";
               
            }
        },
        //鼠标释放时候的函数
        end() {
            this.flags = false;
            //松开动画时释放home页面滚动
            $("body").removeClass("show");
        },
    }
}
</script>

<style lang="scss" scoped>
    .animation{
        position:fixed;
        top:20%;
        right:50%;
        z-index:999;
        img{
            width:80px;
            height:80px;
        }
    }

</style>
