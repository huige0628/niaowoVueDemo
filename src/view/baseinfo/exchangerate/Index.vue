<template>
  <div class="page">
    <!-- head -->
    <SimpleHead @on-search="reloadTable(true)" @on-expand="onExpand" :model="filter">
      <template slot="button">
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="setExchangeLoss">编辑</el-button>
          </el-button-group>
        </el-form-item>
      </template>
      <!-- 默认搜索项 -->
      <el-form-item>
        <el-input v-model="filter.name" placeholder="货币名称" clearable></el-input>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10" :autoLoad="false">
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="currencyName" label="货币名称"></el-table-column>
      <el-table-column prop="currencyCode" label="货币代码"></el-table-column>
      <el-table-column prop="rateUsd" label="汇率(USD)"></el-table-column>
      <el-table-column prop="rateCny" label="汇率(CNY)"></el-table-column>
      <el-table-column prop="rateHkd" label="汇率(HKD)"></el-table-column>
      <el-table-column prop="customRate" label="自定义汇率"></el-table-column>
      <el-table-column prop="exchangeLoss" label="汇损比例(%)"></el-table-column>
      <el-table-column prop="modifyDate" label="最后更新时间"></el-table-column>
    </SimpleTable>
    <!-- 编辑汇损 -->
    <SetExchangeLoss ref="setExchangeLoss" @on-ok="reloadTable" />
  </div>
</template>

<script>
//import { getList, remove } from "@/api/sys/role";
export default {
  name: "ExchangeRate",
  components: {
    SimpleHead: () => import("@/components/common/SimpleHead"), //头部组件
    SimpleTable: () => import("@/components/common/SimpleTable"), //表格组件
    SetExchangeLoss: () => import("./SetExchangeLoss") // 添加编辑
  },
  data() {
    return {
      tableUrl: "#",
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
    setExchangeLoss() {
      this.$refs.setExchangeLoss.open();
    }
  }
};
</script>

<style scoped>
</style>
