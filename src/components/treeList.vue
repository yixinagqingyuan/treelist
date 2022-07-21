<template>
    <div class="vtl-node" :id="model.id" :class="{ 'vtl-leaf-node': !isFolder, 'vtl-tree-node': isFolder }">
        <div :class="treeNodeClass" :draggable="draggable" @dragover="dragOver" @drop="drop" @dragstart="dragStart"
            @mouseover="mouseOver" @dragenter="dragEnter" @dragleave="dragLeave" @mouseout="mouseOut"
            @click.stop="toggle">
            <div class="vtl-border-text">
                <template v-if="isFolder">
                    <slot v-if="expanded" :item="{ title: model.title, isFolder: true, expanded: true }" name="icon">
                    </slot>
                    <slot v-else :item="{ title: model.title, isFolder: true, expanded: false }" name="icon"></slot>
                </template>
                <slot v-else :item="{ title: model.title, isFolder: false }" name="icon"></slot>
                <span class="vtl-node-content ellipsis" v-if="!editable && !model.isAdd">
                    {{ model.title }}
                </span>
                <input v-else class="vtl-input" type="text" ref="nodeInput" v-model="model.title"
                    @blur="setUnEditable" />
            </div>
            <div class="vtl-operation" v-show="isHover && !editable && !model.isAdd">
                <span @click.stop.prevent="addChildFolder" v-if="isFolder">
                    <slot name="operation" type="addFolder"></slot>
                </span>
                <span @click.stop.prevent="addChildDocument" v-if="isFolder">
                    <slot name="operation" type="addDocument"></slot>
                </span>
                <span @click.stop.prevent="setEditable">
                    <slot name="operation" type="Editable"></slot>
                </span>
                <span @click.stop.prevent="delNode">
                    <slot name="operation" type="deleteNode"></slot>
                </span>
            </div>
        </div>
    </div>
    <div class="vtl-tree-margin" v-show="expanded" v-if="isFolder">
        <!-- 这里无法使用$attr来透传属性官方还未解决此bug -->
        <treeList @on-click="(depth) => $emit('onClick', depth)" @change-name="(depth) => $emit('changeName', depth)"
            @delete-node="(depth) => $emit('deleteNode', depth)" @add-node="(depth) => $emit('addNode', depth)"
            @on-drop="(depth) => $emit('onDrop', depth)" @add-folder="(depth) => $emit('addFolder', depth)"
            @setDragEnterNode="setDragEnterNode" @setDragFile="setDragFile" @setDragFolder="setDragFolder"
            v-for="newmodel in model.children" :selected="selected" :model="newmodel" :key="newmodel.id">
            <template #icon="slotProps">
                <slot name="icon" v-bind="slotProps"></slot>
            </template>
            <template #operation="slotProps">
                <slot name="operation" v-bind="slotProps"></slot>
            </template>
        </treeList>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
interface IFileSystem {
    id: string;
    title: string;
    pid: string;
    isFolder: boolean;
    isAdd: boolean;
    children?: IFileSystem[];
}
// 吐出去的事件
const emit = defineEmits(['onClick', 'changeName', 'deleteNode', 'addNode', 'addFolder', 'onDrop', 'setDragEnterNode', 'setDragFile', 'setDragFolder', 'dragStart'])
// 拿到传入的值
const props = withDefaults(defineProps<{
    model: IFileSystem,
    draggable?: boolean,
    selected?: IFileSystem
}>(), {
    draggable: true,
})
//是否移入
const isHover = ref(false)
// 修改目录名字
const editable = ref(false)
// 拖拽移入
const isDragEnterNode = ref(false)
// 是否拖拽文件
const isDragFile = ref(false)
// 是否展开
const expanded = ref(true)
// inputRef
const nodeInput = ref(null)
// 是否是文件夹
const isFolder = computed(() => {
    return props.model.isFolder
})
const isSelected = computed(() => props.selected.id === props.model.id)
// 拖拽样式
const treeNodeClass = computed(() => {
    return {
        'vtl-node-main': true,
        'vtl-active': isDragEnterNode.value,
        'vtl-active-file': isDragFile.value,
        'selected': isSelected.value
    }
})
// 最后一个移入的内容保存为了防止重复移入
let lastenter = null;
// 删除目录
const delNode = () => {
    emit('deleteNode', {
        id: props.model.id,
        eventType: 'delete',
        isFolder: isFolder.value
    })
}
// 选中effect
watchEffect(() => {
    const $input = nodeInput.value
    if ($input) {
        // 获取焦点
        $input.focus()
        // 设置光标位置
        $input.setSelectionRange(0, $input.value.length)
    }
})
// 编辑目录名字
const setEditable = () => {
    editable.value = true
}
// 修改目录名字
const setUnEditable = (e) => {
    editable.value = false
    emit('changeName', {
        id: props.model.id,
        pid: props.model.pid,
        isAdd: props.model.isAdd,
        newName: e.target.value,
        eventType: 'blur',
        isFolder: isFolder.value
    })
}
// 展开收起
const toggle = () => {
    if (isFolder.value) {
        expanded.value = !expanded.value
    } else {
        emit('onClick', {
            toggle: toggle,
            ...props.model
        })
    }
}
// 拖拽结束
const mouseOver = () => {
    isHover.value = true
}
// 移出
const mouseOut = () => {
    isHover.value = false
}
// 添加目录
const addChildFolder = () => {
    emit('addFolder', {
        id: props.model.id,
        isFolder: true
    })
}
// 添加文件
const addChildDocument = (node) => {
    emit('addNode', {
        id: props.model.id,
        isFolder: false
    })
}
// 拖拽开始
const dragStart = () => {
    emit('dragStart', {
        node: props.model
    })
}
const dragOver = (e) => {
    e.preventDefault()
    return true
}

const dragEnter = (e) => {
    lastenter = e.target;
    console.log('进入', props.model.id)
    // 由于 dragEnter 发生在 dragLeave 之前，导致必须要使用定时器做一个延时
    setTimeout(() => {
        if (isFolder.value) {
            expanded.value = true
            isDragFile.value = true
        } else {
            emit('setDragFile', true)
        }
        isDragEnterNode.value = true
        emit('setDragEnterNode', true)
    });
}
const dragLeave = (e) => {
    // 为了防止多次选中问题
    if (lastenter == e.target) {
        console.log('离开', props.model.id)
        if (isFolder.value) {
            isDragFile.value = false
        } else {
            emit('setDragFile', false)
        }
        emit('setDragEnterNode', false)
        isDragEnterNode.value = false
    }
}
const drop = (e) => {
    isDragFile.value = false
    isDragEnterNode.value = false
    emit('setDragEnterNode', false)
    emit('setDragFile', false)
    // 为了获取路径需要判断是不是文件夹，如果不是文件夹向上找
    if (isFolder.value) {
        emit('onDrop', {
            target: props.model,
        })
    } else {
        emit('setDragFolder')
    }

}
const setDragEnterNode = (bol) => {
    isDragEnterNode.value = bol
}
const setDragFile = (bol) => {
    isDragFile.value = bol
}
// 找到文件夹
const setDragFolder = () => {
    emit('onDrop', {
        target: props.model,
    })
}
</script>
<style lang="scss">
.vtl-node {
    .vtl-node-main {
        display: flex;
        align-items: center;
        padding: 2px 0 2px 1rem;
        cursor: pointer;

        &:hover {
            .vtl-border-text {
                width: 80%;
            }

        }

        .vtl-border-text {
            flex: 1;
            width: 100%;

            .iconfont {
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
            }
        }

        &.selected {
            background-color: rgb(36, 36, 36);
        }

        .vtl-input {
            border: none;
            max-width: 150px;
            padding: 5px 0;
            padding-left: 5px;
            margin-left: 5px;

            &:focus {
                outline: none;
            }
        }

        .vtl-node-content {
            color: rgb(153, 153, 153);
            padding-left: 5px;
            font-size: 14px;
            width: 80%;
            display: inline-block;
            vertical-align: bottom;

        }

        &:hover {
            .vtl-node-content {
                color: #fff;
                overflow: hidden;
            }
        }

        &.vtl-active {


            * {
                pointer-events: none;
            }
        }

        &.vtl-active-file {
            outline: 2px dashed #353f51;
        }

        .vtl-operation {
            padding-right: 10px;
        }
    }
}

.vtl-tree-margin {
    padding-left: 1em;
}
</style>
