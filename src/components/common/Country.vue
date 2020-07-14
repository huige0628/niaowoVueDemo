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
    <template v-for="item in countryList">
      <el-option :value="item.countryId" :label="item.countryName" :key="item.countryId"></el-option>
    </template>
  </el-select>
</template>
<script>
//import { getPlatformList } from "@/api/sys/common/platform";
/**
 * 币种选择组件
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
      default: "币种"
    }
  },
  data() {
    return {
      countryList: [] //列表
    };
  },
  methods: {
    loadcountry() {
      //getPlatformList.request().then(res => (this.platformList = res.data));
      this.countryList = [
        { countryId: 1, countryName: "中国" },
        { countryId: 2, countryName: "美国" },
        { countryId: 3, countryName: "英国" },
        { countryId: 4, countryName: "法国" },
        { countryId: 5, countryName: "德国" },
        { countryId: 6, countryName: "西班牙" },
        { countryId: 7, countryName: "意大利" },
        { countryId: 8, countryName: "日本" },
        { countryId: 9, countryName: "韩国" }
      ];
    },
    change(value) {
      this.$emit("change", value);
    },
    find(key) {
      return this.countryList.find(e => e.countryId == key);
    }
  },
  mounted: function() {
    this.loadcountry();
  }
};
</script>
