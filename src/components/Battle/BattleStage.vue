<script setup lang="ts">
import PlayerPicker from './PlayerPicker.vue'

const { open } = defineProps<{ open: boolean }>()
const emits = defineEmits<{ close: [] }>()

const closeStage = () => {
  emits('close')
}
</script>

<template>
  <div class="battle-stage-container" v-if="open">
    <!-- <div class="tip">准备战斗!!</div> -->
    <div class="stage checker">
      <div class="area left">
        <div class="pre">请选择玩家A</div>
        <PlayerPicker @pick="" />
      </div>
      <div class="area right">
        <div class="pre">请选择玩家B</div>
        <PlayerPicker />
      </div>
      <div class="stage-vertical-line"></div>
    </div>
    <div class="mask" @click="closeStage"></div>
  </div>
</template>

<style scoped>
.battle-stage-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: #00000050;
}

.tip {
  z-index: 1002;
  font-size: 56px;
  color: red;
  margin: 0 0 32px;
  font-weight: 600;
}

.stage {
  width: 80vw;
  height: 80vh;
  background: #fff;
  z-index: 1002;

  display: flex;
  justify-content: center;
  align-items: center;
}

.checker {
  background: greenyellow;
  /* background-image:
    linear-gradient(45deg, #f4c2c2 25%, transparent 25%),
    linear-gradient(-45deg, #f4c2c2 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f4c2c2 75%),
    linear-gradient(-45deg, transparent 75%, #f4c2c2 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
  background-color: #fffaf7; */
}

.stage .stage-vertical-line {
  width: 2px;
  height: 80%;
  background: #fff;
  order: 1;
}

.stage .area {
  width: 45%;
  height: 90%;
  margin: 0 20px;
}

.stage .area.right {
  order: 2;
}
</style>
