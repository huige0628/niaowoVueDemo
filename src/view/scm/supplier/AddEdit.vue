<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :title="title"
    width="50%"
    top="5vh"
    scrollable
  >
    <div style="max-height:460px;overflow-x:auto">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-divider content-position="left">
              <el-button type="success" icon="el-icon-s-custom" size="mini" plain>基础信息</el-button>
            </el-divider>
            <el-row>
              <el-col :span="12">
                <el-form-item label="社会信用代码" prop="supplierCode">
                  <el-input v-model="formData.supplierCode" placeholder="请输入社会信用代码" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="供应商名称" prop="supplierName">
                  <el-input v-model="formData.supplierName" placeholder="请输入供应商名称" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="供应商别名" prop="aliasName">
                  <el-input v-model="formData.aliasName" placeholder="请输入供应商别名" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="供应商性质" prop="nature">
                  <el-select v-model="formData.nature" placeholder="请选择供应商性质" style="width: 100%;">
                    <el-option label="生成加工型企业" value="shanghai"></el-option>
                    <el-option label="外贸型企业" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="法人代表" prop="legalPerson">
                  <el-input v-model="formData.legalPerson" placeholder="请输入法人代表" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人身份证号" prop="idCard">
                  <el-input v-model="formData.idCard" placeholder="请输入法人身份证号" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="成立时间" prop="createDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择成立时间"
                    v-model="formData.createDate"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业期限" prop="dueTime">
                  <el-date-picker
                    type="date"
                    placeholder="选择营业期限"
                    v-model="formData.dueTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工商注册号" prop="businessCode">
                  <el-input v-model="formData.businessCode" placeholder="请输入工商注册号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织机构代码" prop="orgCode">
                  <el-input v-model="formData.orgCode" placeholder="请输入组织机构代码" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="省/市" prop="city">
                  <el-cascader
                    :options="cityOptions"
                    clearable
                    filterable
                    placeholder="选择省市"
                    style="width: 100%;"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-form-item label="注册地址" prop="address">
                <el-input
                  type="textarea"
                  v-model="formData.address"
                  placeholder="请输入注册地址"
                  clearable
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="供货类型" prop="supplyType">
                  <el-select v-model="formData.nature" placeholder="请选择供货类型" style="width: 100%;">
                    <el-option label="生成加工型企业" value="shanghai"></el-option>
                    <el-option label="外贸型企业" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="规模类型" prop="scaleType">
                  <el-select
                    v-model="formData.scaleType"
                    placeholder="请选择规模类型"
                    style="width: 100%;"
                  >
                    <el-option label="生成加工型企业" value="shanghai"></el-option>
                    <el-option label="外贸型企业" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="默认结算方式" prop="settlementType">
                  <el-select
                    v-model="formData.settlementType"
                    placeholder="请选择默认结算方式"
                    style="width: 100%;"
                  >
                    <el-option label="生成加工型企业" value="shanghai"></el-option>
                    <el-option label="外贸型企业" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品牌名称" prop="brand">
                  <el-input v-model="formData.brand" placeholder="请输入品牌名称" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经营类目" prop="categoryId">
                  <el-cascader
                    :options="cityOptions"
                    clearable
                    filterable
                    placeholder="选择类目"
                    style="width: 100%;"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="官网" prop="siteUrl">
                  <el-input v-model="formData.siteUrl" placeholder="请输入官网地址" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">
              <el-button type="success" icon="el-icon-files" size="mini" plain>附件信息</el-button>
            </el-divider>
            <el-row>
              <el-col :span="6">
                <el-form-item label="营业执照" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工商变更证明" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="采购协议" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="商业道德协议" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="质量保证协议" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验厂报告" prop="siteUrl">
                  <div style="display: flex;">
                    <el-image
                      style="width: 32px; height: 32px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']"
                    >fit="fit"></el-image>
                    <el-button type="success" icon="el-icon-upload" size="mini">上传</el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">
              <el-button type="success" icon="el-icon-s-check" size="mini" plain>退税</el-button>
            </el-divider>
            <el-row>
              <el-form-item label="支持退税" prop="drawback">
                <el-switch v-model="formData.drawback"></el-switch>
              </el-form-item>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="联系信息" name="second">
            <div :key="index" v-for="(item,index) in formData.contacts">
              <el-divider content-position="left">
                <i class="el-icon-plus" @click="addContacts" v-if="index===0"></i>
                <i class="el-icon-close" @click="delContacts(item)" v-else></i>
              </el-divider>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="联系人"
                    :key="item.key"
                    :prop="'contacts.' + index + '.contact'"
                    :rules="{required: true, message: '联系人不能为空', trigger: 'blur'}"
                  >
                    <el-input v-model="item.contact" placeholder="请输入联系人" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职位" prop="position">
                    <el-input v-model="item.position" placeholder="请输入职位" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="手机"
                    :key="item.key"
                    :prop="'contacts.' + index + '.phone'"
                    :rules="{required: true, message: '手机不能为空', trigger: 'blur'}"
                  >
                    <el-input v-model="item.phone" placeholder="请输入手机" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="座机" prop="landline">
                    <el-input v-model="item.landline" placeholder="请输入座机" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="邮箱"
                    :key="item.key"
                    :prop="'contacts.' + index + '.email'"
                    :rules="{required: true, message: '邮箱不能为空', trigger: 'blur'}"
                  >
                    <el-input v-model="item.email" placeholder="请输入邮箱" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="QQ" prop="qq">
                    <el-input v-model="item.qq" placeholder="请输入QQ" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="阿里旺旺" prop="aliNumber">
                    <el-input v-model="item.aliNumber" placeholder="请输入阿里旺旺" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="平台链接" prop="platformUrl">
                    <el-input v-model="item.platformUrl" placeholder="请输入平台链接" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="联系地址" prop="address">
                  <el-input type="textarea" v-model="item.address" placeholder="请输入联系地址" clearable></el-input>
                </el-form-item>
              </el-row>
            </div>
          </el-tab-pane>

          <el-tab-pane label="账户信息" name="third">
            <div :key="index" v-for="(item,index) in formData.accounts">
              <el-divider content-position="left">
                <i class="el-icon-plus" @click="addAccount" v-if="index===0"></i>
                <i class="el-icon-close" @click="delAccount(item)" v-else></i>
              </el-divider>
              <el-row>
                <el-form-item>
                  <el-radio-group v-model="item.accountType">
                    <el-radio :label="0">支付宝</el-radio>
                    <el-radio :label="1">对公账户</el-radio>
                    <el-radio :label="2">对私账户</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <div v-if="item.accountType===0">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="账户"
                      :key="item.key"
                      :prop="'accounts.' + index + '.alipay'"
                      :rules="{required: (item.accountType===0?true:false), message: '支付宝账号不能为空', trigger: 'blur'}"
                    >
                      <el-input v-model="item.alipay" placeholder="请输入支付宝账号" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12"></el-col>
                </el-row>
              </div>
              <div v-else>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="账号" prop="bankAccount">
                      <el-input v-model="item.bankAccount" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开户名" prop="accountName">
                      <el-input v-model="item.accountName" placeholder="请输入开户名" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="开户行" prop="bankDeposit">
                      <el-input v-model="item.bankDeposit" placeholder="请输入开户行" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="币种" prop="currency">
                      <el-input v-model="item.currency" placeholder="请输入币种" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="证件号" prop="idCard">
                      <el-input v-model="item.idCard" placeholder="请输入证件号" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银企支付号" prop="bankPayNumber">
                      <el-input v-model="item.bankPayNumber" placeholder="请输入银企支付号" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="银行地址" prop="bankAddress">
                    <el-input
                      type="textarea"
                      v-model="item.bankAddress"
                      placeholder="请输入银行地址"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="税务信息" name="fourth">税务信息</el-tab-pane>
          <el-tab-pane label="备注" name="five">
            <el-row>
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="formData.remark"
                  :rows="5"
                  placeholder="请输入备注"
                  clearable
                ></el-input>
              </el-form-item>
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
      activeName: "first",
      cityOptions: [
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
        }
      ],
      formData: {
        supplierId: null,
        supplierName: null,
        supplierCode: null,
        aliasName: null,
        nature: null,
        legalPerson: null,
        idCard: null,
        createDate: null,
        dueTime: null,
        businessCode: null,
        orgCode: null,
        city: null,
        address: null,
        supplyType: null,
        scaleType: null,
        settlementType: null,
        brand: null,
        siteUrl: null,
        categoryId: null,
        drawback: false,
        remark: null,
        contacts: [
          {
            contact: null,
            qq: null,
            email: null,
            position: null,
            phone: null,
            landline: null,
            aliNumber: null,
            platformUrl: null,
            address: null
          }
        ],
        accounts: [
          {
            accountType: 0,
            alipay: null,
            bankAccount: null, //银行账户
            accountName: null, //开户名
            bankDeposit: null, //开户行
            currency: null,
            bankAddress: null,
            idCard: null, //证件号
            bankPayNumber: null //银行支付号
          }
        ]
      },
      formRules: {
        supplierCode: [
          { required: true, message: "请输入社会信用代码", trigger: "blur" }
        ],
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "change" }
        ],
        legalPerson: [
          { required: true, message: "请输入法定代表", trigger: "change" }
        ],
        nature: [
          { required: true, message: "请选择供应商性质", trigger: "change" }
        ],
        settlementType: [
          { required: true, message: "请选择默认结算方式", trigger: "change" }
        ],
        categoryId: [
          { required: true, message: "请选择类目", trigger: "change" }
        ],
        createDate: [
          {
            type: "date",
            required: true,
            message: "请选择成立日期",
            trigger: "change"
          }
        ],
        dueTime: [
          {
            type: "date",
            required: true,
            message: "请选择营业期限日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    loadData(data) {
      this.formData.supplierId = null;
      if (data) {
        this.formData.supplierId = data.supplierId;
        this.formData.supplierName = data.supplierName;
        this.formData.supplierCode = data.supplierCode;
        this.formData.aliasName = data.aliasName;
        this.formData.remark = data.remark;
        this.formData.nature = data.nature;
        this.formData.legalPerson = data.legalPerson;
        this.formData.idCard = data.idCard;
        this.formData.createDate = data.createDate;
        this.formData.dueTime = data.dueTime;
        this.formData.orgCode = data.orgCode;
      }
    },
    addContacts() {
      this.formData.contacts.push({
        contact: null,
        qq: null,
        email: null,
        position: null,
        phone: null,
        landline: null,
        aliNumber: null,
        platformUrl: null,
        address: null
      });
    },
    delContacts(item) {
      var index = this.formData.contacts.indexOf(item);
      if (index !== -1) {
        this.formData.contacts.splice(index, 1);
      }
    },
    addAccount() {
      this.formData.accounts.push({
        accountType: 0,
        alipay: null,
        bankAccount: null, //银行账户
        accountName: null, //开户名
        bankDeposit: null, //开户行
        currency: null,
        bankAddress: null,
        idCard: null, //证件号
        bankCardNumber: null //银行卡号
      });
    },
    delAccount(item) {
      var index = this.formData.accounts.indexOf(item);
      if (index !== -1) {
        this.formData.accounts.splice(index, 1);
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
        this.loadData(row);
      });
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.formData.supplierId ? "编辑" : "添加";
    }
  }
};
</script>
<style scoped>
</style>
