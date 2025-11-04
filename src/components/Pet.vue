<script setup lang="ts">
import { usePetStore } from '@/stores/pets'
import { useStudentStore } from '@/stores/students'
import type { Pet } from '@/type'

const { pet } = defineProps<{ pet: Pet }>()

const emit = defineEmits<{
  edit: [id: number]
}>()

const stuStore = useStudentStore()
const petStore = usePetStore()

const handleEdit = () => {
  emit('edit', pet.id)
}
</script>

<template>
  <div class="pet-card" :key="pet.id">
    <div class="icon"></div>
    <div class="name">{{ pet.name }}</div>
    <div class="owner">{{ stuStore.studentById(pet.ownerId)?.name }}</div>
    <div class="edit" @click="handleEdit">编辑</div>
  </div>
</template>

<style scoped>
.pet-card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #66bb6a;
  background: linear-gradient(225deg, #65c11e 0%, #1ec183 100%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  color: #fff;
}

.icon {
  width: 100%;
  flex: 1;
}

.name {
  margin: 12px 0 0;
  text-align: center;
  font-size: 20px;
}

.owner {
  margin: 12px 0;
  text-align: center;
  font-size: 14px;
}

.edit {
  width: 100%;
  height: 32px;
  background: #1a9d6a;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
}
</style>
