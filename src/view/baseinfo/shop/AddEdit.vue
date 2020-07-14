<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="45%"
    top="10vh"
    scrollable
  >
    <div style="max-height:550px;overflow-y:auto;" class="form-container">
      <el-form ref="form" :model="formData" :rules="formRules" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售平台" prop="platformId">
              <PlatformSelect
                ref="platform"
                v-model="formData.platformId"
                @change="platformChange"
                placeholder="销售平台"
                style="width:100%"
              ></PlatformSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点" prop="siteId">
              <PlatformSiteSelect
                ref="site"
                v-model="formData.siteId"
                @change="siteChange"
                placeholder="站点"
                :platformId="formData.platformId"
                style="width:100%"
              ></PlatformSiteSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺名" prop="shopName">
              <el-input v-model="formData.shopName" placeholder="请输入店铺名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺类别" prop="shopType">
              <el-select
                v-model="formData.shopType"
                placeholder="请选择店铺类别"
                multiple
                style="width: 100%;"
              >
                <el-option label="饰品类" value="shanghai"></el-option>
                <el-option label="电子类" value="beijing"></el-option>
                <el-option label="服装类" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台店铺ID" prop="platformShopId">
              <el-input v-model="formData.platformShopId" placeholder="请输入平台店铺ID" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司" prop="companyId">
              <el-select v-model="formData.companyId" placeholder="请选择公司" style="width: 100%;">
                <el-option label="公司A" value="shanghai"></el-option>
                <el-option label="公司B" value="beijing"></el-option>
                <el-option label="公司C" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-select v-model="formData.phone" placeholder="请选择电话" multiple style="width: 100%;">
                <el-option label="饰品类" value="shanghai"></el-option>
                <el-option label="电子类" value="beijing"></el-option>
                <el-option label="服装类" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="信用卡" prop="creditCard">
              <el-select v-model="formData.creditCard" placeholder="请选择信用卡" style="width: 100%;">
                <el-option label="公司A" value="shanghai"></el-option>
                <el-option label="公司B" value="beijing"></el-option>
                <el-option label="公司C" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款账号" prop="collectionAccount">
              <el-select
                v-model="formData.collectionAccount"
                placeholder="请选择收款账号"
                multiple
                style="width: 100%;"
              >
                <el-option label="饰品类" value="shanghai"></el-option>
                <el-option label="电子类" value="beijing"></el-option>
                <el-option label="服装类" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="IP" prop="ip">
              <el-select v-model="formData.ip" placeholder="请选择IP" style="width: 100%;">
                <el-option label="公司A" value="shanghai"></el-option>
                <el-option label="公司B" value="beijing"></el-option>
                <el-option label="公司C" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" clearable></el-input>
          </el-form-item>
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
/**
 * 店铺编辑
 */
export default {
  components: {
    PlatformSelect: () => import("@/components/common/PlatformSelect"), //销售平台组件
    PlatformSiteSelect: () => import("@/components/common/PlatformSiteSelect") //销售平台站点组件
  },
  data() {
    return {
      show: false,
      loading: false,
      // 表单数据
      formData: {
        shopId: null,
        platformId: null,
        platformNameEn: null,
        siteId: null,
        siteNameEn: null,
        shopName: null,
        shopType: [],
        platformShopId: null,
        email: null,
        companyId: null,
        status: true,
        phone: [],
        creditCard: [],
        collectionAccount: [],
        ip: [],
        remark: null
      },
      formRules: {
        shopName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        platformId: [
          { required: true, message: "请选择销售平台", trigger: "change" }
        ],
        siteId: [
          { required: true, message: "请选择销售站点", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        companyId: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        phone: [{ required: true, message: "请选择电话", trigger: "change" }],
        creditCard: [
          { required: true, message: "请选择信用卡", trigger: "change" }
        ],
        collectionAccount: [
          { required: true, message: "请选择收款账号", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    platformChange(val) {
      var platform = this.$refs.platform.find(val);
      if (platform) {
        this.platformNameEn = platform.platformNameEn;
      }
    },
    siteChange(val) {
      console.log(val);
      var _site = this.$refs.site.find(val);
      if (_site) {
        this.siteNameEn = _site.siteNameEn;
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
          this.formData.apiUrl = row.apiUrl;
        }
      });
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.formData.shopId ? "编辑" : "添加";
    }
  }
};
</script>
<style scoped>
</style>
