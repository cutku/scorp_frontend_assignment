<template>
  <q-layout view="lHr LpR fFf">
    <MobileNavigation v-if="$q.platform.is.mobile" />
    <LeftBarNavigation />
    <RightBarNavigation v-if="$q.platform.is.desktop" />
    <Footer />
    <q-page-container
      v-bind:style="
        $q.platform.is.desktop ? 'marginBottom: 1rem;' : 'marginBottom: 2rem;'
      "
    >
      <router-view />
    </q-page-container>
  </q-layout>
  <LoginModal :LoginModal="loginModal" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions, mapState } from "vuex";
import { useQuasar } from "quasar";
import HeaderNavigation from "../components/navigation/HeaderNavigation.vue";
import MobileNavigation from "../components/navigation/MobileNavigation.vue";
import Footer from "../components/navigation/Footer.vue";
import LoginModal from "../components/modals/LoginModal.vue";
import LeftBarNavigation from "../components/navigation/LeftBarNavigation.vue";
import RightBarNavigation from "../components/navigation/RightBarNavigation.vue";
export default defineComponent({
  name: "MainLayout",
  components: {
    MobileNavigation,
    LoginModal,
    Footer,
    LeftBarNavigation,
    RightBarNavigation
  },
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      selectedLanguage: state => state.language.selectedLanguage,
      userData: state => state.user.user
    })
  },
  methods: {
    ...mapActions(["setPageLanguage", "setUser", "resetUser", "setRightDrawer"])
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
      quasar: useQuasar(),
      loginModal: false,
      username: "",
      email: "",
      password: "",
      locale: "",
      isPwd: true,
      tab: ref("home-homepage")
    };
  }
});
</script>
