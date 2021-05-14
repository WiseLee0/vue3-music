<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="singer.name"
      :pic="singer.pic"
    ></music-list>
  </div>
</template>

<script lang="ts">
import { getSingerSong } from "@/api/singer";
import MusicList from "@/components/music-list/music-list.vue";
export default {
  name: "singer-detail",
  components: { MusicList },
  props: {
    singer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    this.songs = await getSingerSong(this.singer.mid);
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>