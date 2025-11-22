<script setup lang="ts">
import { usePetStore } from '@/stores/pets'
import type { Pet } from '@/type'
import { useRouter } from 'vue-router'

const { pet } = defineProps<{ pet: Pet }>()

const emit = defineEmits<{
  edit: [id: number]
}>()
const router = useRouter()
const petStore = usePetStore()

const petDetail = petStore.petById(pet.id)

const navToPet = () => {
  router.push({ name: 'pet', params: { id: pet.id } })
}
</script>

<template>
  <div class="pet-card" :key="pet.id" @click="navToPet">
    <img class="icon" :src="petStore.petById(pet.id)?.icon" />
    <div class="name">
      {{ petDetail?.name }}
    </div>
    <div class="owner">{{ petDetail?.ownerName }}</div>
  </div>
</template>

<style scoped>
.pet-card {
  padding: 16px;
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
  height: 100%;
  object-fit: contain;
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
