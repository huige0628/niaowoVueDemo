<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="35%"
    top="10vh"
    scrollable
  >
    <div style="max-height:650px;">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="120px">
        <el-form-item label="品牌中文名称" prop="brandNameCn">
          <el-input v-model="formData.brandNameCn" placeholder="请输入品牌中文名称" clearable />
        </el-form-item>
        <el-form-item label="品牌英文名称" prop="brandNameEn">
          <el-input v-model="formData.brandNameEn" placeholder="请输入品牌英文名称" clearable />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- <el-input v-model="formData.valueId" placeholder="请输入值" clearable /> -->
        </el-form-item>
        <el-form-item label="品牌类型" prop="brandType">
          <el-select v-model="formData.brandType" placeholder="请选择品牌类型" style="width:100%">
            <el-option
              v-for="item in brandTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册国家">
          <Country
            ref="country"
            v-model="formData.countryId"
            @change="countryChange"
            placeholder="请选择注册国家"
            style="width:100%"
          ></Country>
        </el-form-item>
        <el-form-item label="所属平台">
          <PlatformSelect
            ref="platform"
            v-model="formData.platformId"
            @change="platformChange"
            placeholder="请选择所属平台"
            style="width:100%"
          ></PlatformSelect>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入描述" />
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
    PlatformSelect: () => import("@/components/common/PlatformSelect"), //销售平台组件
    Country: () => import("@/components/common/Country") //国家组件
  },
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        brandId: null,
        brandType: null,
        brandNameCn: null,
        brandNameEn: null,
        platformId: null,
        platformNameEn: null,
        countryId: null,
        countryName: null,
        remark: null
      },
      formRules: {
        brandType: [
          { required: true, message: "请选择品牌类型", trigger: "change" }
        ],
        brandNameCn: [
          { required: true, message: "请输入品牌中文名称", trigger: "blur" }
        ],
        brandNameEn: [
          { required: true, message: "请输入品牌英文名称", trigger: "blur" }
        ]
      },
      brandTypeList: [
        { value: 1, label: "无" },
        { value: 2, label: "OEM" },
        { value: 3, label: "自主品牌" }
      ]
    };
  },
  methods: {
    platformChange(val) {
      var platform = this.$refs.platform.find(val);
      if (platform) {
        this.formData.platformNameEn = platform.platformNameEn;
      }
    },
    countryChange(val) {
      var country = this.$refs.platform.find(val);
      if (country) {
        this.formData.countryName = country.countryName;
      }
    },
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
        this.formData.brandId = null;
        if (row) {
          this.formData.brandId = row.brandId;
          this.formData.brandNameCn = row.brandNameCn;
          this.formData.brandNameEn = row.brandNameEn;
          this.formData.brandType = row.brandType;
          this.formData.platformId = row.platformId;
          this.formData.platformNameEn = row.platformNameEn;
          this.formData.countryName = row.countryName;
          this.formData.countryId = row.countryId;
          this.formData.remark = row.remark;
        }
      });
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.formData.brandId ? "编辑" : "添加";
    }
  }
};
</script>
<style scoped>
</style>
