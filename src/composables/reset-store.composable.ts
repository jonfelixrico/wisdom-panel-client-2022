// Code taken from https://lobotuerto.com/notes/til-how-to-reset-all-stores-in-pinia

import { getActivePinia, Pinia, Store } from 'pinia'

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>
}

interface ResetStore {
  [name: string]: () => void
  all: () => void
}

export function useResetStore(): ResetStore {
  const pinia = getActivePinia() as ExtendedPinia

  if (!pinia) {
    console.warn('There is no active Pinia instance')
    return {
      all: () => {
        return
      },
    }
  }

  const resetStores: ResetStore = {
    all: () => pinia._s.forEach((store) => store.$reset()),
  }

  pinia._s.forEach((store, name) => {
    resetStores[name] = () => store.$reset()
  })

  return resetStores
}
