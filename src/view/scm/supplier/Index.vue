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
        <el-input v-model="filter.supplierCode" placeholder="供应商编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filter.supplierName" placeholder="供应商名称" clearable></el-input>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10">
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="supplierCode" label="供应商编号" width="120"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" width="180"></el-table-column>
      <el-table-column prop="creditCode" label="统一社会信用码"></el-table-column>
      <el-table-column prop="categoryPath" label="类目"></el-table-column>
      <el-table-column prop="supplierType" label="供应商性质" width="120"></el-table-column>
      <el-table-column prop="location" label="地区" width="120"></el-table-column>
      <el-table-column prop="productCount" label="合作产品" width="80">
        <template slot-scope="scope">
          <el-tag type="success" effect="plain">{{ scope.row.productCount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90">
        <template slot-scope="scope">
          <el-tag disable-transitions v-if="scope.row.status===0">草稿</el-tag>
          <el-tag type="warning" disable-transitions v-if="scope.row.status===1">待审核</el-tag>
          <el-tag type="success" disable-transitions v-if="scope.row.status===2">已审核</el-tag>
          <el-tag type="danger" disable-transitions v-if="scope.row.status===3">审核失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="140"></el-table-column>
      <el-table-column prop="createUserName" label="创建人" width="80"></el-table-column>
      <el-table-column prop="modifyDate" label="编辑时间" width="140"></el-table-column>
      <el-table-column prop="modifyUserName" label="编辑人" width="80"></el-table-column>
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
import { getList } from "@/api/scm/supplier";
export default {
  name: "Supplier",
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
        supplierCode: null,
        supplierName: null
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
