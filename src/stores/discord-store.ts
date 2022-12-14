import { defineStore } from 'pinia'
import {
  RESTGetAPICurrentUserResult,
  RESTGetAPICurrentUserGuildsResult,
  RESTGetAPIGuildMembersResult,
} from 'discord-api-types/v10'

interface DiscordData {
  user?: RESTGetAPICurrentUserResult
  userServers?: RESTGetAPICurrentUserGuildsResult

  serverMembersMap: Record<string, RESTGetAPIGuildMembersResult>
}

/**
 * Store for everything related to Discord.
 */
export const useDiscordStore = defineStore('discord', {
  state: (): DiscordData => ({
    user: undefined,
    userServers: undefined,

    serverMembersMap: {},
  }),

  actions: {
    setUser(user: RESTGetAPICurrentUserResult) {
      this.user = user
    },

    setUserServers(servers: RESTGetAPICurrentUserGuildsResult) {
      this.userServers = servers
    },

    addToServerMembersMap(
      serverId: string,
      members: RESTGetAPIGuildMembersResult
    ) {
      this.serverMembersMap[serverId] = members
    },
  },
})
