<script setup lang="ts">
import type { Pet } from '@/type'

const { pet } = defineProps<{ pet: Pet }>()

const emit = defineEmits<{
  edit: [id: number]
}>()

const handleEdit = () => {
  emit('edit', pet.id)
}
</script>

<template>
  <div class="pet-card" key="{{ pet.id }}">
    <div class="icon"></div>
    <div class="name">{{ pet.name }}</div>
    <div class="owner">{{ pet.owner }}</div>
  </div>
</template>

<style scoped>
.pet-card {
  padding: 8px;
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #66bb6a;

  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.icon {
  width: 100%;
  background: linear-gradient(225deg, #65c11e 0%, #1ec183 100%);
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
