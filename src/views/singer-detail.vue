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
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      songs: [],
      singer: {},
    };
  },
  async created() {
    if (!this.cacheSinger()) return;
    this.songs = await getSingerSong(this.singer.mid);
  },
  methods: {
    cacheSinger() {
      const key = this.$route.params.id;
      if (!this.data.mid)
        this.singer = JSON.parse(sessionStorage.getItem(key)) || {};
      else this.singer = this.data;
      if (!this.singer || !this.singer.mid) {
        const path = this.$route.matched[0].path;
        this.$router.push({
          path,
        });
        return false;
      }
      return true;
    },
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