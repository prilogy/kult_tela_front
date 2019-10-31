<template>
  <div>
    <div class="info">
      <VH1>Обновить вес</VH1>
      <VP>
        Старайтесь обновлять вес хотя-бы раз в два дня чтобы контролировать
        процесс похудения было проще
      </VP>
    </div>
    <form id="weight-update" @submit.prevent="updateWeight">
      <VInput
        type="number"
        required
        step="0.01"
        caption="Ваш текущий вес"
        v-model="new_weight"
      ></VInput>
    </form>
    <VButton
      mt="var(--space-half)"
      w100
      type="submit"
      form="weight-update"
      value="submit"
    >
      Подтвердить
    </VButton>
  </div>
</template>

<script>
import { VH1, VInput, VP, VButton } from '../components/'
import { mapActions } from 'vuex'
export default {
  components: { VButton, VP, VInput, VH1 },
  data() {
    return {
      new_weight: null
    }
  },
  methods: {
    async updateWeight() {
      try {
        await this.UPDATE_WEIGHT(this.new_weight)
        this.SET_SUCCESS('Вес успешно обновлен')
        this.$router.push('/')
      } catch (error) {}
    },
    ...mapActions({
      UPDATE_WEIGHT: 'user/UPDATE_WEIGHT',
      SET_SUCCESS: 'popup/SET_SUCCESS'
    })
  }
}
</script>

<style scoped>
.info {
  margin-bottom: var(--space);
}
h1 {
  margin-bottom: var(--space-half);
}
</style>
