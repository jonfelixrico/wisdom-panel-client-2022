<template>
  <q-page class="relative-position">
    <ResizeObserverWrapper class="absolute fit" v-slot="{ width, height }">
      <q-layout
        :view="view"
        container
        :style="{ width: `${width}px`, height: `${height}px` }"
      >
        <slot />
      </q-layout>
    </ResizeObserverWrapper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResizeObserverWrapper from './ResizeObserverWrapper.vue'

export default defineComponent({
  props: {
    view: String,
  },

  components: { ResizeObserverWrapper },
})
</script>
