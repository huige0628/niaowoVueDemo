<template>
  <!-- <el-submenu :index="navMenu.id.toString()" :key="navMenu.id" v-for="navMenu in navMenus">
      <el-menu-item
        v-if="!navMenu.children"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.title"
      >
        <span slot="title">{{navMenu.title}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.children" :key="navMenu.id" :index="navMenu.id.toString()">
        <template slot="title">
          <span>{{navMenu.title}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
  </el-submenu>-->

  <el-submenu :index="item.id.toString()">
    <template slot="title">
      <i :class="item.icon" v-if="item.icon"></i>
      <span>{{item.title}}</span>
    </template>
    <template v-for="node in item.children">
      <NavMenu v-if="node.children&&node.children.length>0" :item="node" :key="node.id"></NavMenu>
      <el-menu-item
        v-else
        :key="node.id"
        :index="node.path"
        @click="onItemClick(node)"
      >{{node.title}}</el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "NavMenu",
  //props: ["navMenus"],
  props: {
    item: { type: Object, default: null }
  },
  data() {
    return {};
  },
  methods: {
      onItemClick(item) {
      //this.menuItemClick(item);
    }
  },
  mounted() {
    //console.log(this.navMenus);
  }
};
</script>

<style>
</style>