<template>
  <div class="container">
    <VH1>Заголовок 1</VH1>
    <VH2 :color="$ds.colors.yellow.base">Заголовок 2</VH2>
    <VH3 :color="$ds.colors.grey.light1">Заголовок 3</VH3>
    <VP :color="$ds.colors.grey.light2">{{ GET_ERROR }}</VP>
    <VCaption>Подпись</VCaption>
  </div>
</template>

<script>
import { VH1, VH2, VH3, VP, VCaption } from '../components';
import { mapGetters } from 'vuex';

export default {
  components: { VH1, VH2, VH3, VP, VCaption },
  computed: {
    ...mapGetters(['GET_ERROR'])
  }
};
</script>

<style></style>
