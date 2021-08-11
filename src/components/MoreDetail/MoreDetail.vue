<template>
  <v-col lg="4">
    <v-container>
      <v-row>
        <v-col lg="6" class="r1c1">
          <div class="d-flex flex-column">
            <span>Market Cap</span>
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(parseFloat(marketCap))
              }}
            </span>
            <div class="d-flex" v-if="per1.upDown && marketCap > 0">
              <span class="font-weight-bold green--text mx-0 px-0">
                <UilAngleUp />
              </span>
              <span class="pr-1 green--text">{{ per1.per }}%</span>
            </div>
            <div class="d-flex" v-if="!per1.upDown && marketCap > 0">
              <span class="font-weight-bold red--text mx-0 px-0">
                <UilAngleDown />
              </span>
              <span class="pr-1 red--text">{{ per1.per }}%</span>
            </div>
          </div>
        </v-col>
        <v-col lg="6" class="r1c2">
          <div class="d-flex flex-column">
            <span>Fully Diluted Market Cap</span>
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(maxSupply * parseFloat(price))
              }}
            </span>
            <div
              class="d-flex"
              v-if="per2.upDown && maxSupply * parseFloat(price) > 0"
            >
              <span class="font-weight-bold green--text mx-0 px-0">
                <UilAngleUp />
              </span>
              <span class="pr-1 green--text">{{ per2.per }}%</span>
            </div>
            <div
              class="d-flex"
              v-if="!per2.upDown && maxSupply * parseFloat(price) > 0"
            >
              <span class="font-weight-bold red--text mx-0 px-0">
                <UilAngleDown />
              </span>
              <span class="pr-1 red--text">{{ per2.per }}%</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" class="r2c1">
          <div class="d-flex flex-column">
            <span>Volume 24h</span>
            <span class="font-weight-bold">
              {{
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(volume24h)
              }}
            </span>
            <div class="d-flex" v-if="per3.upDown && volume24h > 0">
              <span class="font-weight-bold green--text mx-0 px-0">
                <UilAngleUp />
              </span>
              <span class="pr-1 green--text">{{ per3.per }}%</span>
            </div>
            <div class="d-flex" v-if="!per3.upDown && volume24h > 0">
              <span class="font-weight-bold red--text mx-0 px-0">
                <UilAngleDown />
              </span>
              <span class="pr-1 red--text">{{ per3.per }}%</span>
            </div>
          </div>
        </v-col>
        <v-col lg="6" class="r2c2">
          <div class="d-flex flex-column">
            <span>Circulating Supply</span>
            <div class="font-weight-bold d-flex justify-space-between">
              <span>
                {{ supllying }}
                <span class="font-weight-normal grey--text">
                  {{ symbol }}
                </span>
              </span>
              <span v-if="maxSupply > 0">
                {{ ((supllying / maxSupply) * 100).toFixed(0) }}%
              </span>
            </div>
            <div v-if="maxSupply > 0">
              <v-progress-linear
                class="view__progress ml-3 mr-3 rounded-lg"
                color="grey"
                :value="(supllying / maxSupply) * 100"
              ></v-progress-linear>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { UilAngleUp } from '@iconscout/vue-unicons'
import { UilAngleDown } from '@iconscout/vue-unicons'
export default {
  name: 'MoreDetail',
  props: {
    marketCap: {
      type: String
    },
    maxSupply: {
      type: String
    },
    price: {
      type: String
    },
    volume24h: {
      type: String
    },
    supllying: {
      type: String
    },
    symbol: {
      type: String
    }
  },
  computed: {
    per1() {
      return { per: Math.random().toFixed(2), upDown: Math.random() < 0.5 }
    },
    per2() {
      return { per: Math.random().toFixed(2), upDown: Math.random() < 0.5 }
    },
    per3() {
      return { per: Math.random().toFixed(2), upDown: Math.random() < 0.5 }
    },
    per4() {
      return { per: Math.random().toFixed(2), upDown: Math.random() < 0.5 }
    }
  },
  components: {
    UilAngleUp,
    UilAngleDown
  }
}
</script>

<style></style>
