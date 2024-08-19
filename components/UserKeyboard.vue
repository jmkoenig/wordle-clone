<template>
  <div class="keyboard">
    <div v-for="(row, index) in keys" :key="index" class="keyboard__row">
      <SingleKey
        v-for="letter in row"
        :single-key="letter"
        :letter="letter"
        class="row__letter"
        @key-clicked="handleClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { keyboard } from '../static/keyboard';

const keys = computed(() => {
  return keyboard;
});

const emit = defineEmits<{
  'key-clicked': [singleKey: string]
}>();

const handleClick = (singleKey: string) => {
  emit('key-clicked', singleKey);
};
</script>

<style lang="scss">
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 8px;
  
  &__row {
    display: flex;
    grid-gap: 8px;
  }
}
</style>
