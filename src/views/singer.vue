<template>
  <div class="singer">
    <singer-list :data="singerList"></singer-list>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import singerList from "@/components/singer-list/singer-list.vue";
export default {
  components: { singerList },
  name: "singer",
  data() {
    return {
      singerList: [],
    };
  },
  async created() {
    this.singerList = await getSingerList();
  },
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: $header-top;
  bottom: 0;
}
</style>