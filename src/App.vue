<template>
  <div id="app">
    <div class="index">
        <keep-alive >
            <router-view v-if="$route.meta.isKeepAlive"/>
        </keep-alive>
            <router-view v-if="!$route.meta.isKeepAlive"/>
    </div>    

    <tab-list></tab-list>
  </div>
</template>

<script>
import tabList from "@/components/tabList";
export default {
  name: 'App',
  components:{
    tabList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow:hidden;
  height:100% !important;
}

.index{
  width:100%;
  height:100%;
}
</style>
