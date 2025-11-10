<script setup lang="ts">
import CModal from '../CModal.vue'
import BattlePre from './BattlePre.vue'
import BattleStage from './BattleStage.vue'
import { ref } from 'vue'

const logoSrc = new URL('../../assets/logo.png', import.meta.url).href

const stageOpen = ref(false)
const battlePrepareOpen = ref(false)

const showBattleStage = () => {
  stageOpen.value = true
}

const showBattlePrepare = () => {
  battlePrepareOpen.value = true
}

const handleConfirmPlayer = () => {
  battlePrepareOpen.value = false
  showBattleStage()
}
</script>

<template>
  <div class="float-btn" @click="showBattlePrepare">
    <img class="logo" :src="logoSrc" />
  </div>
  <BattlePre
    :open="battlePrepareOpen"
    @close="battlePrepareOpen = false"
    @confirm-player="handleConfirmPlayer"
  />
  <BattleStage :open="stageOpen" @close="stageOpen = false" />
</template>

<style scoped>
.float-btn {
  background: #fff;
  border-radius: 50%;
  box-shadow: 2px 8px 16px #00000030;

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
  width: 70%;
  height: 70%;
  scale: 1;
  animation: breath infinite 2s linear;
}

@keyframes breath {
  from {
    scale: 1;
  }

  50% {
    scale: 1.1;
  }
  to {
    scale: 1;
  }
}

.player-picker-box {
  width: 100%;
  height: 100%;
}
</style>
