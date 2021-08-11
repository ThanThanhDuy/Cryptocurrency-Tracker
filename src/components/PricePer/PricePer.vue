<template>
  <v-col lg="4">
    <v-container>
      <p class="mb-0">
        {{ name }} Price (
        <span class="font-weight-bold ">{{ symbol }}</span>
        )
      </p>
      <div class="d-flex align-center mt-0">
        <span class="font-weight-bold view__price">
          {{
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(price)
          }}
        </span>
        <v-btn
          v-if="per1h > 0"
          color="green"
          class="white--text font-weight-bold view__btn--per1 elevation-0"
        >
          <span class="font-weight-bold white--text mx-0 px-0">
            <UilAngleUp />
          </span>
          <span class="pr-1">{{ per1h.toFixed(2) }}%</span>
        </v-btn>
        <v-btn
          v-if="per1h < 0"
          color="red"
          class="white--text font-weight-bold view__btn--per1 elevation-0"
        >
          <span class="font-weight-bold white--text mx-0 px-0">
            <UilAngleDown />
          </span>
          <span class="pr-1">{{ per1h.toFixed(2) * -1 }}%</span>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <div>
          <span>Low:</span>
          <span class="font-weight-bold">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(price - price / 29)
            }}
          </span>
        </div>
        <div>
          <v-progress-linear
            class="view__progress ml-3 mr-3 rounded-lg"
            color="grey"
            :value="Math.floor(Math.random() * 80) + 30"
          ></v-progress-linear>
        </div>
        <div>
          <span>High:</span>
          <span class="font-weight-bold">
            {{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(parseFloat(price) + parseFloat(price / 30))
            }}
          </span>
        </div>
      </div>
    </v-container>
  </v-col>
</template>

<script>
import { UilAngleUp } from '@iconscout/vue-unicons'
import { UilAngleDown } from '@iconscout/vue-unicons'
export default {
  name: 'PricePer',
  props: {
    name: {
      type: String
    },
    price: {
      type: String
    },
    per1h: {
      type: Number
    },
    symbol: {
      type: String
    }
  },
  components: {
    UilAngleUp,
    UilAngleDown
  }
}
</script>

<style></style>
