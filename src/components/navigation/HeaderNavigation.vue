<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        <q-icon size="md" :name="tab.split('-')[0]" />
        {{ pageLanguage[tab.split("-")[1]] }}
      </q-toolbar-title>
      <q-tabs v-if="this.$q.platform.is.desktop" v-model="tab">
        <q-route-tab
          to="/"
          name="home-homepage"
          :label="pageLanguage.homepageUpper"
          icon="home"
          @click="tab = 'home-homepage'"
        />
        <q-tab
          @click="setLoginModal()"
          name="login-login"
          :label="pageLanguage.loginUpper"
          icon="login"
        />
        <q-route-tab
          to="/contactus"
          name="mail-contactUs"
          :label="pageLanguage.contactUsUpper"
          icon="mail"
        />
        <q-btn-dropdown
          v-if="userData.username != ''"
          auto-close
          stretch
          flat
          style="min-width: 9.375rem"
        >
          <template v-slot:label>
            <div>
              <div class="row justify-around items-center no-wrap">
                <q-icon name="person" />
              </div>
              <div class="row items-center no-wrap">
                {{ this.userData.username }}
              </div>
            </div>
          </template>
          <q-list>
            <q-item>
              <q-item-section
                >{{ pageLanguage.email }} : {{ userData.email }}
              </q-item-section>
              <q-icon name="mail" size="md" />
            </q-item>
            <q-item clickable @click="this.resetUser()" active active-class>
              <q-item-section>{{ pageLanguage.logout }} </q-item-section>
              <q-icon name="logout" size="md" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown auto-close stretch flat style="min-width: 9.375rem">
          <template v-slot:label>
            <div>
              <div class="row justify-around items-center no-wrap">
                <q-icon name="language" />
              </div>
              <div class="row items-center no-wrap">
                {{ this.pageLanguage.languagesUpper }}
              </div>
            </div>
          </template>
          <!-- :active="this.$q.lang.getLocale().includes('en')" -->
          <q-list>
            <q-item
              clickable
              @click="this.setPageLanguage('en')"
              :active="this.selectedLanguage == 'en'"
              active-class="language-link"
            >
              <q-item-section>{{ this.pageLanguage.english }}</q-item-section>
              <q-img
                src="../../assets/en-flag-icon.png"
                spinner-color="white"
                style="height: 1.875rem; max-width: 1.875rem"
              />
            </q-item>

            <q-item
              clickable
              @click="setPageLanguage('tr')"
              :active="selectedLanguage == 'tr'"
              active-class="language-link"
            >
              <q-item-section>{{ this.pageLanguage.turkish }}</q-item-section>
              <q-img
                src="../../assets/tr-flag-icon.png"
                spinner-color="white"
                style="height: 1.875rem; max-width: 1.875rem"
              />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
      <q-btn
        v-if="this.$q.platform.is.mobile"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="setRightDrawer(!rightDrawer)"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  props: {},
  methods: {
    ...mapActions([
      "setPageLanguage",
      "setUser",
      "resetUser",
      "setLoginModal",
      "setRightDrawer"
    ])
  },
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      selectedLanguage: state => state.language.selectedLanguage,
      userData: state => state.user.user,
      rightDrawer: state => state.components.rightDrawer
    })
  },
  watch: {},
  data() {
    return {
      tab: ref("home-homepage")
    };
  }
});
</script>
