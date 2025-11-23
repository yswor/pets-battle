<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import CModal from '@/components/CModal.vue'
import { useStudentStore } from '@/stores/students'
import { usePetStore } from '@/stores/pets'
import { getLevel } from '@/utils/petsPool'

const { pet, open } = defineProps<{
  pet: {
    id: number
    level: number
    exp: number
    ownerId: number
  }
  open: boolean
}>()
const emits = defineEmits<{
  (e: 'close'): void
}>()
const stuStore = useStudentStore()
const petStore = usePetStore()
const totalCoin = stuStore.studentById(pet?.ownerId!)?.coin || 0
const feedCoin = ref(0)

const box = ref<HTMLElement | null>(null)

let isDragging = false
let startX = 0
const movedDistance = ref(0)
let maxDistance = 0

const startDrag = (event: MouseEvent) => {
  isDragging = true
  startX = event.clientX
}

const getRealDistance = (move: number) => {
  const realDistance = movedDistance.value + move
  if (realDistance > maxDistance) {
    return maxDistance
  }
  if (realDistance < 0) {
    return 0
  }
  return realDistance
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging) return
  const move = event.clientX - startX
  const realDistance = getRealDistance(move)
  const percent = realDistance / maxDistance
  feedCoin.value = Math.round(totalCoin * percent)
  movedDistance.value = realDistance

  startX = event.clientX
}

const stopDrag = () => {
  isDragging = false

  if (((maxDistance - movedDistance.value) / maxDistance) * totalCoin < 1) {
    movedDistance.value = maxDistance
    feedCoin.value = totalCoin
  } else if ((movedDistance.value / maxDistance) * totalCoin < 1) {
    movedDistance.value = 0
    feedCoin.value = 0
  }
}

const handleClose = () => {
  emits('close')
}

watch(
  () => open,
  async (val) => {
    await nextTick()
    if (val && box.value) {
      maxDistance = box.value.getBoundingClientRect().width - 16
    }
  },
)

onMounted(async () => {
  await nextTick()
  if (box.value) {
    maxDistance = box.value.getBoundingClientRect().width - 16
  }
})

const feedPet = () => {
  const student = stuStore.studentById(pet.ownerId)
  const petData = petStore.petById(pet.id)

  if (!student) {
    alert('未找到该宠物的主人')
    return
  }
  if (!petData) {
    alert('未找到宠物数据')

    return
  }

  const restCoin = totalCoin - feedCoin.value

  stuStore.updateStudent({
    ...student,
    coin: restCoin,
  })

  const petExp = petData.exp + feedCoin.value

  petStore.updatePet({
    id: petData.id,
    petId: petData.petId,
    ownerId: petData.ownerId,
    exp: petExp,
    level: getLevel(petData.level, petExp),
  })

  emits('close')
}
</script>

<template>
  <CModal :open="open" @close="handleClose">
    <template #header>喂食宠物</template>
    <template #body>
      <div class="coin-rest">剩余积分：{{ totalCoin - feedCoin }}</div>
      <div
        class="slide-box"
        ref="box"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
      >
        <div class="slide-progress" :style="{ width: `${movedDistance}px` }"></div>
        <div class="slide-block" :style="{ left: `${movedDistance}px` }"></div>
      </div>
      <div class="feed-coin">喂食积分：{{ feedCoin }}</div>
    </template>
    <template #footer>
      <div class="btn close-btn" @click="handleClose">取消</div>
      <div class="btn confirm-btn" @click="feedPet">确定</div>
    </template>
  </CModal>
</template>

<style scoped>
.slide-box {
  position: relative;
  margin: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  background: #158055;
}

.slide-box .slide-block {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 16px;
  height: 32px;
  background: #ffc107;
  cursor: pointer;
  will-change: left;
}

.slide-box .slide-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  z-index: 1;
  background: #ffc107;
}

.close-btn {
  width: 100%;
  height: 100%;
  border: 1px solid #1a9d6a;
  border-radius: 8px;

  color: #1a9d6a;
  margin-right: 16px;
}

.confirm-btn {
  width: 100%;
  height: 100%;
  background: #1a9d6a;
  border: 1px solid #1a9d6a35;
  border-radius: 8px;

  color: #fff;
}
</style>
