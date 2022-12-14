import { RESTGetAPIGuildMembersResult } from 'discord-api-types/v10'
import { useDiscordStore } from 'src/stores/discord-store'
import { useApi } from './api.composable'

export function useServerMembersLoader(serverId: string) {
  const store = useDiscordStore()
  const api = useApi()

  async function doLoad() {
    const { data } = await api.get<RESTGetAPIGuildMembersResult>(
      `discord/server/${serverId}/member`
    )
    store.addToServerMembersMap(serverId, data)
    return data
  }

  async function load() {
    if (store.serverMembersMap[serverId]) {
      console.debug(
        'Did not load members for server %s: already loaded',
        serverId
      )
      return
    }

    const data = await doLoad()
    console.debug('Member data loaded for server %s', serverId)
    return data
  }

  return {
    load,
    forceLoad: doLoad,
  }
}
