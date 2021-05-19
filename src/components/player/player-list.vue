<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playList.length" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click="changeMode"> </i>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" name="list" tag="ul">
              <li
                class="item"
                v-for="song in sequeceList"
                :key="song.mid"
                @click="selectItem(song)"
              >
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text" :class="playSongHigh(song)">{{
                  song.name
                }}</span>
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i class="icon-not-favorite"></i>
                </span>
                <span
                  class="delete"
                  @click.stop="removeSong(song)"
                  :class="{ disable: removing }"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <!-- <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div> -->
          <div class="list-footer" @click="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref="confirmRef"
          @confirm="confirmClear"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
        ></confirm>
        <!-- <add-song ref="addSongRef"></add-song> -->
      </div>
    </transition>
  </teleport>
</template>

<script>
import useMode from "./use-mode";
import useState from "./use-state";
import Confirm from "@/components/base/confirm/confirm.vue";
import Scroll from "@/components/base/scroll/scroll.vue";
import { ref, watch, nextTick } from "vue";
export default {
  name: "player-list",
  components: { Confirm, Scroll },
  setup() {
    const visible = ref(false);
    const scrollRef = ref(null);
    const listRef = ref(null);
    const confirmRef = ref(false);
    const removing = ref(false);

    const { playList, sequeceList, store, currentSong } = useState();
    const { modeIcon, changeMode, modeText } = useMode();

    watch(currentSong, async (newSong) => {
      if (!visible.value || !newSong.mid) return;
      await nextTick();
      scrollToCurrent();
    });

    // methods
    function selectItem(song) {
      const index = playList.value.findIndex((item) => item.mid == song.mid);
      store.commit("setPlayIndex", index);
      store.commit("setPlayState", true);
    }
    function getCurrentIcon(song) {
      if (song.mid === currentSong.value.mid) return "icon-play";
    }
    function playSongHigh(song) {
      if (song.mid === currentSong.value.mid) return "play-high";
    }
    function removeSong(song) {
      if (removing.value) return;
      removing.value = true;
      store.dispatch("removeSong", song);
      if (!playList.value.length) hide();
      setTimeout(() => {
        removing.value = false;
      }, 300);
    }
    function show() {
      visible.value = true;
    }
    function hide() {
      visible.value = false;
    }
    function confirmClear() {
      store.dispatch("clearSongList");
      hide();
    }
    function scrollToCurrent() {
      const index = sequeceList.value.findIndex(
        (song) => currentSong.value.mid === song.mid
      );
      if (index === -1) return;
      const target = listRef.value.$el.children[index];
      scrollRef.value.scroll.scrollToElement(target, 300);
    }

    // confirm methods
    function showConfirm() {
      confirmRef.value.show();
    }

    return {
      // data
      visible,
      removing,
      // scroll
      scrollRef,
      listRef,
      // use-state
      playList,
      sequeceList,
      // use-mode
      modeIcon,
      changeMode,
      modeText,
      // confirm
      confirmRef,
      showConfirm,
      //methods
      selectItem,
      getCurrentIcon,
      playSongHigh,
      removeSong,
      show,
      hide,
      confirmClear,
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .play-high {
          color: $color-theme;
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>