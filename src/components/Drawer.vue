<script setup lang="ts">
defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  close: []
}>()

const clickMask = () => {
  emit('close')
}
</script>

<template>
  <div v-if="open" class="drawer-container">
    <div class="slot">
      <slot></slot>
    </div>
    <div class="drawer-mask" @click.stop="clickMask"></div>
  </div>
</template>

<style scoped>
.drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  pointer-events: none;
}

.drawer-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: #00000050;
  pointer-events: auto;
}

.slot {
  position: relative;
  z-index: 1002;
  width: 42%;
  height: 100%;
  background: #ffffff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  padding: 32px;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
}
</style>
