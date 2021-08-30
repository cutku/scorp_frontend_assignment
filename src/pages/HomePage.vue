<template>
  <q-page class="p-pa-lg">
    <h5 class="q-ma-xl">{{ pageLanguage.loremIpsumTitle }}</h5>
    <p v-for="n in 15" :key="n" class="q-ma-xl">
      {{ pageLanguage.loremIpsumText }}
    </p></q-page
  >
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage
    })
  },
  name: "PageIndex"
});
</script>
