import { FAKE_COIN } from './Fakedata'
import { FAKE_COIN_DETAIL } from './FakeCoinDetail'
const getCoinApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(FAKE_COIN)
    }, 2000)
  })
}
const getCoinDetail = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(FAKE_COIN_DETAIL)
    }, 1000)
  })
}
export default {
  getCoinApi,
  getCoinDetail
}
