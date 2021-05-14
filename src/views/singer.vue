<template>
  <div class="singer">
    <singer-list :data="singerList" @select="onSingerSelected"></singer-list>
  </div>
  <router-view :singer="singer"></router-view>
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
      singer: "",
    };
  },
  async created() {
    this.singerList = await getSingerList();
  },
  methods: {
    onSingerSelected(item) {
      this.singer = item;
      this.$router.push({
        path: `/singer/${item.mid}`,
      });
    },
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