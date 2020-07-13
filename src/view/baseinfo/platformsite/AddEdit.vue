<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="45%"
    top="10vh"
    scrollable
  >
    <div style="max-height:550px;overflow-x:auto" class="form-container">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售平台" prop="platformId">
              <PlatformSelect
                ref="platform"
                v-model="formData.platformId"
                @change="platformChange"
                placeholder="销售平台"
              ></PlatformSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文站点" prop="siteNameEn">
              <!-- <el-input v-model="formData.siteNameEn" placeholder="请输入英文站点名称" clearable /> -->
              <el-autocomplete
                class="inline-input"
                v-model="formData.siteNameEn"
                :fetch-suggestions="querySearch"
                placeholder="请输入英文站点"
                :trigger-on-focus="true"
                @select="handleSelect"
                clearable
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中文站点" prop="siteNameCn">
              <el-input v-model="formData.siteNameCn" placeholder="请输入中文站点名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点编码" prop="siteCode">
              <el-input v-model="formData.siteCode" placeholder="请输入站点编码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="币种" prop="currency">
              <el-input v-model="formData.currency" placeholder="请输入站点对于币种" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台编码" prop="platformCode">
              <el-input v-model="formData.platformCode" placeholder="请输入平台编码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="formData.status">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="平台编码" prop="platformCode">
              <el-input v-model="formData.platformCode" placeholder="请输入平台编码" clearable />
            </el-form-item>-->
          </el-col>
        </el-row>
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
import sites from "@/assets/site.json";
/**
 * 平台站点编辑
 */
export default {
  components: {
    PlatformSelect: () => import("@/components/common/PlatformSelect") //头部组件
  },
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        platformSiteId: null,
        platformId: null,
        platformNameEn: null,
        siteNameCn: null,
        siteNameEn: null,
        status: true,
        platformCode: null,
        siteCode: null,
        currency: null
      },
      formRules: {
        siteNameCn: [
          { required: true, message: "请输入中文站点名称", trigger: "blur" }
        ],
        siteNameEn: [
          {
            required: true,
            message: "请输入英文站点名称",
            trigger: "change"
          },
          { min: 2, max: 20, message: "长度为2-20个字符", trigger: "change" }
        ],
        currency: [
          {
            required: true,
            message: "请输入英文币种",
            trigger: "blur"
          },
          { min: 3, max: 3, message: "长度为3个字符", trigger: "blur" }
        ],
        platformId: [
          { required: true, message: "请选择销售平台", trigger: "change" }
        ]
      },
      siteList: [] //推荐站点列表
    };
  },
  methods: {
    platformChange(val) {
      var platform = this.$refs.platform.find(val);
      if (platform) {
        this.platformNameEn = platform.platformNameEn;
      }
    },
    querySearch(queryString, cb) {
      var siteList = this.siteList;
      var results = queryString
        ? siteList.filter(this.createFilter(queryString))
        : siteList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return site => {
        return (
          site.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 //el-autocomplete只识别value字段
        );
      };
    },
    handleSelect(item) {
      this.formData.currency = item.currency;
      this.formData.siteCode = item.siteCode;
      this.formData.siteNameCn = item.siteNameCn;
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
        this.formData.platformSiteId = null;
        if (row) {
          this.formData.platformSiteId = row.platformSiteId;
          this.formData.platformId = row.platformId;
          this.formData.platformNameEn = row.platformNameEn;
          this.formData.status = row.status;
          this.formData.siteNameEn = row.siteNameEn;
          this.formData.siteNameCn = row.siteNameCn;
          this.formData.siteCode = row.siteCode;
          this.formData.platformCode = row.platformCode;
          this.formData.currency = row.currency;
        }
      });
    }
  },
  mounted() {
    this.siteList = sites;
  },
  computed: {
    title() {
      return this.formData.userId ? "编辑" : "添加";
    }
  }
};
</script>
<style>
.form-editor {
  padding-right: 5px;
}
</style>
