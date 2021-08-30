<template>
  <q-page class="flex flex-center">
    <div style="min-width: 60%">
      <q-form @submit.prevent class="q-gutter-md q-pa-md">
        <h5 class="q-ma-xl">
          <q-icon size="md" name="mail" /> {{ pageLanguage.contactUs }}
        </h5>
        <q-input
          outlined
          v-model="username"
          :label="pageLanguage.username"
          hint=""
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || pageLanguage.errorTypeSomething
          ]"
        />
        <q-input
          outlined
          :bg-color="validateEmail(email) ? 'green-5' : 'red-5'"
          v-model="email"
          :label="pageLanguage.email"
          hint=""
          lazy-rules
          border
          :rules="[
            val => (val && val.length > 0) || pageLanguage.errorTypeSomething,
            val => validateEmail(val) || pageLanguage.errorTypeMail
          ]"
        >
        </q-input>
        <q-input
          outlined
          :bg-color="validatePhoneNumber(phoneNumber) ? 'green-5' : 'red-5'"
          v-model="phoneNumber"
          :label="pageLanguage.phoneNumber"
          hint=""
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || pageLanguage.errorTypeSomething,
            val => validatePhoneNumber(val) || pageLanguage.errorTypePhone
          ]"
        />
        <q-select
          outlined
          v-model="countrySelection"
          use-input
          input-debounce="0"
          :label="pageLanguage.countrySelector"
          option-value="id"
          option-label="name"
          :options="options"
          @filter="filterFn"
          behavior="menu"
          :rules="[
            val => (val && val.id.length > 0) || pageLanguage.errorTypeSomething
          ]"
        />
        <q-input
          :label="pageLanguage.textField"
          v-model="text"
          filled
          autogrow
          :rules="[
            val => (val && val.length > 0) || pageLanguage.errorTypeSomething
          ]"
        />
        <template v-slot:prepend>
          <q-icon name="language" @click.stop />
        </template>
        <div class="right">
          <q-btn
            class="allign-right"
            label="Send"
            type="login"
            color="primary"
            icon-right="send"
            @click="postRequest"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style>
.right {
  float: right;
}
.q-btn {
  min-width: 9.375rem;
}
</style>
<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  computed: {
    ...mapState({
      userData: state => state.user.user,
      pageLanguage: state => state.language.pageLanguage
    })
  },
  methods: {
    ...mapActions(["setPageLanguage", "setUser"]),
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validatePhoneNumber(phoneNum) {
      const re = /^\d+$/.test(phoneNum);
      return re;
    },

    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.pageLanguage.countryList.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    postRequest() {
      if (
        this.username != "" &&
        this.validateEmail(this.email) &&
        this.validatePhoneNumber(this.phoneNumber) &&
        this.text != "" &&
        this.countrySelection.id != ""
      ) {
        api
          .post("/contactus", {
            name: this.username,
            email: this.email,
            phonenumber: this.phoneNumber,
            country_code: this.countrySelection.id,
            text: this.text
          })
          .then(response => {
            this.$q.notify("Success");
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "top",
              message: this.pageLanguage.postError + ": " + error,
              icon: "report_problem"
            });
          });
      } else {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: this.pageLanguage.loginPostErrorMessage,
          icon: "report_problem"
        });
      }
    }
  },
  watch: {
    userData: {
      handler: function() {
        this.username = this.userData.username;
        this.email = this.userData.email;
      },
      deep: true
    },
    pageLanguage: {
      handler: function() {
        let self = this;
        this.options = this.pageLanguage.countryList;
        if (this.countrySelection.id != "") {
          this.countrySelection = this.pageLanguage.countryList.find(
            element => element.id == self.countrySelection.id
          );
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.userData.username != "") {
      this.username = this.userData.username;
    }
    if (this.email != this.userData.email) {
      this.email = this.userData.email;
    }
  },
  data() {
    return {
      options: [],
      username: "",
      email: "",
      phoneNumber: "",
      text: "",
      locale: "",
      countrySelection: {
        id: "",
        name: ""
      },
      isPwd: true
    };
  },
  name: "PageIndex"
});
</script>
