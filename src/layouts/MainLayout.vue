<template>
  <q-layout view="lHh Lpr lFf">
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
            @click="loginModal = !loginModal"
            name="person-login"
            :label="pageLanguage.loginUpper"
            icon="person"
          />
          <q-route-tab
            to="/contactus"
            name="mail-contactUs"
            :label="pageLanguage.contactUsUpper"
            icon="mail"
          />
          <q-btn-dropdown auto-close stretch flat style="min-width: 150px">
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
                  src="../assets/en-flag-icon.png"
                  spinner-color="white"
                  style="height: 30px; max-width: 30px"
                />
              </q-item>

              <q-item
                clickable
                @click="this.setPageLanguage('tr')"
                :active="this.selectedLanguage == 'tr'"
                active-class="language-link"
              >
                <q-item-section>{{ this.pageLanguage.turkish }}</q-item-section>
                <q-img
                  src="../assets/tr-flag-icon.png"
                  spinner-color="white"
                  style="height: 30px; max-width: 30px"
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
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-if="this.$q.platform.is.mobile"
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
      side="right"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            Should exists on all pages. What is included in the footer does not matter.
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>

  <q-dialog v-model="loginModal" color="white" persistent>
    <div style="min-width: 340px">
      <q-card class="login-card" flat bordered>
        <q-card-section class="text-center">
          <q-form class="q-gutter-md q-pa-md">
            <h5 class="q-ma-xl">
              <q-icon size="md" name="person" /> {{ this.pageLanguage.login }}
            </h5>
            <q-input
              outlined
              v-model="username"
              :label="this.pageLanguage.username"
              hint=""
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <q-input
              outlined
              v-model="email"
              :label="pageLanguage.email"
              hint=""
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <q-input
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              :label="pageLanguage.password"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type your password',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <template v-slot:prepend>
              <q-icon name="language" @click.stop />
            </template>
            <div>
              <q-btn label="Login" type="login" color="primary" @click="this.onLogin" />
              <q-btn
                label="Close"
                @click="this.onClose"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-btn-dropdown auto-close stretch flat style="min-width: 150px">
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
                src="../assets/en-flag-icon.png"
                spinner-color="white"
                style="height: 30px; max-width: 30px"
              />
            </q-item>

            <q-item
              clickable
              @click="this.setPageLanguage('tr')"
              :active="this.selectedLanguage == 'tr'"
              active-class="language-link"
            >
              <q-item-section>{{ this.pageLanguage.turkish }}</q-item-section>
              <q-img
                src="../assets/tr-flag-icon.png"
                spinner-color="white"
                style="height: 30px; max-width: 30px"
              />
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card>
    </div>
  </q-dialog>
</template>

<style lang="sass">
.language-link
  color: white
  background: #1976D2
</style>
<script>
const linksList = [
  {
    title: "Homepage",
    // caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import EssentialLink from "components/EssentialLink.vue";
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, useStore, mapState } from "vuex";
import { useQuasar, Notify } from "quasar";
export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  computed: {
    // ...mapGetters(["getEnLanguagePack", "trLanguagePack"]),
    ...mapState({
      pageLanguage: (state) => state.language.pageLanguage,
      selectedLanguage: (state) => state.language.selectedLanguage,
    }),
  },
  methods: {
    ...mapActions(["setPageLanguage", "setUser"]),
    onClose() {
      (this.username = ""),
        (this.email = ""),
        (this.password = ""),
        (this.loginModal = false);
    },
    onLogin() {
      if (this.username == "" && this.email == "" && this.password == "") {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: this.pageLanguage.loginErrorMessage,
          icon: "report_problem",
        });
      } else {
        this.setUser( {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.loginModal = false;
      }
    },
  },
  mounted() {
    if (this.$q.lang.getLocale().includes("en")) {
      this.setPageLanguage("en");
    } else if (this.$q.lang.getLocale().includes("tr")) {
      this.setPageLanguage("tr");
    }
  },
  data() {
    return {
      quas: useQuasar(),
      loginModal: false,
      username: "",
      email: "",
      password: "",
      locale: "",
      isPwd: true,
      // pageLanguage: this.$store.state.language.enLanguagePack,
      // loginModal: this.$q.localStorage.getItem('loginModal')
    };
  },
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      tab: ref("home-homepage"),
      essentialLinks: linksList,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
