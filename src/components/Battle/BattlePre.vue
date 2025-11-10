<script setup lang="ts">
import CModal from '../CModal.vue'
import PlayerPicker from './PlayerPicker.vue'
import { useBattleStore } from '@/stores/battle'
import type { Student } from '@/type'

const { open } = defineProps<{ open: boolean }>()
const emits = defineEmits<{ close: []; confirmPlayer: [] }>()

const battleStore = useBattleStore()

const selectPlayerA = (player: Student) => {
  battleStore.updatePlayerA(player)
}

const selectPlayerB = (player: Student) => {
  battleStore.updatePlayerB(player)
}

const handleClose = () => {
  emits('close')
}

const confirmPlayer = () => {
  emits('confirmPlayer')
}
</script>

<template>
  <CModal :open="open" @close="handleClose">
    <div class="player-prepare-box">
      <div class="pick-item">
        <div class="title">请选择玩家A</div>
        <PlayerPicker @pick="selectPlayerA" />
      </div>
      <div class="pick-item">
        <div class="title">请选择玩家B</div>
        <PlayerPicker @pick="selectPlayerB" />
      </div>
      <div class="btn confirm-btn" @click="confirmPlayer">进入战斗</div>
    </div>
  </CModal>
</template>

<style scoped>
.player-prepare-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.player-prepare-box .pick-item {
  margin: 0 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.player-prepare-box .pick-item .title {
  margin: 0 0 16px;
}

.player-prepare-box .confirm-btn {
  background: yellowgreen;
  border-radius: 22px;
  width: 128px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #fff;
}
</style>
