<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="20%"
    top="10vh"
    scrollable
  >
    <div style="max-height:550px;overflow-x:auto" class="form-container">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="formData.categoryName" placeholder="请输入分类名称" clearable />
        </el-form-item>
        <el-form-item label="分类标识" prop="categoryCode">
          <el-input v-model="formData.categoryCode" placeholder="请输入分类标识" clearable />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
//import { addEdit } from "@/api/sys/role";
/**
 * 字典分类添加编辑
 */
export default {
  components: {},
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        categoryId: null,
        categoryName: null
      },
      formRules: {
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        categoryCode: [
          { required: true, message: "请输入分类标识", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 确定
    ok: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //this.loading = true;
          //save
          this.$message.success("验证成功");
        }
      });
    },
    // 关闭窗口
    close: function() {
      this.loading = false;
      this.show = false;
    },
    // 打开窗口
    open: function(row) {
      this.show = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.formData.categoryId = null;
        if (row) {
          this.formData.categoryId = row.categoryId;
          this.formData.categoryName = row.categoryName;
        }
      });
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.formData.categoryId ? "编辑字典分类" : "添加字典分类";
    }
  }
};
</script>
<style scoped>
</style>
