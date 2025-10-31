<script setup lang="ts">
import type { Pet } from '@/type';

defineProps<{ pet: Pet }>()
</script>

<template>
    <div class="container" key="{{ pet.id }}">
        <div class="icon"></div>
        <div class="name">{{ pet.name }}</div>
        <div class="owner">{{ pet.owner }}</div>
    </div>
</template>

<style scoped>
.container {
    padding: 8px;
    background: #fff;
}

.icon {}

.name {}
</style>