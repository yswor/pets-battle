<script setup lang="ts">
import CModal from '../CModal.vue'
import BattleStage from './BattleStage.vue'
import { ref } from 'vue'

const logoSrc = new URL('../../assets/logo.png', import.meta.url).href

const stageOpen = ref(false)
const playerPickerOpen = ref(false)

const showBattleStage = () => {
  stageOpen.value = true
}

const showPlayerPicker = () => {
  playerPickerOpen.value = true
}
</script>

<template>
  <div class="float-btn" @click="showPlayerPicker">
    <img class="logo" :src="logoSrc" />
  </div>
  <CModal :open="playerPickerOpen">
    <div class="player-picker-box">
      <div class="title">你是谁</div>
      <div class=""></div>
    </div>
  </CModal>
  <BattleStage :open="stageOpen" @close="stageOpen = false" />
</template>

<style scoped>
.float-btn {
  background: #fff;
  border-radius: 50%;
  box-shadow: 2px 2px 8px 2px #00000050;

  width: 3vw;
  height: 3vw;

  cursor: pointer;

  position: fixed;
  right: 0;
  top: 50vh;
  z-index: 500;

  display: flex;
  justify-content: center;
  align-items: center;
}

.float-btn .logo {
  width: 80%;
  height: 80%;
}

.player-picker-box {
  width: 100%;
}
</style>
