<template>
  <v-container class="ma-0 pa-0 cointainer__box">
    <v-container class="mt-3 mb-3 search__container">
      <v-row>
        <v-col lg="2">
          <v-text-field label="Search" v-model="txtSearch" solo></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="divi__container">
      <v-divider></v-divider>
    </v-container>
    <v-container class="box__table">
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="coinTmp"
          :items-per-page="10"
          class="table"
          fixed-header
          height="725"
          :loading="coinTmp.length <= 0"
          loading-text="Loading... Please wait"
          @click:row="handleClick"
          :search="txtSearch"
        >
          <template v-slot:item.rank="{ item }">
            <span class="font-weight-bold">{{ item.rank }}</span>
          </template>

          <template v-slot:item.name="{ item }">
            <div class="d-flex align-center">
              <img :src="item.icon" width="20" />
              <span class="ml-3 font-weight-bold black--text">
                {{ item.name }}
              </span>
              <span class="ml-2">
                -
              </span>
              <span class="ml-2 grey--text text-lighten-3">
                {{ item.symbol }}
              </span>
            </div>
          </template>

          <template v-slot:item.price="{ item }">
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(item.price)
              }}
            </span>
          </template>

          <template v-slot:item.per24h="{ item }">
            <div v-if="item.per24h > 0" class="d-flex">
              <span class="font-weight-bold green--text"><UilAngleUp /></span>
              <span class="green--text">{{ item.per24h.toFixed(2) }}%</span>
            </div>
            <div v-if="item.per24h < 0" class="d-flex">
              <span class="font-weight-bold red--text"><UilAngleDown /></span>
              <span class="red--text">{{ item.per24h.toFixed(2) * -1 }}%</span>
            </div>
          </template>

          <template v-slot:item.per7d="{ item }">
            <div v-if="item.per7d > 0" class="d-flex">
              <span class="font-weight-bold green--text"><UilAngleUp /></span>
              <span class="green--text">{{ item.per7d.toFixed(2) }}%</span>
            </div>
            <div v-if="item.per7d < 0" class="d-flex">
              <span class="font-weight-bold red--text"><UilAngleDown /></span>
              <span class="red--text">{{ item.per7d.toFixed(2) * -1 }}%</span>
            </div>
          </template>

          <template v-slot:item.marketCap="{ item }">
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(item.marketCap)
              }}
            </span>
          </template>

          <template v-slot:item.volume24h="{ item }">
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(item.volume24h)
              }}
            </span>
          </template>

          <template v-slot:item.supllying="{ item }">
            <div class="d-flex flex-column justify-center">
              <span class="font-weight-bold suplly">
                {{ new Intl.NumberFormat('en-US').format(item.supllying) }}
                <span class="ml-1 grey--text text-lighten-3">
                  {{ item.symbol }}
                </span>
              </span>

              <v-progress-linear
                class="mt-1 progress rounded-lg"
                :value="(item.supllying / item.maxSupply) * 100"
                color="#b4dd7f"
                height="10"
                v-if="item.maxSupply > 0"
              ></v-progress-linear>
            </div>
          </template>

          <template v-slot:item.last7d="{ item }">
            <v-sparkline
              :value="item.last7d"
              :smooth="radius || false"
              :line-width="width"
              :stroke-linecap="lineCap"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            ></v-sparkline>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { UilAngleUp } from '@iconscout/vue-unicons'
import { UilAngleDown } from '@iconscout/vue-unicons'
export default {
  name: 'Table',
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'start',
          filterable: false,
          value: 'rank'
        },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: '24h %', value: 'per24h' },
        { text: '7d %', value: 'per7d' },
        { text: 'Market Cap', value: 'marketCap' },
        { text: 'Volume(24h)', value: 'volume24h' },
        { text: 'Circulating Supply', value: 'supllying' },
        { text: 'Last 7 days', value: 'last7d' }
      ],
      txtSearch: '',
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      fill: false,
      type: 'trend',
      autoLineWidth: false
    }
  },
  computed: {
    ...mapState(['coinTmp'])
  },
  components: {
    UilAngleUp,
    UilAngleDown
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        name: 'View',
        params: { name: item.name, id: item.id }
      })
    }
  }
}
</script>

<style lang="scss">
.cointainer__box {
  max-width: calc(100vw);
  .box__table,
  .search__container,
  .divi__container {
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
      max-width: 1200px;
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
  }
}
.v-data-table {
  line-height: 4.5 !important;
  overflow-y: auto;
  .v-data-table__wrapper table .v-data-table-header tr th span {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
  }
  .v-data-table__wrapper table .v-data-table-header tr th {
    &:first-child {
      min-width: 70px;
    }
    &:nth-child(2) {
      min-width: 270px;
    }
    &:nth-child(3) {
      min-width: 130px;
    }
    &:nth-child(4) {
      min-width: 100px;
      @media screen and (max-width: 732px) {
        display: none;
      }
      // @media screen and (max-width: 599px) {
      //   display: block;
      // }
    }
    &:nth-child(5) {
      min-width: 100px;
      @media screen and (max-width: 732px) {
        display: none;
      }
    }
    &:nth-child(6) {
      min-width: 180px;
      @media screen and (max-width: 910px) {
        display: none;
      }
    }
    &:nth-child(7) {
      min-width: 180px;
      @media screen and (max-width: 1460px) {
        display: none;
      }
    }
    &:nth-child(8) {
      min-width: 200px;
      @media screen and (max-width: 1240px) {
        display: none;
      }
    }
    &:last-child {
      min-width: 210px;
      @media screen and (max-width: 1660px) {
        display: none;
      }
      @media screen and (max-width: 599px) {
        display: none;
      }
    }
  }
  .v-data-table__wrapper table tbody tr {
    cursor: pointer;
    td {
      &:nth-child(4) {
        @media screen and (max-width: 732px) {
          display: none;
        }
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }
      &:nth-child(5) {
        @media screen and (max-width: 732px) {
          display: none;
        }
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }
      &:nth-child(6) {
        @media screen and (max-width: 910px) {
          display: none;
        }
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }
      &:nth-child(8) {
        @media screen and (max-width: 1240px) {
          display: none;
        }
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }
      &:nth-child(7) {
        @media screen and (max-width: 1460px) {
          display: none;
        }
        @media screen and (max-width: 599px) {
          display: flex;
        }
      }
      &:last-child {
        @media screen and (max-width: 599px) {
          display: none;
        }
      }
      span {
        font-size: 0.9rem;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
    }
  }
  .suplly {
    max-height: 30px;
  }
  .progress {
    max-width: 200px;
  }
  .v-data-footer__select {
    margin-left: 0 !important;
  }
}
.v-data-footer {
  @media screen and (max-width: 440px) {
    justify-content: center;
  }
  .v-data-footer__select {
    @media screen and (max-width: 440px) {
      display: none !important;
    }
  }
}

.v-text-field__details {
  display: none !important;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
</style>
