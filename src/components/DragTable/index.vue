<template>
  <div>
    <div class="title">
      <div
        v-for="item in columns"
        :key="item.key"
        class="block"
        :style="{ width: `${100 / columns.length}%` }"
      >
        {{ item.title }}
      </div>
    </div>
    <transition-group name="drag" class="list" tag="div">
      <div
        v-for="(item, index) in data"
        :key="item[rowKey]"
        :draggable="draggable"
        class="list-item"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
      >
        <div
          v-for="columnsItem in columns"
          :key="columnsItem.key"
          class="column"
          :style="{ width: `${100 / columns.length}%` }"
        >
          <component v-if="columnsItem.render" :is="columnsItem.render(item)" />
          <slot v-else :row="item" :name="columnsItem.key" :index="index">
            {{
              columnsItem.formatter
                ? columnsItem.formatter(item)
                : item[columnsItem.key]
            }}
          </slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DragTable'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Columns } from './'

const emit = defineEmits(['onDrag'])

const props = withDefaults(
  defineProps<{
    draggable: boolean
    data: Array<any>
    rowKey: string
    columns: Array<Columns>
  }>(),
  {
    draggable: true
  }
)

const dragIndex = ref(0)

const dragstart = (index: number) => {
  dragIndex.value = index
}

const dragenter = (e: DragEvent, index: number) => {
  e.preventDefault()
  if (dragIndex.value !== index) {
    const moving = props.data[dragIndex.value]
    const newData = props.data.concat([])
    newData.splice(dragIndex.value, 1)
    newData.splice(index, 0, moving)
    dragIndex.value = index
    emit('onDrag', newData)
  }
}

const dragover = (e: DragEvent, index: number) => {
  e.preventDefault()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
