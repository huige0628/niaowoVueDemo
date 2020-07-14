<template>
  <el-select
    :value="selected"
    @change="change"
    :placeholder="placeholder"
    filterable
    clearable
    :multiple="multiple"
    :disabled="disabled"
    transfer
  >
    <template v-for="item in siteList">
      <el-option :value="item.siteId" :label="item.siteNameEn" :key="item.siteId"></el-option>
    </template>
  </el-select>
</template>
<script>
//import { getPlatformList } from "@/api/sys/common/platform";
/**
 * 销售平台选择组件
 */
export default {
  model: {
    prop: "selected",
    event: "change"
  },
  //   props: {
  //     selected: {
  //       type: [String, Array, Number],
  //       default: null
  //     },
  //     disabled: {
  //       type: Boolean,
  //       default: false
  //     },
  //     multiple: {
  //       type: Boolean,
  //       default: false
  //     },
  //     placeholder: {
  //       type: String,
  //       default: "站点"
  //     },
  //     platformId: {
  //       type: null,
  //       default: null
  //     }
  //   },
  props: ["selected", "platformId", "multiple", "disabled", "placeholder"],
  data() {
    return {
      siteList: [] //列表
    };
  },
  methods: {
    //加载平台站点
    loadPlatformSite() {
      //getPlatformList.request().then(res => (this.platformList = res.data));
      if (this.platformId) {
        this.siteList = [
          { siteId: 1, siteNameEn: "MY" },
          { siteId: 2, siteNameEn: "SG" },
          { siteId: 3, siteNameEn: "ID" },
          { siteId: 4, siteNameEn: "PH" },
          { siteId: 5, siteNameEn: "VN" },
          { siteId: 6, siteNameEn: "TH" }
        ];
      }
    },
    change(value) {
      this.$emit("change", value);
    },
    find(key) {
      return this.siteList.find(e => e.siteId == key);
    }
  },
  mounted: function() {
    this.loadPlatformSite();
  },
  watch: {
    platformId() {
      if (this.platformId) {
        this.loadPlatformSite();
      } else {
        this.siteList = [];
      }
    }
  }
};
</script>
