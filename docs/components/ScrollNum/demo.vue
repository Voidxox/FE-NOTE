<template>
  <div class="number-container">
    <div class="num-box flex-col align-center justify-center">
      <ul class="num-flex-ul">
        <ScrollNum
          v-for="(num, idx) of numArr"
          :key="idx"
          as="li"
          :style="{ '--width': '32px' }"
          :i="num"
          :decimalPlaces="decimalPlaces"
          :delay="idx + 1"
        ></ScrollNum>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollNum from "./index.vue";
export default {
  data() {
    return {
      decimalPlaces: 0, //小数位数
    };
  },
  components: {
    ScrollNum,
  },
  data() {
    return {
      count:999
    };
  },
  computed: {
    numArr() {
      const str = String(this.count);
      let arr = [];
      // Check if the count is a decimal number
      if (str.includes(".")) {
        this.decimalPlaces = str.length - str.indexOf(".") - 1;
      }
      for (let i = 0; i < str.length; i++) {
        if (str[i] === ".") {
          arr.push(".");
        } else {
          arr.push(parseInt(str[i]));
        }
      }
      console.log(arr, "arr");
      console.log(this.decimalPlaces, "decimalPlaces");
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.number-container {
  --num-size: 48px;
  --base-color: #00fff9;
  --unit-size: 24px;
  --text-color: #ffffff;
  margin-top: 30px;
  .num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .num-flex-ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .number {
      font-size: var(--num-size);
      color: var(--base-color);
      font-family: "LcdD";
    }
    .name {
      opacity: 0.8;
      color: var(--text-color);
      font-size: var(--unit-size);
    }
  }
}
</style>