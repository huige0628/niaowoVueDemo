<template>
  <div class="page">
    <!-- head -->
    <SimpleHead @on-search="reloadTable(true)" @on-expand="onExpand" :model="filter">
      <template slot="button">
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button-group>
            <el-button type="success" icon="el-icon-plus" @click="add">添加</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" @click="edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="remove">删除</el-button>-->
          </el-button-group>
        </el-form-item>
      </template>
      <!-- 默认搜索项 -->
      <el-form-item>
        <el-input v-model="filter.name" placeholder="货币名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.code" placeholder="国际代码" clearable></el-input>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10" :autoLoad="false">
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="platformName" label="平台"></el-table-column>
      <el-table-column prop="shopName" label="店铺"></el-table-column>
      <el-table-column prop="site" label="站点"></el-table-column>
      <el-table-column prop="authStatus" label="授权状态"></el-table-column>
      <el-table-column prop="enabled" label="是否启用"></el-table-column>
      <el-table-column prop="tokenExpire" label="授权过期时间"></el-table-column>
      <el-table-column prop="managerUserName" label="负责人"></el-table-column>
      <el-table-column prop="operate" label="操作" width="120">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(scope.row)"
              title="编辑"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="remove(scope.row)"
              title="删除"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </SimpleTable>
    <!-- 添加编辑 -->
    <AddEdit ref="edit" @on-ok="reloadTable" />
  </div>
</template>

<script>
//import { getList, remove } from "@/api/sys/role";
export default {
  name: "Shop",
  components: {
    SimpleHead: () => import("@/components/common/SimpleHead"), //头部组件
    SimpleTable: () => import("@/components/common/SimpleTable"), //表格组件
    AddEdit: () => import("./AddEdit"), // 添加编辑
  },
  data() {
    return {
      tableUrl: '#',
      // 过滤项
      filter: {
        name: null,
        code: null
      }
    };
  },
  methods: {
    reloadTable(again) {
      this.$refs.table.reload(again);
    },
    onExpand() {
      this.$refs.table.resize();
    },
    treeNodeClick(data) {
      this.filter.orgId = data.id;
      this.reloadTable();
    },
    add() {
      this.$refs.edit.open();
    },
    edit(row) {
      
      this.$refs.edit.open(row);
    },
    remove(row) {
      
      this.$confirm("确定要删除吗？", "删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          
        })
        .catch(action => {});
    }
  }
};
</script>

<style scoped>
</style>
