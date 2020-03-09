<template>
  <div :style="'--msg-max-width:' + maxWidth + 'px'" class="messages">
    <VPageHeading>Сообщения</VPageHeading>
    <div v-if="CHATS.length > 0">
      <ul v-for="chat in CHATS" :key="chat.id" class="messages__contacts">
        <li class="messages__contacts__item">
          <ChatElement :dateToday="dateToday" :chat="chat"></ChatElement>
        </li>
      </ul>
    </div>
    <div v-else class="no-dialogs">
      <VP>У вас пока нет диалогов</VP>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VDivider, VAvatarSmall } from '../../components/'
import { ChatElement } from '../../components/pages/messages/index/'

export default {
  middleware: 'requireSub',
  components: { ChatElement, VAvatarSmall, VDivider },
  data() {
    return {
      maxWidth: null,
      dateToday: null
    }
  },
  computed: {
    ...mapGetters({
      CHATS: 'chat/GET_CHATS'
    })
  },
  created() {
    const date = new Date()
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    this.dateToday = `${day}.${month}.${date.getFullYear()}`
    this.$store.commit('chat/SET_IS_NEW_MESSAGES', false)
  },
  mounted() {
    const cssMaxWidth = Number(
      getComputedStyle(document.body)
        .getPropertyValue('--body-max-width')
        .replace('px', '')
    )
    this.maxWidth =
      (document.body.clientWidth > cssMaxWidth
        ? cssMaxWidth
        : document.body.clientWidth) * 0.6
  },
  fetch({ store }) {
    if ([0, 1].includes(store.getters['chat/GET_CHATS'].length)) {
      store.dispatch('chat/FEED_CHATS')
    }
  }
}
</script>

<style scoped>
.messages__contacts__item {
  --avatar-size: 50px;
  margin-left: calc(-1 * var(--space-third));
}

.no-dialogs p {
  text-align: center;
  color: var(--grey-light2);
}
</style>
