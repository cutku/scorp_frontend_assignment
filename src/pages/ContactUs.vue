<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    {{this.userData}}
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters, useStore, mapState } from "vuex";
import { useQuasar, Notify } from "quasar";
export default defineComponent({
  computed: {
    ...mapState({
      userData: (state) => state.user.user,
    }),
  },
  name: "PageIndex",
});
</script>
