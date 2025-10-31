<script setup lang="ts">
import type { Pet } from '@/type';

defineProps<{ pet: Pet }>()
</script>

<template>
  <div class="container" key="{{ pet.id }}">
    <div class="icon"></div>
    <div class="name">{{ pet.name }}</div>
    <div class="owner">{{ pet.owner }}</div>
  </div>
</template>

<style scoped>
.container {
  padding: 8px;
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #66BB6A;

  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.icon {
  width: 100%;
  background-color: yellowgreen;
  flex: 1;
}

.name {
  margin: 12px 0;
  color: #333333;
  text-align: center;
  font-size: 20px;
}

.owner {
  color: #666666;
  text-align: center;
  font-size: 14px;
}
</style>
