<template>
  <div class="page">
    <!-- head -->
    <SimpleHead @on-search="reloadTable(true)" @on-expand="onExpand" :model="filter">
      <template slot="button">
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button-group>
            <el-button type="success" icon="el-icon-plus" @click="add">添加</el-button>
          </el-button-group>
        </el-form-item>
      </template>
      <!-- 默认搜索项 -->
      <el-form-item prop="relation">
        <el-form-item prop="categoryId">
          <el-cascader placeholder="系统类目" v-model="filter.categoryId" :options="options" filterable clearable></el-cascader>
        </el-form-item>
        <el-select v-model="filter.relation" placeholder="是否关联" clearable>
          <el-option label="是" value="true"></el-option>
          <el-option label="否" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="platformId">
        <PlatformSelect ref="platform" v-model="filter.platformId" placeholder="销售平台"></PlatformSelect>
      </el-form-item>
      <el-form-item prop="siteId">
        <PlatformSiteSelect
          ref="site"
          v-model="filter.siteId"
          placeholder="站点"
          :platformId="filter.platformId"
        ></PlatformSiteSelect>
      </el-form-item>
      <template slot="more">
        <!-- 更多搜索项 -->
      </template>
    </SimpleHead>
    <!-- table -->
    <SimpleTable ref="table" :url="tableUrl" :filter="filter" :offset="10">
      <el-table-column type="selection" width="40" fixed="left" />
      <el-table-column prop="categoryCode" label="类目编码" width="120"></el-table-column>
      <el-table-column prop="categoryPath" label="产品类目路径" width="220"></el-table-column>
      <el-table-column prop="platformName" label="平台"></el-table-column>
      <el-table-column prop="siteName" label="站点"></el-table-column>
      <el-table-column prop="toCategoryId" label="对应类目ID"></el-table-column>
      <el-table-column prop="toCategoryPath" label="对应类目路径"></el-table-column>
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
    <!-- <AddEdit ref="edit" @on-ok="reloadTable" /> -->
  </div>
</template>

<script>
import { getList } from "@/api/scm/brand";
export default {
  name: "CategoryMapping",
  components: {
    SimpleHead: () => import("@/components/common/SimpleHead"), //头部组件
    SimpleTable: () => import("@/components/common/SimpleTable"), //表格组件
    PlatformSelect: () => import("@/components/common/PlatformSelect"), //销售平台组件
    PlatformSiteSelect: () => import("@/components/common/PlatformSiteSelect") //销售平台组件
    //AddEdit: () => import("./AddEdit") // 添加编辑
  },
  data() {
    return {
      tableUrl: getList.url,
      // 过滤项
      filter: {
        platformId: null,
        siteId: null,
        relation: null,
        categoryId:null
      },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
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
