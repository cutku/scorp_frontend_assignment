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
import { defineComponent, ref } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage
    })
  }
});
</script>
