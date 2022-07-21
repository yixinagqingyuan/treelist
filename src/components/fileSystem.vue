<template>
  <treeList v-for="model in list" v-bind="$attrs" :model="model" :key="model.id" @on-click="onClick"
    @change-name="onChangeName" @delete-node="onDeltet" @add-node="onAddNode" @on-drop="drop" @add-folder="onAddFolder"
    @dragStart="dragStart">
    <template #icon="slotProps">
      <slot name="icon" v-bind="slotProps"></slot>
    </template>
    <template #operation="slotProps">
      <slot name="operation" v-bind="slotProps"></slot>
    </template>
  </treeList>
</template>
<script setup lang="ts">
import treeList from './treeList.vue'
interface IFileSystem {
  id: string;
  title: string;
  pid: string;
  isFolder: boolean;
  isAdd: boolean;
  children?: IFileSystem[];
}
const props = withDefaults(defineProps<{
  list: IFileSystem[]
}>(), {

})
//点击目录
const onClick = (node) => {
  console.log(node)
}
//  修改名字
const onChangeName = (node) => {
  console.log(node)
}

// 删除
const onDeltet = (node) => {
  console.log(node)
}
// 添加 
const onAddNode = (node) => {
  console.log(node)
}
// 拖拽
const drop = (node) => {
  console.log(node)
}
// 添加文件
const onAddFolder = (node) => {
  console.log(node)
}
// 拖拽开始选中node
const dragStart = (node) => {
  console.log(node)
}
</script>
<style scoped>
</style>
