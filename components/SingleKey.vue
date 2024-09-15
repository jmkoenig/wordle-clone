<template>
  <div class="key" :class="{ 'key--guessed': isGuessed }" @click="handleClick">
    <span>{{ singleKey.toUpperCase() }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  singleKey: { default: '', type: String }
});

const rootStore = useRootStore();

const isGuessed = computed(() => rootStore.dedupedGuessedLetters.includes(props.singleKey));

const emit = defineEmits<{
  'key-clicked': [singleKey: string]
}>();

const handleClick = () => {
  emit('key-clicked', props.singleKey);
};
</script>

<style lang="scss">
.key {
  min-width: 20px;
  background-color: lightgray;
  padding: 16px 8px;
  border-radius: 4px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &--guessed {
    background-color: darkgray;
  }
}
</style>
