<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="30%"
    top="10vh"
    scrollable
  >
    <div style="max-height:550px;overflow-x:auto" class="form-container">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="120px">
        <el-form-item label="平台中文名称" prop="platformNameCn">
          <el-input v-model="formData.platformNameCn" placeholder="请输入平台中文名称" clearable />
        </el-form-item>
        <el-form-item label="平台英文名称" prop="platformNameEn">
          <el-input v-model="formData.platformNameEn" placeholder="请输入平台英文名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="logo">
          <ImageUpload :limit="1" :image="images"></ImageUpload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="formData.remark"
            :autosize="{ minRows: 4, maxRows: 8}"
            type="textarea"
            placeholder="请输入备注"
          />
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
  components: {
    ImageUpload: () => import("@/components/common/ImageUpload") //图片上传
  },
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        platformId: null,
        platformNameCn: null,
        platformNameEn: null,
        status: true,
        remark: null
      },
      formRules: {
        platformNameCn: [
          { required: true, message: "请输入销售平台中文名称", trigger: "blur" }
        ],
        platformNameEn: [
          {
            required: true,
            message: "请输入销售平台英文名称",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度为2-20个字符", trigger: "blur" }
        ]
      },
      images:[]
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
        this.formData.platformId = null;
        if (row) {
          this.formData.platformId = row.platformId;
          this.formData.platformNameCn = row.platformNameCn;
          this.formData.platformNameEn = row.platformNameEn;
          this.formData.status=row.status;
          this.formData.remark=row.remark;
        }
      });
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.formData.platformId ? "编辑" : "添加";
    }
  }
};
</script>
<style scoped>
</style>
