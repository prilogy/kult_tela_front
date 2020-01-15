<template>
  <div class="report">
    <div class="report__top">
      <VH2>Отчет о питании</VH2>
      <VP color="var(--grey-light3)">
        Загрузите фото для каждого приема пищи, чтобы наши специалисты могли
        понять, все ли вы делаете правильно!
      </VP>
    </div>

    <ul class="report__list">
      <li
        v-for="(item, index) in sets"
        :class="{
          report__list__li: true,
          'report__list__li--no-image': image_1 === null,
          'report__list__li--disabled': REPORT_STATUS[index] === true
        }"
      >
        <VH2>{{ item.title }}</VH2>
        <VImageUpload
          v-if="REPORT_STATUS[index] === false"
          class="report__list__input"
          @imageUploaded="img => handleUpload(img, 1)"
        ></VImageUpload>
        <VH3 v-else>Отчет загружен</VH3>
      </li>
    </ul>
  </div>
</template>

<script>
import { VH2, VH1, VP, VH3, VTipSmall, VImageUpload } from '../../components'
import { mapGetters } from 'vuex'
import VRankNotification from '../../components/utils/VRankNotification'

export default {
  middleware: 'minPlan_1',
  components: {
    VRankNotification,
    VH1,
    VH2,
    VH3,
    VImageUpload,
    VP,
    VTipSmall
  },
  data() {
    return {
      sets: [
        { title: 'Завтрак', id: 1 },
        { title: 'Обед', id: 2 },
        { title: 'Ужин', id: 3 },
        { title: 'Перекус', id: 4 }
      ],
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null
    }
  },
  methods: {
    handleUpload(img, id) {
      const ids = {
        1: () => {
          this.image_1 = img
        },
        2: () => {
          this.image_2 = img
          console.log('heress')
        },
        3: () => {
          this.image_3 = img
        },
        4: () => {
          this.image_4 = img
        }
      }

      ids[id]()
    }
  },
  computed: {
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
}

.report__list__li--disabled h2,
.report__list__li--disabled h3 {
  color: var(--grey-light2) !important;
}
</style>
