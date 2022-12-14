<template>
  <q-card flat bordered class="q-pa-sm">
    <div class="q-gutter-y-sm">
      <template v-if="quote">
        <div class="text-h4">
          {{ quote.content }}
        </div>

        <i18n-t
          v-if="authorData"
          class="row white-space-pre items-center text-body1"
          tag="div"
          keypath="quote.authorFormat"
        >
          <template #author>
            <ServerMemberChip :serverId="quote.serverId" :member="authorData" />
          </template>
          <template #year>
            {{ new Date(quote.submitDt).getFullYear() }}
          </template>
        </i18n-t>
        <q-skeleton v-else style="width: 50%" />
      </template>

      <template v-else>
        <q-skeleton type="rect" />
        <q-skeleton type="text" style="width: 50%" />
      </template>
    </div>

    <q-separator class="q-my-sm" />

    <div>
      <i18n-t
        v-if="quote && submitterData"
        keypath="quote.submitterFormat"
        tag="div"
        class="row items-center white-space-pre"
      >
        <template #submitter>
          <ServerMemberChip
            :serverId="quote.serverId"
            :member="submitterData"
          />
        </template>

        <template #date>{{ quote.submitDt }}</template>
      </i18n-t>
      <q-skeleton v-else />
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Quote } from 'src/types/quote.interface'
import { APIGuildMember } from 'discord-api-types/v10'
import ServerMemberChip from '../server/ServerMemberChip.vue'

export default defineComponent({
  props: {
    quote: {
      type: Object as PropType<Quote>,
    },
    authorData: {
      type: Object as PropType<APIGuildMember | null>,
    },
    submitterData: {
      type: Object as PropType<APIGuildMember | null>,
    },
  },
  components: { ServerMemberChip },
})
</script>
