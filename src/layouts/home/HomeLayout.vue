<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>{{ $t('common.appName') }}</q-toolbar-title>

        <q-space />

        <HomeUserAvatarMenu />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-3">
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useUserLoader } from 'src/composables/user-loader.composable'
import { defineComponent, onMounted } from 'vue'
import HomeUserAvatarMenu from './HomeUserAvatarMenu.vue'

export default defineComponent({
  setup() {
    const { load } = useUserLoader()
    onMounted(load)
  },

  components: { HomeUserAvatarMenu },
})
</script>
