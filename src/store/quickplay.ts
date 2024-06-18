import { create } from "zustand";
import { persist } from "zustand/middleware";

import idbStorage from "@utils/idbstorage";

const useStore = create(
  persist(
    (set) => ({
      customizing: 0,
      toggleCustomizing: () =>
        set((state) => ({ customizing: !state.customizing })),
      found: 0,
      setFound: (found) => set(() => ({ found })),
      lastServer: null,
      setLastServer: (lastServer) => set(() => ({ lastServer })),
      searching: 0,
      setSearching: (searching) => set(() => ({ searching })),
      recentServers: {},
      setRecentServer: (k, v) =>
        set((state) => ({ recentServers: { ...state.recentServers, [k]: v } })),
      removeRecentServer: (k) =>
        set((state) => {
          delete state.recentServers[k];
          return { recentServers: state.recentServers };
        }),
      maxPlayerCap: [24, 32],
      setMaxPlayerCap: (cap) => set(() => ({ maxPlayerCap: cap })),
      gamemode: "any",
      setGamemode: (gamemode) => set(() => ({ gamemode })),
      respawntimes: 0,
      setRespawnTimes: (respawntimes) => set(() => ({ respawntimes })),
      crits: -1,
      setCrits: (crits) => set(() => ({ crits })),
      beta: -1,
      setBeta: (beta) => set(() => ({ beta })),
      rtd: 0,
      setRtd: (rtd) => set(() => ({ rtd })),
      blocklist: new Set([]),
      addBlocklist: (steamid) =>
        set((state) => {
          state.blocklist.add(steamid);
          return { blocklist: state.blocklist };
        }),
      clearBlocklist: () => set(() => ({ blocklist: new Set([]) })),
      favorites: new Set([]),
      addFavorite: (steamid) =>
        set((state) => {
          state.favorites.add(steamid);
          return { favorites: state.favorites };
        }),
      pinglimit: 50,
      setPingLimit: (pinglimit) => set(() => ({ pinglimit })),
    }),
    idbStorage(
      "quickplay",
      3,
      (persistedState, version) => {
        if (version < 2) {
          persistedState.pinglimit = 50;
        }
        if (version < 3) {
          persistedState.recentServers = {};
        }
        return persistedState;
      },
      [
        "recentServers",
        "maxPlayerCap",
        "gamemode",
        "respawntimes",
        "crits",
        "beta",
        "blocklist",
      ],
    ),
  ),
);

export default useStore;
