<template>
  <div>
    <svg-icon icon-class="feedback" @click="click"/>
  </div>
</template>
<script>
export default {
  name: 'Help',

  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click() {
      this.$router.push({ name: 'SubmitFeedback' })
    }
  }
}
</script>
<style lang="scss" scoped>
.feedback-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 50px;
  vertical-align: 10px;
}
</style>
