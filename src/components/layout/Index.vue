<template>
  <div>
    <el-container>
      <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
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
              <el-menu-item v-else :key="item.id" :index="item.path">{{item.title}}</el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
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
      activeIndex: "102",
      menuData: menu
    };
  },
  mounted() {},
  watch: {
    $route(to, from) {
      this.isId = to.params.id;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("我从哪里来", to.params.id, from);
    var self = this;
    next(vm => {
      vm.isId = to.params.id;
    });
  }
};
</script>
<style>
.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>