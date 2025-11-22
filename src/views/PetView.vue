<script setup lang="ts">
import { usePetStore } from '@/stores/pets'
import { useRoute } from 'vue-router'

const route = useRoute()
const petId = route.params.id
const petStore = usePetStore()

const pet = petStore.petById(Number(petId))
</script>

<template>
  <div class="pet-container">
    <img class="pet-icon" :src="pet?.icon" />
    <div class="pet-info">
      <div class="info-item">
        <div class="label">名字</div>
        <div class="value">{{ pet?.name }}</div>
      </div>
      <div class="info-item">
        <div class="label">主任</div>
        <div class="value">{{ pet?.name }}</div>
      </div>
      <div class="info-item">
        <div class="label">技能</div>
        <div class="value">{{ pet?.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 24px solid #c5c5c5;
  width: 100%;
  height: 100%;
}

.pet-icon {
  width: 33%;
  flex-shrink: 0;
  background: #f5f5f5;
}

.pet-info {
  flex: 1;
  padding: 24px;
}

.info-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 24px;
}

.info-item .label {
  font-weight: 500;
  font-size: 24px;
  height: 32px;
}

.info-item .value {
  margin-left: 32px;
  color: #333;
  height: 32px;
  line-height: 32px;
}
</style>
