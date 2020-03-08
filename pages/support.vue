<template>
  <div>
    <VPageHeading>
      Техническая помощь
    </VPageHeading>
    <VP>
      Для получения наилучшего опыта использования приложения - рекомендуется
      использовать последние версии браузеров Chrome, Opera или Firefox
    </VP>
    <VP>
      Если вы используете один из перечисленных браузеров и всё ещё
      сталкиваетесь с проблемами - нажмите кнопку ниже.
    </VP>
    <VButton @click="goToAdmin" w100>Связаться с администратором</VButton>
  </div>
</template>

<script>
export default {
  methods: {
    async goToAdmin() {
      const { data } = await this.$api.Support.getAdminId()
      if (data && data.id) {
        this.$router.push('/messages/' + data.id)
      }
    }
  }
}
</script>

<style scoped>
p {
  color: var(--grey-light3) !important;
  margin-bottom: var(--space-half);
}
</style>
