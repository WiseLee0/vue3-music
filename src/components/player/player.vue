<template>
  <div class="player" v-show="playList.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div
        class="middle"
        @touchstart.prevent="onMiddleTouchStart"
        @touchmove.prevent="onMiddleTouchMove"
        @touchend.prevent="onMiddleTouchEnd"
      >
        <div class="middle-l">
          <div ref="cdWrapperRef" class="cd-wrapper">
            <div ref="cdRef" class="cd">
              <img
                ref="cdImageRef"
                class="image"
                :src="currentSong.pic"
                :class="cdCls"
              />
            </div>
          </div>
          <!-- <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{ playingLyric }}</div>
          </div> -->
        </div>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <progress-bar
            :progress="progress"
            @progress-changed="onProgressChanged"
            @progress-changing="onProgressChanging"
          ></progress-bar>
          <div class="icon i-left">
            <i @click="changeMode" :class="modeIcon"></i>
          </div>
          <div class="icon i-right">
            <i @click="toggleFavorite(currentSong)" class="icon-favorite"></i>
          </div>
        </div>
        <div class="progress-operators">
          <span class="time-l">{{ formatTime(playTime) }}</span>
          <div class="operators">
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
          </div>
          <span class="time-r">{{ formatTime(currentSong.duration) }}</span>
        </div>
      </div>
    </div>
    <mini-player :progress="progress" :toggle-play="togglePlay"></mini-player>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script lang="ts">
import ProgressBar from "./progress-bar.vue";
import useState from "./use-state";
import useMode from "./use-mode";
import { formatTime } from "@/assets/js/utils";
import { ref, watch, computed } from "vue";
import { PLAY_MODE } from "@/store/types";
import MiniPlayer from "./mini-player.vue";
import useCd from "./use-cd";
export default {
  name: "player",
  components: { ProgressBar, MiniPlayer },
  setup() {
    const audioRef = ref(null);
    const playTime = ref(0); // 歌曲播放时间
    const songReady = ref(false); // 歌曲准备
    let progressMove = false; // 进度条滑动中

    const {
      playList,
      currentSong,
      playIcon,
      playing,
      playIndex,
      store,
      playMode,
      fullScreen,
    } = useState();

    const { modeIcon, changeMode } = useMode();
    const { cdCls, cdRef, cdImageRef } = useCd();

    const progress = computed(() => {
      return playTime.value / currentSong.value.duration;
    });
    const disableCls = computed(() => {
      return songReady.value ? "" : "disable";
    });

    watch(currentSong, (newSong) => {
      if (!newSong.mid || !newSong.url) return;
      playTime.value = 0;
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
      store.commit("setPlayState", true);
    });
    watch(playing, (status) => {
      if (!songReady.value) return;
      const audioEl = audioRef.value;
      if (status) audioEl.play();
      else audioEl.pause();
    });
    // audio methods
    function pause() {
      store.commit("setPlayState", false);
    }
    function ready() {
      if (songReady.value) return;
      songReady.value = true;
    }
    function error() {
      songReady.value = true;
    }
    function updateTime(e) {
      if (progressMove) return;
      playTime.value = e.target.currentTime;
    }
    function end() {
      playTime.value = 0;
      if (playMode.value == PLAY_MODE.loop) loop();
      else next();
    }
    function loop() {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
      store.commit("setPlayState", true);
    }
    // progress-bar methods
    function onProgressChanged(progress) {
      progressMove = false;
      audioRef.value.currentTime = playTime.value =
        currentSong.value.duration * progress;
    }
    function onProgressChanging(progress) {
      progressMove = true;
      playTime.value = currentSong.value.duration * progress;
    }
    // operators
    function togglePlay() {
      if (!songReady.value) return;
      store.commit("setPlayState", !playing.value);
    }
    function prev() {
      if (!songReady.value || !playList.value.length) return;
      let index = playIndex.value - 1;
      if (index === -1) index = playList.value.length - 1;
      store.commit("setPlayIndex", index);
    }
    function next() {
      if (!songReady.value || !playList.value.length) return;
      let index = playIndex.value + 1;
      if (index === playList.value.length) index = 0;
      store.commit("setPlayIndex", index);
    }
    // methods
    function goBack() {
      store.commit("setFullScreen", false);
    }

    return {
      //data
      audioRef,
      playTime,
      disableCls,
      // store
      playList,
      currentSong,
      playIcon,
      fullScreen,
      // progress-bar
      progress,
      onProgressChanged,
      onProgressChanging,
      // audio
      pause,
      ready,
      error,
      updateTime,
      end,
      // operators
      togglePlay,
      prev,
      next,
      // useMode
      modeIcon,
      changeMode,
      // useCd
      cdCls,
      cdRef,
      cdImageRef,
      // player methods
      goBack,
      // utils
      formatTime,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
  }
  .top {
    position: relative;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
    }
    .icon-back {
      display: block;
      padding: 9px;
      font-size: $font-size-large-x;
      color: $color-theme;
      transform: rotate(-90deg);
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      @include no-wrap();
      font-size: $font-size-large;
      color: $color-text;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    .middle-l {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        box-sizing: border-box;
        height: 100%;
        .cd {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid rgba(255, 255, 255, 0.1);
          }
          .playing {
            animation: rotate 20s linear infinite;
          }
        }
      }
      .playing-lyric-wrapper {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
        .playing-lyric {
          height: 20px;
          line-height: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
      }
    }
    .middle-r {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .lyric-wrapper {
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
        .text {
          line-height: 32px;
          color: $color-text-l;
          font-size: $font-size-medium;
          &.current {
            color: $color-text;
          }
        }
        .pure-music {
          padding-top: 50%;
          line-height: 32px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 20px;
    width: 100%;
    .progress-wrapper {
      width: 100%;
      position: relative;
      font-size: 30px;
      color: $color-theme;
      .i-left {
        position: absolute;
        top: 0;
        left: 20px;
      }
      .i-right {
        position: absolute;
        top: 0;
        right: 20px;
      }
    }
    .progress-operators {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      .time-l,
      .time-r {
        color: $color-text;
        font-size: $font-size-small;
        width: 40px;
        text-align: center;
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-sub-theme;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 35px;
          text-align: center;
          transform: translateY(-15px);
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
      }
    }
  }
}
</style>