<template>
  <v-app>
    <v-app-bar app class="px-lg-15 px-md-10 px-sm-5">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="coinIcon"
          transition="scale-transition"
          width="40"
        />
        <h1 class="header__title">Cryptocurrency</h1>
      </div>

      <v-spacer />
      <router-link to="/">
        <span class="font-weight-bold">Home</span>
      </router-link>
      <v-btn color="#b4dd7f" class="btn_signin">Sign in</v-btn>
      <v-btn color="#fcd770" class="btn_menu px-0">
        <UilBars class="icon__menu" />
      </v-btn>
    </v-app-bar>

    <v-main class="py-0 mt-16">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import coin from './assets/cryptocurrency.svg'
import { UilBars } from '@iconscout/vue-unicons'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    coinIcon() {
      return coin
    }
  },
  components: {
    UilBars
  },
  methods: {
    ...mapActions(['getCoin'])
  },
  created() {
    this.getCoin()
  }
}
</script>
<style lang="scss" scoped>
.header__title {
  @media screen and (max-width: 525px) {
    display: none;
  }
}
.btn_signup {
  @media screen and (max-width: 525px) {
    display: none;
  }
}
.btn_signin {
  @media screen and (max-width: 425px) {
    display: none;
  }
}
.btn_menu {
  display: none;

  .icon__menu {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 425px) {
    display: flex;
  }
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 45px;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: -1px -8px 20px -1px rgba(0, 0, 0, 0.2),
    1px -19px 20px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>
