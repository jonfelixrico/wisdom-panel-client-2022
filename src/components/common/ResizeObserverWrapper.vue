<template>
  <div>
    <!-- We want one more wrapping div to avoid any possible interference with this div -->
    <div class="relative-position fit">
      <q-resize-observer @resize="size = $event" />
      <div
        class="absolute"
        :style="{ width: `${size.width}px`, height: `${size.height}px` }"
      >
        <slot v-bind="size" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const size = ref({
      width: 0,
      height: 0,
    })

    return {
      size,
    }
  },
})
</script>
