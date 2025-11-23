<script setup lang="ts">
import FeedPetModal from '@/components/FeedPetModal.vue'
import { usePetStore } from '@/stores/pets'
import { useStudentStore } from '@/stores/students'
import { petEachLevelExpMap } from '@/utils/petsPool'
import { ref } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const petId = route.params.id
const stuStore = useStudentStore()
const petStore = usePetStore()
const pId = Number(petId)
const pet = petStore.petById(pId)

const feedModalOpen = ref(false)

const showFeedModal = () => {
  if (!stuStore.studentById(pet?.ownerId!)?.coin) {
    alert('积分为0')
    return
  }
  feedModalOpen.value = true
}
</script>

<template>
  <div class="pet-container">
    <div class="pet-main">
      <img class="pet-icon bkg" :src="petStore.petById(pId)?.icon" />
      <div class="action-btns">
        <div class="btn">发起挑战</div>
        <div class="btn" @click="showFeedModal">喂食</div>
      </div>
    </div>
    <div class="pet-info">
      <div class="info-item">
        <div class="label">名字</div>
        <div class="value">{{ petStore.petById(pId)?.name }}</div>
      </div>
      <div class="info-item">
        <div class="label">主人</div>
        <div class="value">{{ petStore.petById(pId)?.ownerName }}</div>
      </div>
      <div class="info-item">
        <div class="label">技能</div>
        <div class="value">{{ petStore.petById(pId)?.name }}</div>
      </div>
      <div class="info-item">
        <div class="label">等级</div>
        <div class="value">
          <div class="level-number">{{ petStore.petById(pId)?.level }}</div>
          <div class="progress">
            <div
              class="progress-active"
              :style="'width: ' + petStore.petNextExpProgress(pId) + '%;'"
            ></div>
            <div class="progress-text">
              {{ petStore.petNextLevelEarnedExp(pId) }} /
              {{ petEachLevelExpMap[(petStore.petById(pId)?.level || 1) + 1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FeedPetModal
    v-if="feedModalOpen"
    :open="feedModalOpen"
    :pet="petStore.petById(pId)!"
    @close="feedModalOpen = false"
  />
</template>

<style scoped>
.pet-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 24px solid #e5e5e5;
  width: 100%;
  height: 100%;
}

.pet-main {
  width: 33%;
  flex-shrink: 0;
}

.pet-icon {
  width: 100%;
  margin: 0 0 24px;
}

.bkg {
  background-image:
    linear-gradient(45deg, #f7f7f7 25%, transparent 25%),
    linear-gradient(-45deg, #f7f7f7 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f7f7f7 75%),
    linear-gradient(-45deg, transparent 75%, #f7f7f7 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
  background-color: #fffaf7;
}

.action-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
}

.action-btns .btn {
  width: 132px;
  height: 48px;
  background: #1a9d6a;
  border: 1px solid #1a9d6a35;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: 16px;
}

.action-btns .btn:last-child {
  margin-right: 0;
}

.action-btns .btn:hover {
  background: #158055;
  color: #fff;
  cursor: pointer;
  border-color: #15805555;
}

.action-btns .btn:active {
  background: #0f6643;
  border-color: #0f5c3a55;
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
  color: #5d4037;
}

.info-item .value {
  margin-left: 32px;
  color: #8d6e63;
  height: 32px;
  line-height: 32px;
}

.info-item .value .progress {
  position: relative;
  width: 200px;
  height: 24px;
  background: #cfcfcf;
  border-radius: 12px;
  margin-top: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.info-item .value .progress .progress-active {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 0%;
  height: 100%;
  background: #1a9d6a;
}

.info-item .value .progress-text {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  z-index: 1;
}
</style>
