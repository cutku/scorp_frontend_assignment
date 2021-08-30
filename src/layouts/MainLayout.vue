<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderNavigation />
    <DrawerNavigation />
    <Footer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <LoginModal :LoginModal="loginModal" />
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
import HeaderNavigation from "../components/navigation/HeaderNavigation.vue";
import DrawerNavigation from "../components/navigation/DrawerNavigation.vue";
import Footer from "../components/navigation/Footer.vue";
import LoginModal from "../components/modals/LoginModal.vue";

export default defineComponent({
  name: "MainLayout",
  components: { HeaderNavigation, DrawerNavigation, LoginModal, Footer },
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
      quas: useQuasar(),
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
