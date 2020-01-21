<template>
  <div ref="chatDiv" class="chat">
    <div class="chat__top">
      <VButtonBack color="white"></VButtonBack>
      <div class="chat__top__info" v-if="CHAT">
        <VAvatarSmall
          :mark="
            CHAT.user_status ? { borderColor: 'var(--grey-light1)' } : null
          "
          size="40px"
          :src="CHAT.user.avatar_src"
        ></VAvatarSmall>
        <div>
          <VP>{{ CHAT.user.name }}</VP>
          <VCaption color="var(--grey-light3)">
            {{ CHAT.user_status ? 'онлайн' : 'не в сети' }}
          </VCaption>
        </div>
      </div>
    </div>
    <div class="chat__main" v-if="CHAT">
      <div style="height: 200px"></div>
      <AllMessages :chat="CHAT" :myId="ME.id"></AllMessages>
      <div :style="{ height: bottomOffset }" class="chat__main__offset"></div>
    </div>

    <MessageInput @sendMessage="sendMessage"></MessageInput>
  </div>
</template>

<script>
import { VButtonBack, VAvatarSmall } from '../../components/'
import {
  AllMessages,
  MessageInput
} from '../../components/pages/messages/_user_id/'
import { mapGetters } from 'vuex'

export default {
  components: {
    AllMessages,
    VAvatarSmall,
    VButtonBack,
    MessageInput
  },
  layout: 'noNavAuth',
  data() {
    return {
      input: '',
      bottomOffset: '30px'
    }
  },
  methods: {
    sendMessage(text) {
      this.$store.dispatch('chat/SEND_MESSAGE', {
        text,
        to_user_id: this.CHAT.user_id
      })
      this.input = ''
      this.scrollToBottom()
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.clientHeight + 200)
    }
  },
  watch: {
    CHAT() {
      //console.log('list rerender')
      setTimeout(() => this.scrollToBottom(), 50)
    }
  },
  computed: {
    CHAT() {
      const user_id = this.$route.params.user_id
      return this.$store.getters['chat/GET_CHAT_BY_USER_ID'](user_id)
    },
    ME() {
      return this.$store.getters['user/GET_USER']
    }
  },
  fetch({ store, params }) {
    store.dispatch('chat/FEED_CHAT_WITH_USER_ID', params.user_id)
  },
  mounted() {
    setTimeout(() => this.scrollToBottom(), 100)
  }
}
</script>

<style scoped>
.chat {
  --space-new: calc(var(--space) * 2 / 3);
  --message-offset: var(--space-half);
}
.chat .chat__top {
  max-width: var(--body-max-width);
  margin: auto;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  padding: var(--space-half);
  background-color: var(--grey-light1);
  z-index: 1000;
}
.chat .chat__top__info {
  display: flex;
  margin-left: var(--space-new);
}
.chat .chat__top__info > div {
  margin-right: var(--space-new);
}

.chat__bottom {
  display: flex;
  box-sizing: border-box;
  background: var(--grey-light1);
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-half);
  max-width: var(--body-max-width);
  margin: auto;
}

.chat__bottom__btn {
  margin-left: var(--space-half);
  color: var(--yellow-base);
}

.chat__bottom__input {
  background: var(--white-trans4);
  border-radius: var(--radius-half);
  width: 100%;
  height: 100%;
  color: var(--white-base);
  padding: 0 var(--space-half);
  font-size: var(--p-fs);
  font-weight: 300;
  box-sizing: border-box;
}

.chat__main {
  width: 100%;
}

.chat__main__offset {
  width: 100%;
}
</style>
