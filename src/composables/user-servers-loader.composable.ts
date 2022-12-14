import { RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10'
import { useDiscordStore } from 'src/stores/discord-store'
import { useApi } from './api.composable'

export function useUserServersLoader() {
  const store = useDiscordStore()
  const api = useApi()

  async function load() {
    if (store.userServers) {
      console.debug('Server list already found; no need to load.')
      return
    }

    console.debug('No server list found -- now loading')
    try {
      const { data } = await api.get<RESTGetAPICurrentUserGuildsResult>(
        'discord/user/@me/server'
      )
      console.debug('User server list loaded')
      store.setUserServers(data)
    } catch (err) {
      console.error('Error encountered while loading user server list: %o', err)
    }
  }

  return {
    load,
  }
}
