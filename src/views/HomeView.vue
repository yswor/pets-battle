<script setup lang="ts">
import { ref } from 'vue';
import Pet from '@/components/Pet.vue';

const pets = ref([
    { id: 1, name: '小白', owner: '张三', icon: 'icon1.png' },
    { id: 2, name: '小黑', owner: '李四', icon: 'icon2.png' },
    { id: 3, name: '小花', owner: '王五', icon: 'icon3.png' },
])
</script>

<template>
    <div class="home">
        <h1>宠物列表</h1>
        <div v-for="pet in pets" :key="pet.id">
            <Pet :pet="pet" />
        </div>
    </div>
</template>

<style scoped>
.home {
    padding: 20px;
}
</style>