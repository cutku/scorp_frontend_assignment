<template>
  <q-page-sticky position="top-right" :offset="[18, 18]">
    <q-btn @click="toggleDrawer" round color="primary" icon="menu" />
  </q-page-sticky>
  <q-drawer
    v-model="rightDrawerAction"
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
          @click="setLoginModal()"
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
          @click="resetUser()"
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
              {{ pageLanguage.languagesUpper }}
            </q-item-section>
          </template>
          <q-list>
            <q-item
              clickable
              @click="setPageLanguage('en')"
              :active="selectedLanguage == 'en'"
              active-class="language-link"
            >
              <q-item-section>{{ pageLanguage.english }}</q-item-section>
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
              <q-item-section>{{ pageLanguage.turkish }}</q-item-section>
              <q-img
                src="../../assets/tr-flag-icon.png"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "MobidleNavigation",
  watch: {
    rightDrawer: function() {
      this.rightDrawerAction = this.rightDrawer;
    },
    rightDrawerAction: function() {
      this.setRightDrawer(this.rightDrawerAction);
    }
  },
  methods: {
    ...mapActions([
      "setPageLanguage",
      "setUser",
      "resetUser",
      "setLoginModal",
      "setRightDrawer",
      "setTab"
    ]),
    tabAction(ref, path) {
      this.setTab(ref);
      this.$router.push(path);
    },
    toggleDrawer() {
      this.rightDrawerAction = !this.rightDrawerAction;
    }
  },
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      selectedLanguage: state => state.language.selectedLanguage,
      userData: state => state.user.user,
      rightDrawer: state => state.components.rightDrawer,
      tab: state => state.components.tab
    })
  },
  data() {
    return {
      rightDrawerAction: false
    };
  }
});
</script>

<style lang="sass">
.language-link
  color: white
  background: #1976D2
</style>
