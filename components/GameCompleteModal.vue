<template>
  <div class="game-complete-modal">
    Game complete
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.game-complete-modal {
  border-radius: 8px;
  width: 80vw;
  height: 80vw;
  background-color: gray;
  position: absolute;
  // Center modal to center of viewport
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
