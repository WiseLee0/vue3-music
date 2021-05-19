<template>
  <div class="mini-player" v-show="!fullScreen" @click="showNormalPlayer">
    <div class="cd-wrapper">
      <div ref="cdRef" class="cd">
        <img
          ref="cdImageRef"
          width="40"
          height="40"
          :src="currentSong.pic"
          :class="cdCls"
        />
      </div>
    </div>
    <div ref="sliderWrapperRef" class="slider-wrapper">
      <div class="slider-group">
        <div class="slider-page" v-for="song in playList" :key="song.mid">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ song.singer }}</p>
        </div>
      </div>
    </div>
    <div class="control">
      <progress-circle :radius="32" :progress="progress">
        <i class="icon-mini" :class="miniPlayIcon" @click.stop="togglePlay"></i>
      </progress-circle>
    </div>
    <div class="control" @click.stop="showPlaylist">
      <i class="icon-playlist"></i>
    </div>
    <player-list ref="playerlistRef"></player-list>
  </div>
</template>

<script lang="ts">
import progressCircle from "./progress-circle.vue";
import useState from "./use-state";
import useCd from "./use-cd";
import { computed, ref } from "vue";
import PlayerList from "./player-list.vue";
export default {
  name: "mini-player",
  components: { progressCircle, PlayerList },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    togglePlay: Function,
  },
  setup() {
    const playerlistRef = ref(null);
    const { fullScreen, currentSong, playList, playing, store } = useState();
    const { cdCls, cdRef, cdImageRef } = useCd();
    const miniPlayIcon = computed(() => {
      return playing.value ? "icon-pause-mini" : "icon-play-mini";
    });
    // methods
    function showNormalPlayer() {
      store.commit("setFullScreen", true);
    }
    function showPlaylist() {
      playerlistRef.value.show();
    }
    return {
      // data
      miniPlayIcon,
      playerlistRef,
      // use-state
      fullScreen,
      currentSong,
      playList,
      // use-cd
      cdCls,
      cdRef,
      cdImageRef,
      // methods
      showNormalPlayer,
      showPlaylist,
    };
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 5%;
  bottom: 10px;
  z-index: 180;
  width: 90%;
  height: 60px;
  border-radius: 50px;
  background-color: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 15px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
}
</style>