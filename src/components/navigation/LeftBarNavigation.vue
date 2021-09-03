<template>
  <q-page-sticky position="top-left" :offset="[5, 5]">
    <h6 class="vericaltext">
      <div v-if="tab.split('-')[0] != 'home'">
        <q-icon size="ms" :name="tab.split('-')[0]" />
        {{ pageLanguage[tab.split("-")[1]] }}
      </div>
      <div v-if="tab.split('-')[0] == 'home'">
        <q-icon size="ms" :name="tab.split('-')[0]" />Scorp•App
      </div>
    </h6>
  </q-page-sticky>
</template>
<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "DrawerNavigation",
  methods: {},
  computed: {
    ...mapState({
      pageLanguage: state => state.language.pageLanguage,
      tab: state => state.components.tab
    })
  },
  data() {
    return {
      rightDrawerAction: true
    };
  }
});
</script>

<style lang="sass">
.vericaltext
    width:2px
    word-wrap: break-word
    font-family: monospace
    white-space: pre-wrap
</style>
