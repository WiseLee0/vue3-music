<template>
  <div class="progress-bar" ref="progressRef">
    <canvas
      ref="canvasRef"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { circleCenter, calcCircleY } from "@/assets/js/utils";
export default {
  name: "progress-bar",
  emits: ["progress-changing", "progress-changed"],
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    render: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 开始 结束点坐标
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
      // 上下文
      ctx: null,
      // 圆心坐标
      circleX: 0,
      circleY: 0,
      // 半径
      R: 0,
      // 画布大小
      W: 0,
      H: 0,
      // 手指位置
      touch: {},
    };
  },
  computed: {
    progressW() {
      return this.endX - this.beginX;
    },
  },
  watch: {
    progress(newProgress) {
      if (this.W === 0) this.init();
      this.draw(newProgress * this.progressW);
    },
  },
  methods: {
    init() {
      const progressRef = this.$refs.progressRef as HTMLDivElement;
      const canvas = this.$refs.canvasRef;
      const W = (canvas.width = progressRef.clientWidth);
      const H = (canvas.height = progressRef.clientHeight);
      const paddingW = 40;
      const ctx = canvas.getContext("2d");
      const contentH = (ctx.lineWidth = 4);
      ctx.lineCap = "round";
      this.ctx = ctx;
      this.W = W;
      this.H = H;
      // 求得三点坐标
      const [leftX, leftY, centerX, centerY, rightX, rightY] = [
        paddingW,
        H,
        W / 2,
        contentH / 2 + 20,
        W - paddingW,
        H,
      ];
      // 求得圆心坐标
      const { x, y } = circleCenter(
        leftX,
        leftY,
        centerX,
        centerY,
        rightX,
        rightY
      );
      const R = y;
      const circleX = x;
      const circleY = R + contentH / 2 + 20;
      this.circleX = circleX;
      this.circleY = circleY;
      // 设置半径
      this.R = R;
      // 进度条区间
      this.beginX = leftX + 20;
      this.beginY = calcCircleY(circleX, circleY, R, this.beginX);
      this.endX = rightX - 20;
      this.endY = calcCircleY(circleX, circleY, R, this.endX);
    },
    draw(x = 0, strokeStyle = "rgba(255,255,255,0.3)") {
      this.clear();
      this.ctx.strokeStyle = strokeStyle;
      this.drawArc(this.beginX, this.beginY, this.endX, this.endY);
      this.drawPlayArc(x);
    },
    drawCircleBtn(x, y) {
      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = "#fff";
      ctx.fillStyle = "#008c8c";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    },
    drawArc(x1, y1, x2, y2) {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.arc(
        this.circleX,
        this.circleY,
        this.R,
        Math.atan2(y1 - this.circleY, x1 - this.circleX),
        Math.atan2(y2 - this.circleY, x2 - this.circleX),
        false
      );
      ctx.stroke();
      ctx.closePath();
    },
    drawPlayArc(x) {
      const cx = this.beginX + x;
      const cy = calcCircleY(this.circleX, this.circleY, this.R, cx);
      this.ctx.strokeStyle = "#008c8c";
      this.drawArc(this.beginX, this.beginY, cx, cy);
      // 绘制圆形按钮
      this.drawCircleBtn(cx, cy);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.W, this.H);
    },
    onTouchStart(e: TouchEvent) {
      const { pageX, pageY } = e.touches[0];
      var cRect = this.$refs.canvasRef.getBoundingClientRect();
      const x = (this.touch.x = pageX - cRect.left);
      const y = (this.touch.y = pageY - cRect.top);
      if (x < this.beginX || x > this.endX) return;
      if (!this._belongCircle(x, y)) return;
      this.draw(x - this.beginX);
      this.touch.x = x;
      this.touch.start = true;
      const progress = (this.touch.x - this.beginX) / this.progressW;
      this.$emit("progress-changing", progress);
    },
    onTouchMove(e: TouchEvent) {
      if (!this.touch.start) return;
      const { pageX } = e.touches[0];
      var cRect = this.$refs.canvasRef.getBoundingClientRect();
      const x = (this.touch.x = pageX - cRect.left);
      if (x < this.beginX || x > this.endX) this.onTouchEnd();
      const cx = x - this.beginX < 0 ? 0 : x - this.beginX;
      this.touch.x = x;
      this.draw(cx);
      const progress = (this.touch.x - this.beginX) / this.progressW;
      this.$emit("progress-changing", progress);
    },
    onTouchEnd(e: TouchEvent) {
      this.touch.start = false;
      const progress = (this.touch.x - this.beginX) / this.progressW;
      this.$emit("progress-changed", progress);
    },
    _belongCircle(x, y) {
      const cy = calcCircleY(this.circleX, this.circleY, this.R, x);
      const range = [y - 10, y + 10];
      if (cy < range[1] && cy > range[0]) return true;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 60px;
  width: 100%;
}
</style>