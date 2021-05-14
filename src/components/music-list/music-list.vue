<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :probe-type="3"
      @scroll="onScroll"
      :style="scrollStyle"
      v-loading="!songs.length"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import SongList from "@/components/base/song-list/song-list.vue";
import Scroll from "../base/scroll/scroll.vue";
export default {
  name: "music-list",
  components: { SongList, Scroll },
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: "抱歉，没有找到可播放的歌曲",
    },
    rank: Boolean,
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
    };
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
  },
  computed: {
    bgImageStyle() {
      const FIXED_HEIGHT = 40;
      // 缩放系数
      let scale = (this.scrollY + this.imageHeight) / this.imageHeight;
      let zIndex = 1;
      let paddingTop = "70%";

      // 往上滑动不进行缩小
      if (scale < 1) {
        scale = 1;
        zIndex = 0;
        if (this.scrollY < FIXED_HEIGHT - this.imageHeight) {
          zIndex = 1;
          paddingTop = `${FIXED_HEIGHT}px`;
        }
      }
      return {
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})`,
        zIndex,
        paddingTop,
      };
    },
    filterStyle() {
      if (this.scrollY > 0) return {};
      const FACTOR = 30;
      let blur = -(FACTOR * this.scrollY) / this.imageHeight;
      blur = Math.min(blur, 20);
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    playBtnStyle() {
      // 固定顶部时，隐藏
      const FIXED_HEIGHT = 40;
      let scale = (this.scrollY + this.imageHeight) / this.imageHeight;
      if (scale < 1) {
        if (this.scrollY < FIXED_HEIGHT - this.imageHeight) {
          return {
            display: "none",
          };
        }
      }
      return {
        display: "block",
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll({ y }) {
      this.scrollY = y;
    },
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    z-index: 1;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>