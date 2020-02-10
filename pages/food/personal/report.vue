<template>
  <div class="report">
    <div class="report__top">
      <VPageHeading button>
        Отчет о питании
        <template v-if="!isAllUploaded" v-slot:info>
          Загрузите фото после каждого приема пищи, чтобы наши специалисты могли
          понять, все ли вы делаете правильно!
        </template>
      </VPageHeading>
    </div>
    <div v-if="!isAllUploaded">
      <ul class="report__list">
        <li
          v-for="(item, index) in sets"
          :key="item.title"
          :class="{
            report__list__li: true,
            'report__list__li--disabled': REPORT_STATUS[index] === true,
            'report__list__li--no-image':
              item.image === null && REPORT_STATUS[index] !== true
          }"
        >
          <VH3>{{ item.title }}</VH3>
          <div v-if="REPORT_STATUS[index] === false">
            <VImageUpload
              class="report__list__input"
              @imageUploaded="img => handleUpload(img, index)"
            ></VImageUpload>
          </div>
          <VH3 v-else>Отчет загружен</VH3>
        </li>
      </ul>
      <VButton
        :disabled="!validateForm"
        @click="sendReport"
        w100
        mb="var(--space)"
      >
        Отправить отчет
      </VButton>
      <VTipSmall>
        <VP color="var(--grey-light3)">
          Не обязательно загружать все фото сразу
        </VP>
      </VTipSmall>
    </div>
    <div v-else>
      <VP style="text-align: center" color="var(--grey-light3)">
        Все отчеты уже загружены, возвращайтесь завтра!
      </VP>
    </div>
  </div>
</template>

<script>
import { VTipSmall, VImageUpload, VButtonBack } from '../../../components'
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'minPlan_1',
  components: {
    VImageUpload,
    VTipSmall,
    VButtonBack
  },
  data() {
    return {
      sets: [
        { title: 'Завтрак', image: null },
        { title: 'Обед', image: null },
        { title: 'Ужин', image: null },
        { title: 'Перекус', image: null }
      ]
    }
  },
  methods: {
    handleUpload(img, id) {
      this.sets[id].image = img
    },
    sendReport: async function() {
      const form = new FormData()
      const names = this.sets.map(
        item => (item.image !== null && item.title) || null
      )
      const images = this.sets.map(item => item.image)

      images.forEach(image => form.append('images', image))
      names.forEach(name => form.append('names', name))

      try {
        const { data } = await this.$api.FoodReport.send(form)
        this.SET_REPORT_STATUS(data)
        this.SET_SUCCESS('Отчет успешно загружен!')
      } catch (e) {}
    },
    ...mapActions({
      SET_REPORT_STATUS: 'food/SET_REPORT_STATUS',
      SET_SUCCESS: 'popup/SET_SUCCESS'
    })
  },
  computed: {
    validateForm() {
      let res = false
      this.sets
        .map(item => item.image)
        .forEach(item => {
          res = res || item !== null
        })
      return res
    },
    isAllUploaded() {
      return this.REPORT_STATUS.reduce(
        (item, reducer) => (reducer = reducer && item)
      )
    },
    ...mapGetters({
      REPORT_STATUS: 'food/GET_REPORT_STATUS'
    })
  },
  async asyncData({ store, redirect }) {
    if (store.getters['food/GET_REPORT_STATUS'] === null) {
      await store.dispatch('food/SET_REPORT_STATUS')
    }
    if (store.getters['food/SET_REPORT_STATUS'] === null)
      redirect('/food/personal')
  }
}
</script>

<style>
.report__top {
  margin-bottom: var(--space-half);
}

.report__list__li {
  padding: var(--space);
  background-color: var(--grey-light1);
  border-radius: var(--radius);
  margin-bottom: var(--space-half);
}

.report__list__li button {
  width: 100%;
}

.report__list__li--no-image {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.report__list__li--no-image button {
  width: auto;
}

.report__list__li--disabled {
  background-color: unset !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report__list__li--disabled h2,
.report__list__li--disabled h3 {
  color: var(--grey-light2) !important;
}
</style>
