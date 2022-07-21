
<template>
    <svg aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    iconName: string
}>()
const name = computed(() => `#${props.iconName}`)
</script>
