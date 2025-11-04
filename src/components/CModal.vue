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
  <div v-if="open" class="common-modal-container">
    <div class="slot">
      <slot></slot>
    </div>
    <div class="common-modal-mask" @click.stop="clickMask"></div>
  </div>
</template>

<style scoped>
.common-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.common-modal-mask {
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
  width: 24vw;
  min-height: 24vh;
  background: #ffffff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  padding: 32px;
  border-radius: 12px;
}
</style>
