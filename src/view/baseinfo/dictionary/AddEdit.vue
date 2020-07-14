<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="25%"
    top="10vh"
    scrollable
  >
    <div style="max-height:650px;overflow-x:auto">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="字典分类" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择字典分类" style="width:100%;">
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值名称" prop="valueName">
          <el-input v-model="formData.valueName" placeholder="请输入值名称" clearable />
        </el-form-item>
        <el-form-item label="值" prop="valueId">
          <el-input v-model="formData.valueId" placeholder="请输入值" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sortNo">
          <el-input-number
            v-model="formData.sortNo"
            :step="1"
            :min="1"
            :max="50"
            placeholder="请输入排序"
            clearable
            style="width:100%;"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
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
 * 用户添加编辑
 */
export default {
  components: {},
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        dicId: null,
        categoryId: null,
        valueName: null,
        valueId: null,
        status: true,
        remark: null,
        sortNo: null
      },
      formRules: {
        categoryId: [
          { required: true, message: "请选择字典分类", trigger: "change" }
        ],
        valueName: [
          { required: true, message: "请输入值名称", trigger: "blur" }
        ],
        valueId: [{ required: true, message: "请输入值", trigger: "blur" }],
        sortNo: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      categoryList: []
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
        this.formData.dicId = null;
        if (row) {
          this.formData.dicId = row.dicId;
          this.formData.categoryId = row.categoryId;
          this.formData.valueName = row.valueName;
          this.formData.valueId = row.valueId;
          this.formData.sortNo = row.sortNo;
          this.formData.status = row.status;
          this.formData.remark = row.remark;
        }
      });
    },
    //加载字典分类集合
    loadCategoryData() {
      this.categoryList = [
        {
          categoryId: 1,
          categoryName: "产品状态"
        },
        {
          categoryId: 2,
          categoryName: "物流状态"
        }
      ];
    }
  },
  mounted() {
    this.loadCategoryData();
  },
  computed: {
    title() {
      return this.formData.currencyId ? "编辑" : "添加";
    }
  }
};
</script>
<style scoped>
</style>
