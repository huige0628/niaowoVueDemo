<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="50%"
    top="10vh"
    scrollable
  >
    <div style="max-height:650px;">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="产品编码" prop="sku">
          <el-input v-model="formData.sku" placeholder="请输入产品编码" clearable />
        </el-form-item>
        <el-form-item label="侵权类型" prop="tortType">
          <el-radio-group v-model="formData.tortType">
            <el-radio
              :label="item.value"
              :key="item.value"
              v-for="item in tortTypeList"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="侵权平台">
          <PlatformSelect
            ref="platform"
            v-model="formData.platformId"
            @change="platformChange"
            placeholder="请选择侵权平台"
            style="width:100%"
            multiple
          ></PlatformSelect>
          <div :key="item.index" v-for="item in formData.platformSiteList" style="margin-top:4px;">
            <el-input style="width:100px;" readonly v-model="item.platformName"></el-input>
            <el-select v-model="item.siteId" placeholder="全站点">
              <el-option
                v-for="site in item.siteList"
                :key="site.siteId"
                :label="site.siteName"
                :value="site.siteId"
                multiple
                collapse-tags
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="证据文件">
          <ImageUpload :limit="10" :image="images"></ImageUpload>
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
    ImageUpload: () => import("@/components/common/ImageUpload") //图片上传
  },
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        tortId: null,
        sku: null,
        platformId: [],
        tortType: null,
        remark: null,
        platformSiteList: []
      },
      formRules: {
        sku: [{ required: true, message: "请输入产品编码", trigger: "blur" }],
        tortType: [
          { required: true, message: "请选择侵权类型", trigger: "change" }
        ],
        platformId: [
          {
            required: true,
            type: "array",
            message: "请选择侵权品牌",
            trigger: ["blur", "change"]
          }
        ]
      },
      tortTypeList: [
        { value: 1, label: "专利侵权" },
        { value: 2, label: "商标侵权" },
        { value: 3, label: "外观侵权" },
        { value: 4, label: "图片侵权" },
        { value: 5, label: "禁售侵权" }
      ],
      images: ["https://img.feikagz.com/e604518b7853417ebe3033fe90c7927f.jpg"]
    };
  },
  methods: {
    platformChange(val) {
      if (val.length === 0) {
        return (this.formData.platformSiteList = []);
      }
      //添加项
      val.forEach(e => {
        let isExists = this.formData.platformSiteList.some(x => {
          return x.platformId == e;
        });
        if (!isExists) {
          let platform = this.$refs.platform.find(e);
          if (platform) {
            this.formData.platformSiteList.push({
              platformId: platform.platformId,
              platformName: platform.platformNameEn,
              siteId: [],
              siteList: []
            });
          }
        }
      });
      //删除项
      let delItems = this.formData.platformSiteList.filter(item => {
        return !val.includes(item.platformId);
      });
      delItems.forEach(item => {
        var index = this.formData.platformSiteList.indexOf(item);
        if (index !== -1) {
          this.formData.platformSiteList.splice(index, 1);
        }
      });
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
        this.formData.tortId = null;
        if (row) {
          this.formData.tortId = row.tortId;
          this.formData.sku = row.sku;
          this.formData.tortType = row.tortType;
          this.formData.remark = row.remark;
          this.formData.platformId = row.platformId.split(",");
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
