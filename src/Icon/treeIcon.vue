<template>
    <icon class="iconfont" :iconName="iconNam">
    </icon>
</template>
<script setup lang="ts">
import icon from './index.vue'
import { computed } from 'vue'
const type = {
    js: 'icon-javascript',
    json: 'icon-json',
    vue: 'icon-vue',
    scss: 'icon-sass',
    file: 'icon-file',
    md: 'icon-mdx',
    tsx: 'icon-react1',
    ts: 'icon-typescript',
    css: 'icon-css',
    png: 'icon-image',
    jpg: 'icon-image',
    jpeg: 'icon-image',
    webp: 'icon-image',
    gif: 'icon-image',
    html: 'icon-html',
    babelrc: 'icon-babel'
}
const props = defineProps({
    title: String
})
const iconNam = computed(() => {
    const suffix = (props.title || '.file').split('.').pop().toLowerCase()
    if (props.title == 'package.json') return 'icon-npm'
    return type[suffix]
})
</script>
<style lang="scss" scoped>
.iconfont {
    width: 16px;
    height: 16px;
}
</style>