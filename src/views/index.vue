<template>
  <div 
    class="directives-view"
    v-reach-bottom.global="reachBottomHandler"
    v-back-top.global
  >
    <div class="inner"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    reachBottomHandler() {
      console.log('reach bottom');
    }
  }
}
</script>


<style lang="scss" scoped>
.directives-view {
  width: 100%;
  .inner {
    width: 100%;
    height: 1600px;
  }
}
</style>

