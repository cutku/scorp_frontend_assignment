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
                  src="../assets/en-flag-icon.png"
                  spinner-color="white"
                  style="height: 1.875rem; max-width: 1.875rem"
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
      <q-scroll-area
        style="
          height: calc(100% - 9.375rem);
          margin-top: 9.375rem;
          border-right: 0.063rem solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            :active="tab == 'home-homepage'"
            clickable
            v-ripple
            @click="tabAction('home-homepage', '/')"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> {{ pageLanguage.homepage }} </q-item-section>
          </q-item>

          <q-item
            v-if="userData.username == ''"
            clickable
            v-ripple
            @click="loginModal = !loginModal"
          >
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section> {{ pageLanguage.login }} </q-item-section>
          </q-item>
          <q-item
            v-if="userData.username != ''"
            clickable
            v-ripple
            @click="this.resetUser()"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> {{ pageLanguage.logout }} </q-item-section>
          </q-item>
          <q-item
            clickable
            :active="tab == 'mail-contactUs'"
            v-ripple
            @click="tabAction('mail-contactUs', '/contactus')"
          >
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section> {{ pageLanguage.contactUs }} </q-item-section>
          </q-item>
          <q-btn-dropdown auto-close flat style="min-width: 9.375rem">
            <template v-slot:label>
              <q-item-section avatar>
                <q-icon name="language" />
              </q-item-section>
              <q-item-section>
                {{ this.pageLanguage.languagesUpper }}
              </q-item-section>
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
                  style="height: 1.875rem; max-width: 1.875rem"
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
                  style="height: 1.875rem; max-width: 1.875rem"
                />
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 9.375rem"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="3.5rem" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div v-if="userData.username != ''" class="text-weight-bold">
            {{ pageLanguage.username }}: {{ userData.username }}
          </div>
          <div v-if="userData.username != ''">
            {{ pageLanguage.email }} : {{ userData.email }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <div>
          Should exists on all pages. What is included in the footer does not
          matter.
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>

  <q-dialog v-model="loginModal" color="white" persistent>
    <div style="min-width: 21.25rem">
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
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              outlined
              v-model="email"
              :label="pageLanguage.email"
              hint=""
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
              :label="pageLanguage.password"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') || 'Please type your password'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <template v-slot:prepend>
              <q-icon name="language" @click.stop />
            </template>
            <div>
              <q-btn
                label="Login"
                type="login"
                color="primary"
                @click="this.onLogin"
              />
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
                src="../assets/en-flag-icon.png"
                spinner-color="white"
                style="height: 1.875rem; max-width: 1.875rem"
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
                style="height: 1.875rem; max-width: 1.875rem"
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
import { defineComponent, ref } from "vue";
import { mapActions, mapState } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {},
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      selectedLanguage: state => state.language.selectedLanguage,
      userData: state => state.user.user
    })
  },
  methods: {
    ...mapActions(["setPageLanguage", "setUser", "resetUser"]),
    onClose() {
      (this.username = ""),
        (this.email = ""),
        (this.password = ""),
        (this.loginModal = false);
    },
    tabAction(ref, path) {
      // code
      this.tab = ref;
      this.$router.push(path);
    },
    onLogin() {
      if (
        this.userData.username != "" ||
        this.userData.email != "" ||
        this.userData.password != ""
      ) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: this.pageLanguage.loggedAccountErrorMessage,
          icon: "report_problem"
        });
      } else if (
        this.username == "" ||
        this.email == "" ||
        this.password == ""
      ) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: this.pageLanguage.loginErrorMessage,
          icon: "report_problem"
        });
      } else {
        this.setUser({
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.loginModal = false;
        this.$q.notify({
          color: "positive",
          position: "top",
          message: this.pageLanguage.loginConfirmMessage,
          icon: "check"
        });
      }
    }
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
      tab: ref("home-homepage")
    };
  },
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      }
    };
  }
});
</script>
