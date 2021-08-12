<template>
  <v-container class="view__page">
    <div v-if="coinDetail">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <router-link
            :to="item.href"
            :disabled="item.disabled"
            :class="item.class"
          >
            {{ item.text }}
          </router-link>
        </template>
      </v-breadcrumbs>
      <v-row class="mt-3">
        <NameSymbol
          :icon="coinDetail.icon"
          :name="coinDetail.name"
          :symbol="coinDetail.symbol"
          :rank="coinDetail.rank"
          :category="coinDetail.category"
          :tagName="coinDetail.tagName"
        />
        <PricePer
          :name="coinDetail.name"
          :price="coinDetail.price"
          :symbol="coinDetail.symbol"
          :per1h="coinDetail.per1h"
        />
        <MoreDetail
          :marketCap="coinDetail.marketCap"
          :maxSupply="coinDetail.maxSupply"
          :price="coinDetail.price"
          :volume24h="coinDetail.volume24h"
          :supllying="coinDetail.supllying"
          :symbol="coinDetail.symbol"
        />
      </v-row>
      <v-row class="mt-12">
        <v-col lg="8" class="mt-12">
          <ChartCoin :lables="lables" :dataChart="coinDetail.dataChart" />
        </v-col>
        <v-col lg="4" class="mt-8">
          <v-container>
            <div>
              <p class="font-weight-bold">Description:</p>
              <p>{{ coinDetail.des }}</p>
            </div>
            <div>
              <p class="font-weight-bold">Website:</p>
              <p v-for="(url, index) in coinDetail.website">
                <a
                  :key="index"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ url }}
                </a>
              </p>
            </div>
            <div>
              <span class="font-weight-bold">
                Date Added:
              </span>
              <span class="ml-3 font-weight-normal">{{ getDate }}</span>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </div>
    <v-container v-if="!coinDetail">
      <h3>NOT FOUND</h3>
    </v-container>
  </v-container>
</template>

<script>
import NameSymbol from '../components/NameSymbol/NameSymbol.vue'
import PricePer from '../components/PricePer/PricePer.vue'
import MoreDetail from '../components/MoreDetail/MoreDetail.vue'
import { mapState } from 'vuex'
import ChartCoin from '../components/ChartCoin/ChartCoin.vue'
import moment from 'moment'
export default {
  name: 'ViewPage',
  data() {
    return {
      id: this.$route.params.id,
      items: [
        {
          text: 'Coin',
          disabled: false,
          href: '/',
          class: 'v-breadcrumbs__item'
        },
        {
          text: this.$route.params.name,
          disabled: true,
          href: '/',
          class: 'v-breadcrumbs__item--disabled'
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id
    }
  },
  components: {
    NameSymbol,
    PricePer,
    MoreDetail,
    ChartCoin
  },
  computed: {
    ...mapState(['coinTmp']),
    coinDetail() {
      return this.coinTmp.find(coin => coin.id == this.id)
    },
    lables() {
      const date = []
      for (let i = 0; i < 15; i++) {
        let today = new Date()
        let yesterday = new Date()
        yesterday.setDate(today.getDate() - i)
        date.push(moment(yesterday).format('MMM DD'))
      }
      return date.reverse()
    },
    getDate() {
      return moment(
        this.coinTmp.find(coin => coin.id == this.id).dateAdded
      ).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss">
.view__page {
  @media screen and (max-width: 1904px) {
    max-width: 1800px;
  }
  @media screen and (max-width: 1830px) {
    max-width: 1600px;
  }
  @media screen and (max-width: 1660px) {
    max-width: 1400px;
  }
  @media screen and (max-width: 1460px) {
    max-width: 1300px;
  }
  @media screen and (max-width: 1240px) {
    max-width: 1000px;
  }
  @media screen and (max-width: 910px) {
    max-width: 800px;
  }
  @media screen and (max-width: 732px) {
    max-width: 600px;
  }
  .v-breadcrumbs {
    .v-breadcrumbs__item {
      color: #000;
      font-size: 17px;
      text-decoration: none;
    }
    .v-breadcrumbs__item--disabled {
      color: rgb(122, 122, 122);
      font-size: 15px;
      text-decoration: none !important;
    }
  }
  .coin__title {
    font-size: 30px;
  }
  .btn_symbol {
    min-width: 45px !important;
    padding: 0 !important;
    max-height: 25px !important;
    pointer-events: none;
  }
  .btn_other {
    padding: 5px !important;
    max-height: 25px !important;

    pointer-events: none;
    font-size: 12px;
  }
  .btn-tag {
    padding: 5px !important;
    max-height: 25px !important;
    font-size: 12px;
    text-transform: none !important;
  }
  .view__price {
    font-size: 45px;
  }
  .view__btn--per1 {
    padding: 5px !important;
    margin-left: 20px;
    pointer-events: none;
  }
  .view__progress {
    width: 200px;
    height: 10px !important;
  }
}
</style>
