<script setup lang="ts">
import { reactive, ref } from 'vue'
import Pet from '@/components/Pet.vue'
import CModal from '@/components/CModal.vue'
import { usePetStore } from '@/stores/pets'

const petStore = usePetStore()

const curEditPet = reactive<any>({ pet: {} })
const editModalOpen = ref(false)

const showEditModal = (id: number) => {
  curEditPet.pet = petStore.pets.find((p) => p.id === id) || {}
  editModalOpen.value = true
}

const closeEditModal = () => {
  editModalOpen.value = false
  curEditPet.pet = {}
}

const confirmEdit = () => {
  editModalOpen.value = false
}
</script>

<template>
  <div class="container">
    <div class="list">
      <div class="pet-item" v-for="pet in petStore.pets" :key="pet.id">
        <Pet :pet="pet" @edit="showEditModal" />
      </div>
    </div>
    <CModal :open="editModalOpen" @close="closeEditModal">
      <div class="edit-modal">
        <div class="input-box">
          <div class="label">宠物姓名</div>
          <input class="edit-input" v-model="curEditPet.pet.name" />
        </div>
        <div class="btns">
          <div class="btn cancel-btn" @click="closeEditModal">取消</div>
          <div class="btn confirm-btn" @click="confirmEdit">确认</div>
        </div>
      </div>
    </CModal>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
}

.pet-item {
  width: calc((100% - 16px * 8) / 8);
  height: 36%;
  margin: 0 16px 16px 0;
}

.edit-modal {
  width: 100%;
  height: calc(24vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.edit-modal .input-box {
  width: 60%;
  height: 40px;
}

.edit-modal .input-box .label {
  font-weight: 600;
  margin: 0 0 12px;
  font-size: 20px;
}

.edit-modal .input-box .edit-input {
  width: 100%;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ccc;
  padding: 0 12px;
}

.edit-modal .btns {
  width: 80%;
  height: 32px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-modal .btns .cancel-btn,
.edit-modal .btns .confirm-btn {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #ffc107;
}
.edit-modal .btns .confirm-btn {
  margin-left: 12px;
  background: #1a9d6a;
  width: 100%;
  height: 100%;
}
</style>
