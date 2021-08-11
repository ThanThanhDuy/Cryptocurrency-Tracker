import Vue from 'vue'
import Vuex from 'vuex'
import axiosCoinFirst from '../Api/CoinFirstApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flagRenderTable: false,
    coinTmp: []
  },
  mutations: {
    SET_COIN(state, dataCoin) {
      state.coinTmp = dataCoin
    }
  },
  actions: {
    async getCoin({ commit }) {
      try {
        const res1 = await axiosCoinFirst.getCoinApi()
        const res2 = await axiosCoinFirst.getCoinDetail()
        if (res1 && res2) {
          const desert = []
          for (const item of res1.data) {
            const dataTmpChartSparkLines = () => {
              const len = 10
              return Array.from(
                {
                  length: len
                },
                () => Math.floor(Math.random() * len)
              )
            }
            const dataChartTmp = () => {
              const len = 15
              return Array.from(
                {
                  length: len
                },
                () =>
                  (
                    Math.random() *
                      (item.quote.USD.price - item.quote.USD.price / 20) +
                    item.quote.USD.price / 8
                  ).toFixed(2)
              )
            }
            console.log(dataChartTmp())
            desert.push({
              id: item.id,
              rank: item.cmc_rank,
              name: item.name,
              symbol: item.symbol,
              price: item.quote.USD.price.toFixed(2),
              marketCap: item.quote.USD.market_cap.toFixed(2),
              volume24h: item.quote.USD.volume_24h.toFixed(2),
              maxSupply: item.max_supply
                ? item.max_supply.toFixed(0)
                : item.max_supply,
              supllying: item.circulating_supply
                ? item.circulating_supply.toFixed(0)
                : item.circulating_supply,
              icon: res2.data[item.id].logo,
              per24h: item.quote.USD.percent_change_24h,
              per7d: item.quote.USD.percent_change_7d,
              slug: item.slug,
              category: res2.data[item.id].category,
              per1h: item.quote.USD.percent_change_1h,
              last7d: dataTmpChartSparkLines(),
              dataChart: dataChartTmp(),
              marketCapSupplying:
                item.quote.USD.price.toFixed(2) * item.circulating_supply
                  ? item.circulating_supply.toFixed(0)
                  : item.circulating_supply
            })
          }
          commit('SET_COIN', desert)
        }
      } catch (error) {
        console.log('🚀 ~ file: index.js ~ line 56 ~ getCoin ~ error', error)
      }
    }
  },
  modules: {}
})
