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
    <template v-for="item in platformList">
      <el-option :value="item.platformId" :label="item.platformNameEn" :key="item.platformId"></el-option>
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
  props: {
    selected: {
      type: [String, Array, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "平台"
    }
  },
  data() {
    return {
      platformList: [] //列表
    };
  },
  methods: {
    //加载平台
    loadPlatform() {
      //getPlatformList.request().then(res => (this.platformList = res.data));
      this.platformList = [
        { platformId: 1, platformNameEn: "ebay" },
        { platformId: 2, platformNameEn: "aliexpress" },
        { platformId: 3, platformNameEn: "wish" },
        { platformId: 4, platformNameEn: "lazada" },
        { platformId: 5, platformNameEn: "shopee" },
        { platformId: 6, platformNameEn: "amazon" }
      ];
    },
    change(value) {
      this.$emit("change", value);
    },
    find(key) {
      return this.platformList.find(e => e.platformId == key);
    }
  },
  mounted: function() {
    this.loadPlatform();
  }
};
</script>
