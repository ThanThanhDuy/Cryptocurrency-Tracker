<template>
  <v-col lg="4" md="6">
    <v-container>
      <div class="d-flex align-center ">
        <img :src="icon" width="50" />
        <span class="ml-3 font-weight-bold black--text coin__title">
          {{ name }}
        </span>

        <v-btn
          color="rgba(122, 122, 122,0.2)"
          class="btn_symbol ml-3 elevation-0"
        >
          {{ symbol }}
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <v-btn color="#808a9d" class="btn_other white--text elevation-0">
        #Rank {{ rank }}
      </v-btn>
      <v-btn
        color="rgba(122, 122, 122,0.2)"
        class="ml-3 btn_other black--text elevation-0"
      >
        {{ category }}
      </v-btn>
    </v-container>
    <v-container>
      <div>
        <v-btn
          v-for="(tag, index) in tagName"
          :key="index"
          color="rgba(122, 122, 122,0.2)"
          class="black--text mr-2 btn-tag mb-2"
        >
          <span>
            {{ tag }}

            <UilExternalLinkAlt />
          </span>
        </v-btn>
      </div>
    </v-container>
  </v-col>
</template>

<script>
import { UilExternalLinkAlt } from '@iconscout/vue-unicons'

export default {
  name: 'NameSymbol',
  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    symbol: {
      type: String
    },
    rank: {
      type: Number
    },
    category: {
      type: String
    },
    tagName: {
      type: Array
    }
  },
  components: {
    UilExternalLinkAlt
  }
}
</script>

<style></style>
