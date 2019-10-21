<template>
  <div class="container">
    <VH1>Заголовок 1</VH1>
    <VH2 :color="$ds.colors.yellow.trans1">Заголовок 2</VH2>
    <VH3 :color="$ds.colors.grey.light1">Заголовок 3</VH3>
    <VP :color="$ds.colors.grey.light2">Параграф</VP>
    <VCaption>Подпись</VCaption>
  </div>
</template>

<script>
import { VH1, VH2, VH3, VP, VCaption } from '../components';

export default {
  components: { VH1, VH2, VH3, VP, VCaption }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
body {
  background: var(--grey-base);
}
</style>
