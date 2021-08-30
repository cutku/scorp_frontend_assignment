<template>
  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <div>
        {{ pageLanguage.footerText }}
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Footer",
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage
    })
  }
});
</script>
