<template>
  <ContainerizedLayoutWrapper view="lHh Lpr lFf">
    <q-drawer
      :mini="true"
      side="left"
      :model-value="true"
      class="relative-position"
      bordered
    >
      <ServerSelectionList class="absolute fit" :servers="servers" />
    </q-drawer>

    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </ContainerizedLayoutWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ServerSelectionList from './ServerSelectionList.vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { useUserServersLoader } from 'src/composables/user-servers-loader.composable'
import ContainerizedLayoutWrapper from 'src/components/common/ContainerizedLayoutWrapper.vue'

export default defineComponent({
  setup() {
    const { load } = useUserServersLoader()
    onMounted(load)

    const discordData = useDiscordStore()
    return {
      servers: computed(() => discordData.userServers ?? []),
    }
  },

  components: { ServerSelectionList, ContainerizedLayoutWrapper },
})
</script>
