<template>
  <div :style="'--msg-max-width:' + maxWidth + 'px'" class="messages">
    <VPageHeading>Сообщения</VPageHeading>
    <div>
      <ul v-for="chat in CHATS" :key="chat.id" class="messages__contacts">
        <li class="messages__contacts__item">
          <nuxt-link :to="'/messages/' + chat.user_id">
            <ChatElement :chat="chat"></ChatElement>
          </nuxt-link>
          <VDivider class="contact__divider"></VDivider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VDivider, VAvatarSmall } from '../../components/'
import { ChatElement } from '../../components/pages/messages/index/'

export default {
  components: { ChatElement, VAvatarSmall, VDivider },
  data() {
    return {
      maxWidth: null
    }
  },
  computed: {
    ...mapGetters({
      CHATS: 'chat/GET_CHATS'
    })
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
.messages__contacts__item .contact__divider {
  margin: var(--space-half) 0;
  margin-left: calc(var(--avatar-size) + 5px);
  margin-right: calc(-1 * (var(--space)));
}
</style>
