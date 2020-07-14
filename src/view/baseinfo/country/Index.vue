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
        <el-input v-model="filter.name" placeholder="国家名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.code" placeholder="国家简码" clearable></el-input>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10" :autoLoad="false">
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="continent" label="大洲" width="100"></el-table-column>
      <el-table-column prop="enName" label="英文名称"></el-table-column>
      <el-table-column prop="cnName" label="简体中文"></el-table-column>
      <el-table-column prop="twName" label="繁体中文"></el-table-column>
      <el-table-column prop="twoCode" label="二字码"></el-table-column>
      <el-table-column prop="threeCode" label="三字码"></el-table-column>
      <el-table-column prop="otherCode" label="其它简码"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="operate" label="操作" width="80">
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
  name: "Country",
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
