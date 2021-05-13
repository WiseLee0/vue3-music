<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getBanner, getHotDiscRecommend } from "@/api/recommend";
import Slider from "@/components/base/slider/slider.vue";
import Scroll from "@/components/base/scroll/scroll.vue";

export default defineComponent({
  name: "Home",
  components: {
    Slider,
    Scroll,
  },
  data() {
    return {
      sliders: [],
      albums: [],
    };
  },
  computed: {
    loading() {
      return !this.sliders.length && !this.albums.length;
    },
  },
  async created() {
    this.sliders = await getBanner();
    this.albums = await getHotDiscRecommend();
  },
});
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: $header-top;
  bottom: 0;
  overflow: scroll;
  z-index: -99;
  background-image: linear-gradient(
    rgb(36, 20, 57),
    rgb(18, 54, 66),
    rgb(47, 18, 64)
  );
  .recommend-content {
    height: 100%;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      padding: 0 20px;
      .list-title {
        font-family: "webfont" !important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        height: 65px;
        line-height: 65px;
        color: $color-text;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        background-image: url("../assets/img/disc.png");
        background-size: 50px 60px;
        background-repeat: no-repeat;
        background-position-x: 40px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          z-index: 99;
          border-radius: 5px;
          overflow: hidden;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          height: 50px;
          overflow: hidden;
          font-size: $font-size-medium;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0 20px;
          border-radius: 0 5px 5px 0;
          z-index: -1;
        }
        .name {
          @include no-wrap();
          color: $color-text;
          margin-bottom: 7px;
        }
        .title {
          @include no-wrap();
          font-size: 12px;
          color: $color-text-d;
        }
      }
    }
  }
}
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_1w7hqqltrq9.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_1w7hqqltrq9.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_1w7hqqltrq9.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_1w7hqqltrq9.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_1w7hqqltrq9.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_1w7hqqltrq9.svg#站酷小薇体") format("svg"); /* iOS 4.1- */
}
</style>