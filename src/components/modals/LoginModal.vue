<template>
  <q-dialog v-model="loginModal" color="white" persistent>
    <div style="min-width: 21.25rem">
      <q-card class="login-card" flat bordered>
        <q-card-section class="text-center">
          <q-form @submit.prevent class="q-gutter-md q-pa-md">
            <h5 class="q-ma-xl">
              <q-icon size="md" name="person" /> {{ pageLanguage.login }}
            </h5>
            <q-input
              outlined
              v-model="username"
              :label="pageLanguage.username"
              hint=""
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || pageLanguage.errorTypeSomething
              ]"
            />
            <q-input
              outlined
              v-model="email"
              :label="pageLanguage.email"
              hint=""
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || pageLanguage.errorTypeSomething
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
                  (val !== null && val !== '') ||
                  pageLanguage.errorTypeSomething
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
                @click="onLogin"
              />
              <q-btn
                label="Close"
                @click="onClose"
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
                {{ pageLanguage.languagesUpper }}
              </div>
            </div>
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
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "LoginModal",
  methods: {
    ...mapActions(["setPageLanguage", "setUser", "setLoginModal"]),
    onClose() {
      (this.username = ""),
        (this.email = ""),
        (this.password = ""),
        this.setLoginModal();
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
        this.setLoginModal();
        this.$q.notify({
          color: "positive",
          position: "top",
          message: this.pageLanguage.loginConfirmMessage,
          icon: "check"
        });
      }
    }
  },
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      selectedLanguage: state => state.language.selectedLanguage,
      userData: state => state.user.user,
      loginModal: state => state.components.loginModal
    })
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      locale: "",
      isPwd: true
    };
  }
});
</script>

<style lang="sass">
.language-link
  color: white
  background: #1976D2
</style>
