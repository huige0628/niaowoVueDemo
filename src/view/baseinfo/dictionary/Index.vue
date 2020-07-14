<template>
  <div class="page">
    <el-row :gutter="6">
      <el-col :span="4">
        <el-card class="box-card" :style="{ height: screenHeight + 'px' }">
          <div slot="header" class="clearfix">
            <span>字典分类</span>
            <div style="float: right;">
              <el-button type="text" icon="el-icon-plus" @click="addCategory" title="添加字典分类">Add</el-button>
              <el-button type="text" icon="el-icon-edit" @click="editCategory" title="编辑字典分类">Edit</el-button>
            </div>
          </div>
          <div :style="{ height: cardBodyHeight + 'px' ,overflow:'auto'}">
            <el-tree :data="treeData" :props="defaultProps" @node-click="treeNodeClick"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <!-- head -->
        <SimpleHead @on-search="reloadTable(true)" @on-expand="onExpand" :model="filter">
          <template slot="button">
            <!-- 操作按钮 -->
            <el-form-item>
              <el-button-group>
                <el-button type="success" icon="el-icon-plus" @click="add">添加</el-button>
                <!-- <el-button type="primary" icon="el-icon-edit" @click="edit(null)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="remove(null)">删除</el-button>-->
              </el-button-group>
            </el-form-item>
          </template>
          <!-- 默认搜索项 -->
          <el-form-item>
            <el-input v-model="filter.name" placeholder="值名称" clearable></el-input>
          </el-form-item>
          <template slot="more">
            <!-- 更多搜索项 -->
          </template>
        </SimpleHead>
        <!-- table -->
        <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10">
          <el-table-column type="selection" width="40" fixed="left" />
          <el-table-column prop="categoryName" label="分类名称" width="120"></el-table-column>
          <el-table-column prop="categoryCode" label="分类标识" width="120"></el-table-column>
          <el-table-column prop="valueName" label="值名称"></el-table-column>
          <el-table-column prop="valueId" label="值"></el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status ? 'success' : 'danger'"
                disable-transitions
              >{{scope.row.status?'启用':'禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sortNo" label="排序号" width="80"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
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
      </el-col>
    </el-row>
    <!-- 添加分类 -->
    <AddEditCategory ref="addEditCategory" @on-ok="loadTreeData"></AddEditCategory>
    <!-- 添加分类值 -->
    <AddEdit ref="edit" @on-ok="loadTreeData"></AddEdit>
  </div>
</template>

<script>
import { getList } from "@/api/baseinfo/dictionary";
export default {
  name: "Dictionary",
  components: {
    SimpleHead: () => import("@/components/common/SimpleHead"), //头部组件
    SimpleTable: () => import("@/components/common/SimpleTable"), //表格组件
    AddEditCategory: () => import("./AddEditCategory"), // 添加分类
    AddEdit: () => import("./AddEdit") // 添加分类值
  },
  data() {
    return {
      tableUrl: getList.url,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 过滤项
      filter: {
        name: null,
      },
      cardStyle: null,
      screenHeight: null,
      cardBodyHeight: null
    };
  },
  methods: {
    reloadTable(again) {
      this.$refs.table.reload(again);
    },
    onExpand() {
      this.$refs.table.resize();
    },
    //树节点点击事件
    treeNodeClick(data) {
      this.filter.categoryId = data.id;
      this.filter.categoryName = data.label;
    },
    //添加分类
    addCategory() {
      this.$refs.addEditCategory.open();
    },
    //编辑分类
    editCategory() {
      if (!this.filter.categoryId) {
        return this.$message.warning("请选择字典分类");
      }
      let row = {
        categoryId: this.filter.categoryId,
        categoryName: this.filter.categoryName
      };
      this.$refs.addEditCategory.open(row);
    },
    //添加分类值
    add() {
      this.$refs.edit.open();
    },
    //编辑分类值
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
    },
    //加载字典分类集合
    loadTreeData() {
      this.treeData = [
        {
          id: 1,
          label: "产品状态"
        },
        {
          id: 2,
          label: "物流状态"
        }
      ];
    }
  },
  mounted() {
    const that = this;
    that.loadTreeData();

    window.addEventListener("resize", () => {
      //  resize:当调整浏览器窗口的大小时触发事件
      window.screenHeight = document.documentElement.clientHeight;
      that.screenHeight = window.screenHeight - 123;
    });
    that.screenHeight = document.documentElement.clientHeight - 123;
    that.cardBodyHeight = that.screenHeight - 88;
  },
  watch: {
    screenHeight(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>

<style scoped>
@charset "utf-8";
::-webkit-scrollbar {
  width: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}

.el-card__header {
  padding: 10px 20px;
}
</style>