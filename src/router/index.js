import Vue from 'vue'
import Router from 'vue-router'

/*普通的路由加载*/
// import Home from "@/components/Home/home";/*首页*/
// import Category from "@/components/Category/category";/*分类页*/
// import Cate_goods from "@/components/Category/Product/cate_goods";/*列表页*/
// import Search_box from "@/components/Common/Searchbox/searchbox";/*搜索页*/
// import Shop_cart from "@/components/ShopCart/shopCart";/*购物车页*/
// import Detail from "@/components/Common/Detail_page/detail";/*详情页*/
// import UserReview from "@/components/Common/Detail_page/review/userReview";/*用户评论页*/


/*路由懒加载第一种方式*/
// const Home = resolve => require(["@/components/Home/home"],resolve);
// const Category = resolve => require(["@/components/Category/category"],resolve);
// const Cate_goods = resolve => require(["@/components/Category/Product/cate_goods"],resolve);
// const Search_box = resolve => require(["@/components/Common/Searchbox/searchbox"],resolve);
// const Shop_cart = resolve => require(["@/components/ShopCart/shopCart"],resolve);
// const Detail = resolve => require(["@/components/Common/Detail_page/detail"],resolve);
// const UserReview = resolve => require(["@/components/Common/Detail_page/review/userReview"],resolve);

/*路由懒加载第二种方式 可以通过第三个参数将几个js文件合并在一起*/
const Home = r => require.ensure([], () => r(require('@/components/Home/home')), 'home')
const Category = r => require.ensure([], () => r(require('@/components/Category/category')), 'category')
const Cate_goods = r => require.ensure([], () => r(require('@/components/Category/Product/cate_goods')), 'cate_goods')
const Search_box = r => require.ensure([], () => r(require("@/components/Common/Searchbox/searchbox")), 'searchbox')
const Shop_cart = r => require.ensure([], () => r(require('@/components/ShopCart/shopCart')), 'shopCart')
const Detail = r => require.ensure([], () => r(require('@/components/Common/Detail_page/detail')), 'detail')
const UserReview = r => require.ensure([], () => r(require('@/components/Common/Detail_page/review/userReview')), 'userReview')
const Templace1 = r => require.ensure([], () => r(require('@/components/Activity/templace1')),"templace1")
const Templace2 = r => require.ensure([], () => r(require('@/components/Activity/templace2')),"templace2")
const Templace3 = r => require.ensure([], () => r(require('@/components/Activity/templace3')),"templace3")
const Templace4 = r => require.ensure([], () => r(require('@/components/Activity/templace4')),"templace4")

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/firstPage"
    },{
      path:"/firstPage",
      name:"Home",
      component:Home,
      meta:{
        name:"首页",
        isKeepAlive:true
      }
    },{
      path:"/category",
      name:"Category",
      component:Category,
      meta: {
        name:"分类",
        isKeepAlive:true
      }
    },{
      path:"/cate_goods",
      name:"Cate_goods",
      component: Cate_goods,
      meta: {
        name:"列表页",
        isKeepAlive:true,
        isUserCache:false
      }
    },
    {
      path:"/shop_cart",
      name:"Shop_cart",
      component: Shop_cart,
      meta: {
        name:"购物车",
        isKeepAlive:true
      }
    },
    {
      path:"/search_box",
      name:"Search_box",
      component:Search_box,
      meta:{
          name:"搜索页",
          isKeepAlive:false
      }
    },
    {
      path:"/detail",
      name:"Detail",
      component:Detail,
      props:true,
      meta:{
        name:"详情页",
        isKeepAlive:false,
        isUserCache:false
      }
    },
    {
      path:"/userReview",
      name:"UserReview",
      component:UserReview,
      props:true,
      meta:{
        name:"用户评论",
        isKeepAlive:false
      }
    },
    {
      path:"/activity/templace1",
      name:"Templace1",
      component:Templace1,
      meta:{
        name:"轮播活动页",
        isUserCache:false,
        isKeepAlive:true,
        
      }
    }, {
      path: "/activity/templace2",
      name: "Templace2",
      component: Templace2,
      meta: {
        name: "轮播活动页2",
        isKeepAlive: false
      }
    }, 
    {
      path: "/activity/templace3",
      name: "Templace3",
      component: Templace3,
      meta: {
        name: "轮播活动页3",
        isKeepAlive: false
      }
    },
    {
      path: "/activity/templace4",
      name: "Templace4",
      component: Templace4,
      meta: {
        name: "轮播活动页4",
        isKeepAlive: true,
        isUserCache:false
      }
    }
  ]
})
