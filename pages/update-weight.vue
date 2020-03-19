<template>
  <div>
    <VPageHeading button>
      Обновить вес
      <template v-slot:info>
        Старайтесь обновлять вес хотя бы раз в два дня, чтобы контролировать
        процесс похудения было проще.
        <br />
        Теряете килограммы - получаете звание
      </template>
    </VPageHeading>
    <form id="weight-update" @submit.prevent="updateWeight">
      <VInput
        type="number"
        required
        step="0.01"
        min="30"
        max="220"
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
    <!--    <VH3 mt="var(&#45;&#45;space)" mb="var(&#45;&#45;space-half)">-->
    <!--      История вашего веса-->
    <!--    </VH3>-->
    <!--    <div ref="chartWrapper" style="width: 100%">-->
    <!--      <svg v-if="weightHistory" style="width: 100%">-->
    <!--        <polyline-->
    <!--          fill="none"-->
    <!--          stroke="var(&#45;&#45;yellow-base)"-->
    <!--          stroke-width="2"-->
    <!--          :points="weightHistory.line"-->
    <!--        ></polyline>-->
    <!--      </svg>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { VInput } from '../components/'
import { mapActions } from 'vuex'
export default {
  middleware: 'requireSub',
  components: { VInput },
  data() {
    return {
      new_weight: null,
      weightHistory: null
    }
  },

  mounted() {
    /*const history = this.$store.getters['user/GET_USER'].weight_history || null
    if (history) {
      const maxX = this.$refs.chartWrapper.clientWidth
      console.log(maxX, history.length)
      const step = maxX / (history.length - 1)
      console.log('step', step)
      this.weightHistory =
        {
          line: history.reduce(
            (acc = '', cur, idx) => acc + ' ' + idx * step + ',' + cur.weight,
            ''
          ),
          data: history.map((e, idx) => ({ x: idx * step, y: e.weight }))
        } || null
    } else return null*/
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
