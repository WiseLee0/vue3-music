<template>
  <tab></tab>
  <router-view />
  <player></player>
</template>
<script>
import Tab from "@/components/tab/tab";
import Player from "@/components/player/player";
export default {
  components: {
    Tab,
    Player,
  },
};
</script>
<style lang="scss">
</style>
