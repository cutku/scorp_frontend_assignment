<template>
  <q-drawer
    v-model="rightDrawerAction"
    show-if-above
    bordered
    :width="180"
    class="bg-grey-3"
    side="right"
    :mini="miniState"
    @mouseover="
      miniState = false;
      mouseOut = false;
    "
    @mouseout="mouseOut = true"
    mini-to-overlay
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
        @click="userDropdown = !userDropdown"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section> {{ userData.username }} </q-item-section>
        <q-btn-dropdown
          v-model="userDropdown"
          auto-close
          stretch
          flat
          style="min-width: 9.375rem"
        >
          <q-list>
            <q-item>
              <q-item-section
                >{{ pageLanguage.email }} : {{ userData.email }}
              </q-item-section>
              <q-icon name="mail" size="md" />
            </q-item>
            <q-item clickable @click="resetUser()" active active-class>
              <q-item-section>{{ pageLanguage.logout }} </q-item-section>
              <q-icon name="logout" size="md" />
            </q-item>
          </q-list>
        </q-btn-dropdown>
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

      <q-item clickable v-ripple @click="languageDropdown = !languageDropdown">
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>

        <q-item-section>
          {{ pageLanguage.languages }}
        </q-item-section>
        <q-btn-dropdown
          v-model="languageDropdown"
          auto-close
          flat
          style="min-width: 9.375rem;"
          ref="dropdown"
        >
          <template v-slot:label> </template>
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
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "DrawerNavigation",
  watch: {
    rightDrawer: function() {
      this.rightDrawerAction = this.rightDrawer;
    },
    rightDrawerAction: function() {
      this.setRightDrawer(this.rightDrawerAction);
    },
    mouseOut: function() {
      if (
        this.mouseOut == true &&
        this.languageDropdown == false &&
        this.userDropdown == false
      ) {
        this.miniState = true;
      }
    },
    languageDropdown: function() {
      if (this.mouseOut == true && this.languageDropdown == false) {
        this.miniState = true;
      }
    },
    userDropdown: function() {
      if (this.mouseOut == true && this.userDropdown == false) {
        this.miniState = true;
      }
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
      miniState: false,
      rightDrawerAction: false,
      languageDropdown: false,
      userDropdown: false,
      mouseOut: true
    };
  }
});
</script>

<style lang="sass">
.language-link
  color: white
  background: #1976D2
</style>
