<template>
  <div>
    <el-scrollbar style="height:100%;">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        style="height:100vh;width:230px;float:left;overflow-y:auto;"
        router
      >
       <template v-for="item in menuData">
          <NavMenu v-if="item.children&&item.children.length>0" :item="item" :key="item.id"></NavMenu>
          <el-menu-item
            v-else
            :key="item.id"
            :index="item.path"
          >{{item.title}}</el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
    <router-view></router-view>
  </div>
</template>

<script>
import menu from "@/assets/menu.json";
export default {
  components: {
    NavMenu: () => import("@/components/layout/NavMenu") //菜单
  },
  data() {
    return {
      activeIndex: "",
      menuData: menu
    };
  },
  mounted() {}
};
</script>
<style scoped>
</style>