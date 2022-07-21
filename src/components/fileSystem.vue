<template>
  <treeList v-for="model in list" v-bind="$attrs" :model="model" :key="model.id" @delete-node="onDeltet"
    @add-node="onAddNode" @on-drop="drop" @add-folder="onAddFolder" @dragStart="dragStart">
    <template #icon="slotProps">
      <slot name="icon" v-bind="slotProps"></slot>
    </template>
    <template #operation="slotProps">
      <slot name="operation" v-bind="slotProps"></slot>
    </template>
  </treeList>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import treeList from './treeList.vue'
const emit = defineEmits(['onDrop', 'deleteNode'])
interface IFileSystem {
  id: string;
  title: string;
  pid: string;
  isFolder: boolean;
  isAdd: boolean;
  children?: IFileSystem[];
}
const compInOperation = ref(null)
const props = withDefaults(defineProps<{
  list: IFileSystem[]
}>(), {

})
// 递归寻找父组件
function findParent(pid, Tree) {
  let targetNode = null
  function find(item, flattenTree) {
    flattenTree.find(ele => {
      if (ele.id == pid) {
        targetNode = ele
        return true
      } else {
        if (ele.children) {
          find(pid, ele.children)
        }
      }
    })
  }
  find(pid, Tree);
  return targetNode.children;
}
// 删除
const onDeltet = (node) => {
  const pid = node.pid
  if (pid) {
    const parent = findParent(pid, props.list)
    parent.chsplice(parent.findIndex(item => item.id == node.id), 1)
  } else {
    props.list.splice(props.list.findIndex(item => item.id == node.id), 1)
  }
  emit('deleteNode', {
    ...node,
    eventType: 'delete',

  })
}
// 添加 
const onAddNode = (node) => {
  console.log(node)
}
// 拖拽
const drop = (node) => {
  const pid = compInOperation.value.pid
  if (pid) {
    const parent: any = findParent(pid, props.list)
    parent.splice(parent.findIndex(item => item.id == compInOperation.value.id), 1)
  } else {
    props.list.splice(props.list.findIndex(item => item.id == compInOperation.value.id), 1)
  }
  console.log(node)
  if (node.isFolder) {
    compInOperation.value.pid = node.id
    node.children.push(compInOperation.value)
  } else {
    compInOperation.value.pid = null
    props.list.push(compInOperation.value)
  }
  emit('onDrop', {
    target: node,
    node: compInOperation.value
  })
}
// 添加文件
const onAddFolder = (node) => {
  console.log(node)
}
// 拖拽开始选中node
const dragStart = (node) => {
  compInOperation.value = node
}
</script>
<style scoped>
</style>
