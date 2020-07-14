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
    <template v-for="item in currencyList">
      <el-option :value="item.currencyId" :label="item.currencyCode" :key="item.currencyId"></el-option>
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
      currencyList: [] //列表
    };
  },
  methods: {
    loadCurrency() {
      //getPlatformList.request().then(res => (this.platformList = res.data));
      this.currencyList = [
        { currencyId: 1, currencyCode: "USD" },
        { currencyId: 2, currencyCode: "CNY" },
        { currencyId: 3, currencyCode: "EUR" },
        { currencyId: 4, currencyCode: "GBP" },
        { currencyId: 5, currencyCode: "AUD" },
        { currencyId: 6, currencyCode: "CAD" },
        { currencyId: 7, currencyCode: "MYR" },
        { currencyId: 8, currencyCode: "SGD" },
        { currencyId: 9, currencyCode: "IDR" }
      ];
    },
    change(value) {
      this.$emit("change", value);
    },
    find(key) {
      return this.currencyList.find(e => e.currencyId == key);
    }
  },
  mounted: function() {
    this.loadCurrency();
  }
};
</script>
