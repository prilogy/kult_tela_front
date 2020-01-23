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
      <AllMessages
        v-if="!CHAT.chat_is_empty"
        :chat="CHAT"
        :myId="ME.id"
      ></AllMessages>
      <div :style="{ height: bottomOffset }" class="chat__main__offset"></div>
    </div>

    <MessageInput
      ref="messageInputArea"
      @sendMessage="sendMessage"
      @heightChanged="setBottomOffset"
    ></MessageInput>
  </div>
</template>

<script>
import { VButtonBack, VAvatarSmall } from '../../components/'
import {
  AllMessages,
  MessageInput
} from '../../components/pages/messages/_user_id/'
import { mapGetters, mapState } from 'vuex'

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
    setBottomOffset() {
      setTimeout(() => {
        this.bottomOffset =
          this.$refs.messageInputArea.$el.clientHeight - 20 + 'px'
        this.scrollToBottom()
      }, 30)
    },
    sendMessage(text) {
      this.$store.dispatch('chat/SEND_MESSAGE', {
        text,
        to_user_id: this.CHAT.user_id
      })
    },
    scrollToBottom() {
      window.scrollTo(0, document.body.clientHeight)
    },
    focusOnMessageInputArea() {
      this.$refs.messageInputArea.focusOnArea()
    }
  },
  watch: {
    CHAT: {
      deep: true,
      handler() {
        this.$nextTick(() => this.scrollToBottom())
      }
    }
  },
  computed: {
    ...mapState({
      CHAT: state => state.chat.currentChat,
      ME: state => state.user.user
    })
  },

  async fetch({ store, params, redirect }) {
    const user_id = parseInt(params.user_id)
    const index = store.getters['chat/GET_CHATS']
      .map(item => item.user_id)
      .indexOf(user_id)
    try {
      if (
        index === -1 ||
        store.getters['chat/GET_CHATS'][index].messages.length === 1
      ) {
        await store.dispatch('chat/FEED_CHAT_WITH_USER_ID', {
          id: user_id,
          setAsCurrent: true
        })
      } else {
        await store.dispatch('chat/SET_CURRENT_CHAT', user_id)
      }
    } catch (e) {
      redirect('/messages')
    }
  },
  beforeUpdate() {
    this.$store.dispatch('chat/SET_LAST_SEEN_MESSAGE', this.CHAT.id)
  },
  async mounted() {
    this.setBottomOffset()
    this.$nextTick(() => {
      this.scrollToBottom()
    })
    document.addEventListener('keypress', () => {
      this.focusOnMessageInputArea()
    })
  },
  destroyed() {
    this.$store.dispatch('chat/RETURN_CURRENT_CHAT')
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

.chat__main-is-empty {
  height: 100%;
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
  transition: 0s height !important;
}
</style>
