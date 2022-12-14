import { RESTGetAPICurrentUserResult } from 'discord-api-types/v10'
import { useDiscordStore } from 'src/stores/discord-store'
import { useApi } from './api.composable'

export function useUserLoader() {
  const store = useDiscordStore()
  const api = useApi()

  async function load() {
    if (store.user) {
      console.debug('User already found; no need to load.')
      return
    }

    console.debug('No user data found -- now loading')
    try {
      const { data } = await api.get<RESTGetAPICurrentUserResult>(
        'discord/user/@me'
      )
      console.debug('User data loaded')

      store.setUser(data)
    } catch (err) {
      console.error('Error encountered while loading user data: %o', err)
    }
  }

  return {
    load,
  }
}
