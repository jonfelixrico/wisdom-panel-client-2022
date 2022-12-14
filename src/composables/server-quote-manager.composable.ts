import { useQuotesStore } from 'src/stores/quotes-store'
import { Quote } from 'src/types/quote.interface'
import { computed } from 'vue'
import { useApi } from './api.composable'

export function useServerQuoteManager(serverId: string) {
  const store = useQuotesStore()
  const api = useApi()

  async function doLoad() {
    const { data } = await api.get<Quote[]>(`server/${serverId}/quote`)
    store.addQuotes(data)
    data
  }

  const serverQuotes = computed(() =>
    store.quotes?.filter((q) => q.serverId === serverId)
  )

  async function load() {
    if (serverQuotes.value?.length) {
      console.debug(
        'Did not proceed with load -- quotes for server %s are already loaded',
        serverId
      )
      return
    }

    const data = await doLoad()
    console.debug('Loaded quotes for server %s', serverId)
    return data
  }

  return {
    forceLoad: doLoad,
    quotes: serverQuotes,
    load,
  }
}
