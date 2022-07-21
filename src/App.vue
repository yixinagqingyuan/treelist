<template>
  <div class="bg">
    <fileSystem :selected="selected" :list="listArr" :draggable="true">
      <template #icon="{ item }">
        <template v-if="item.isFolder">
          <icon v-if="item.expanded" class="iconfont" iconName="icon-24gf-folderOpen"></icon>
          <icon v-else class="iconfont" iconName="icon-bg-folder"></icon>
        </template>
        <treeIcon class="iconfont" :title="item.title" v-else></treeIcon>
      </template>
      <template #operation="{ type }">
        <i class="iconfont icon-add_file" v-if="type == 'addFolder'"></i>
        <i class="iconfont icon-xinzeng" v-if="type == 'addDocument'"></i>
        <i class="iconfont icon-bianji" v-if="type == 'Editable'"></i>
        <i class="iconfont icon-guanbi" v-if="type == 'deleteNode'"></i>
      </template>
    </fileSystem>
  </div>
</template>
<script setup lang="ts">
import { list } from './list'
import icon from './Icon/index.vue'
import treeIcon from './Icon/treeIcon.vue'
const selected = {
  id: 3,
  pid: null,
  title: 'package.json',
  fileNameArr: ['src', 'dist', 'package.json', 'README.md'],
  isFolder: false
}
const listArr = list
</script>
<style lang="scss" scoped>
.bg {
  width: 300px;
  padding: 30px;
  background: #151515;

  .iconfont {
    color: #fff;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>
