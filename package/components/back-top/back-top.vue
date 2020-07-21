<template>
      <div class="back-top">
        <img src="../../assets/images/back-top-default.png" class="icon" />
      </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
.back-top {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>