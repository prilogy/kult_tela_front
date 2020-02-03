<template>
  <div>
    <VPageHeading>Редактировать</VPageHeading>
    <form id="form" autocomplete="off" @submit.prevent="sendForm">
      <VH3 mb="var(--space-half)">email: {{ email }}</VH3>
      <VInput required caption="Имя" v-model="first_name"></VInput>
      <VInput required caption="Фамилия" v-model="last_name"></VInput>
      <VInput caption="Отчество" v-model="patronymic"></VInput>
      <VInput
        required
        step="0.01"
        type="number"
        caption="Рост (в см)"
        v-model="height"
        max="250"
        min="40"
      ></VInput>
      <VInput
        required
        type="number"
        max="100"
        min="1"
        caption="Возраст"
        v-model="age"
      ></VInput>
      <div>
        <VH3 weight="regular">
          Аватар
        </VH3>
        <div v-if="!avatar_src" class="avatar-preview">
          <div class="avatar-preview__caption">
            <VP>Текущий аватар</VP>
          </div>
          <img
            class="avatar-preview__img"
            :src="USER.avatar_src"
            alt="avatar image"
          />
        </div>
        <VImageUpload
          w100
          class="report__list__input"
          @imageUploaded="avatarHandle"
        >
          {{ !avatar_src ? 'Изменить аватар' : 'Загрузить другое фото' }}
        </VImageUpload>
      </div>
    </form>

    <VDivider />
    <div class="buttons">
      <VButton
        type="submit"
        form="form"
        value="submit"
        :disabled="!formValidate"
      >
        Сохранить
      </VButton>
      <VButton color="var(--yellow-base)" @click="$router.push('/')">
        Отменить
      </VButton>
    </div>

    <VP class="validation-caption" v-if="!formValidate">
      Форма заполнена неправильно
    </VP>
  </div>
</template>

<script>
import { VInput, VImageUpload, VDivider } from '../components/'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    VImageUpload,
    VDivider,
    VInput
  },
  data() {
    return {
      email: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      height: '',
      age: '',
      avatar_src: null
    }
  },
  methods: {
    async sendForm() {
      if (this.formValidate === true) {
        const form = new FormData()
        Object.keys(this.editedData).forEach(key => {
          form.append(key, this.editedData[key])
        })

        try {
          const result = await this.$api.User.updateInfo(form)
          if (result.success === true) {
            this.SET_SUCCESS('Данные успешно изменены')
            this.SET_USER(result.data)
          }
        } catch (error) {}
        this.$router.push('/')
      }
    },
    avatarHandle(img) {
      this.avatar_src = img
    },
    ...mapActions({
      SET_SUCCESS: 'popup/SET_SUCCESS',
      SET_USER: 'user/SET_USER'
    })
  },
  computed: {
    editedData() {
      const user = this.USER
      let edited = {}
      const names = ['first_name', 'last_name', 'patronymic', 'height', 'age']

      names.forEach(name => {
        if (user[name] != this[name]) edited[name] = this[name]
      })
      if (this.avatar_src) edited.avatar_src = this.avatar_src
      if (this.patronymic === '') edited.patronymic = ' '

      return edited
    },
    formValidate() {
      return Object.keys(this.editedData).length !== 0
    },
    ...mapGetters({
      USER: 'user/GET_USER'
    })
  },
  created() {
    const user = this.USER
    this.email = user.email
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.patronymic = user.patronymic
    this.height = user.height
    this.age = user.age
  }
}
</script>

<style scoped>
form {
  margin-bottom: var(--space);
}
form div {
  margin-bottom: var(--space-half);
}

.avatar-preview {
  margin-top: var(--space-half);
  position: relative;
}

.avatar-preview__caption {
  padding: var(--space-half);
  border-radius: 0 0 0 var(--radius);
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--grey-base);
}

.avatar-preview__caption p {
  color: var(--yellow-base) !important;
}

.avatar-preview__img {
  border-radius: var(--radius-half);
  max-width: 100%;
}

.buttons {
  display: flex;
  margin-top: var(--space);
}

.buttons button:first-child {
  width: 100%;
}

.buttons button:last-child {
  margin-left: var(--space-half);
  background: none !important;
}

.buttons button:last-child > h3 {
  color: var(--yellow-base) !important;
}

.validation-caption {
  margin-top: var(--space-half);
  text-align: center;
  color: var(--red-base);
}
</style>
