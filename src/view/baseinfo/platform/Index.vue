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
        <el-input v-model="filter.name" placeholder="平台名称" clearable></el-input>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10" >
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="platformId" label="ID" width="80"></el-table-column>
      <el-table-column prop="platformNameEn" label="平台英文名称"></el-table-column>
      <el-table-column prop="platformNameCn" label="平台中文名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status  ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.status?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
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
import { getList } from "@/api/baseinfo/platform";
export default {
  name: "Platform",
  components: {
    SimpleHead: () => import("@/components/common/SimpleHead"), //头部组件
    SimpleTable: () => import("@/components/common/SimpleTable"), //表格组件
    AddEdit: () => import("./AddEdit") // 添加编辑
  },
  data() {
    return {
      tableUrl: getList.url,
      // 过滤项
      filter: {
        name: null
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
        .then(() => {})
        .catch(action => {});
    }
  }
};
</script>

<style scoped>
</style>
