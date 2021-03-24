<template>
  <div>
    <VPageHeading button level="3">
      Техническая помощь
    </VPageHeading>
    <VP>
      Для получения наилучшего опыта использования приложения - рекомендуется
      использовать последние версии браузеров Chrome, Opera или Firefox
    </VP>
    <VP>
      Если вы используете один из перечисленных браузеров и всё ещё
      сталкиваетесь с проблемами - нажмите кнопку ниже и опишите вашу проблему.
    </VP>
    <VButton @click="goToAdmin" w100>Связаться с администратором</VButton>
  </div>
</template>

<script>
  export default {
    methods: {
      async goToAdmin() {
        console.log('xx')
        const {data} = await this.$api.Support.getAdminId()
        console.log(data)
        if (data && data.id) {
          const link = '/messages/' + data.id
          await this.$router.push(link)
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
