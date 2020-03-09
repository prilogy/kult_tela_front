<template>
  <div ref="chatDiv" class="chat">
    <div class="chat__top">
      <div>
        <VButtonBack color="white"></VButtonBack>
        <div
          @click="!isAdmin ? $router.push('/user/' + CHAT.user.id) : null"
          class="chat__top__info"
          v-if="CHAT"
        >
          <VAvatarSmall
            :mark="
              chatf.status.bool ? { borderColor: 'var(--grey-light1)' } : null
            "
            size="40px"
            :admin_role_id="user && user.admin_role_id"
            :src="user && user.avatar_src"
          ></VAvatarSmall>
          <div>
            <VP>{{ chatf.name }}</VP>
            <VCaption color="var(--grey-light3)">
              {{ chatf.status.text }}
            </VCaption>
          </div>
        </div>
      </div>

      <AdminMark
        class="admin-mark--chat"
        v-if="isAdmin"
        :user="user"
        colored-text
      ></AdminMark>
    </div>

    <div ref="messages" class="chat__main" v-if="CHAT">
      <AllMessages
        class="chat__main__content"
        :chat="CHAT"
        :myId="ME.id"
      ></AllMessages>
    </div>

    <MessageInput
      class="chat__bottom"
      ref="messageInputArea"
      @focused="() => shouldScrollToBotton() && scrollTo({ toBottom: true })"
      @sendMessage="sendMessage"
      @heightChanged="scrollTo({ toBottom: true })"
    ></MessageInput>
  </div>
</template>

<script>
import { VButtonBack, VAvatarSmall } from '../../components/'
import {
  AllMessages,
  MessageInput
} from '../../components/pages/messages/_user_id/'
import { mapGetters } from 'vuex'
import AdminMark from '../../components/pages/messages/AdminMark'

export default {
  middleware: 'requireSub',
  components: {
    AdminMark,
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
    messagesScrolled(scrollPos) {
      if (scrollPos < 1000) {
        this.$store.dispatch('chat/LOAD_MESSAGES_HISTORY')
      }
    },
    sendMessage(text) {
      this.$store.dispatch('chat/SEND_MESSAGE', {
        text,
        to_user_id: this.user ? this.user.id : null,
        room_id: this.CHAT.id
      })
    },
    scrollTo({ height, toBottom }) {
      const el = this.$refs.messages
      el.scrollTop = toBottom
        ? (el.scrollTop = el.childNodes[0].clientHeight)
        : height
    },
    focusOnMessageInputArea() {
      if (this.$refs.messageInputArea) this.$refs.messageInputArea.focusOnArea()
    },
    shouldScrollToBotton() {
      const el = this.$refs.messages
      const scrollTop = el.scrollTop + el.clientHeight + 48
      return scrollTop >= el.childNodes[0].clientHeight - 250
    }
  },
  watch: {
    CHAT: {
      deep: true,
      handler() {
        const el = this.$refs.messages
        const curCH = el.childNodes[0].clientHeight
        this.$nextTick(() => {
          if (this.shouldScrollToBotton()) this.scrollTo({ toBottom: true })
          else if (el.scrollTop <= 100) {
            this.scrollTo({ height: el.childNodes[0].clientHeight - curCH })
          }
        })
      }
    }
  },
  computed: {
    chatf() {
      const chat = this.CHAT
      const user = this.user
      return {
        name: chat.name || user.name,
        status: {
          text: user ? (user.status ? 'онлайн' : 'не в сети') : '',
          bool: user ? user.status : false
        }
      }
    },
    user() {
      return !this.CHAT.conversation && this.CHAT
        ? this.CHAT.users.filter(e => e.id !== this.ME.id)[0]
        : null
    },
    isAdmin() {
      const user = this.user
      return user ? typeof user.admin_role_id === 'number' : null
    },
    ...mapGetters({
      CHAT: 'chat/GET_CURRENT_CHAT',
      ME: 'user/GET_USER'
    })
  },

  async fetch({ store, params, redirect }) {
    let user_id = params.user_id,
      conversation = false
    if (user_id.toString().indexOf('c') !== -1) {
      console.log('HELO BITACHES')
      user_id = parseInt(user_id.slice(1))
      conversation = true
    } else user_id = parseInt(user_id)
    console.log(user_id, conversation)

    const index = store.state.chat.chats
      .map(item => item.user_id)
      .indexOf(user_id)
    try {
      if (index === -1 || store.state.chat.chats[index].messages.length <= 20) {
        await store.dispatch('chat/FEED_CHAT_WITH_USER_ID', {
          id: user_id,
          setAsCurrent: true,
          conversation
        })
      } else {
        let id
        if (conversation) id = user_id
        else {
          id = this.$store.getters['chat/GET_CHATS'].filter(
            e => e.user_ids.includes(user_id) && e.user_ids.length === 2
          )[0].id
        }
        await store.dispatch('chat/SET_CURRENT_CHAT_FROM_CHATS', id)
      }
    } catch (e) {
      redirect('/messages')
    }
  },
  created() {
    console.log(this.$route.params)
    if (this.$route.query.c === null) console.log('aSSSSSSSSSSSSS')
  },
  async mounted() {
    this.$nextTick(() => {
      this.scrollTo({ toBottom: true })
    })
    document.addEventListener('keypress', () => {
      this.focusOnMessageInputArea()
    })

    const el = this.$refs.messages

    let debounce_timer
    el.addEventListener('scroll', () => {
      if (debounce_timer) {
        clearTimeout(debounce_timer)
      }

      debounce_timer = setTimeout(() => {
        this.messagesScrolled(el.scrollTop)
      }, 100)
    })

    await this.$store.dispatch('chat/SET_LAST_SEEN_MESSAGE')
  },
  destroyed() {
    document.removeEventListener('keypress', () => {})
    this.$store.dispatch('chat/RETURN_CURRENT_CHAT')
  }
}
</script>

<style scoped>
.chat {
  max-width: var(--body-max-width);
  margin: auto;
  --space-new: calc(var(--space) * 2 / 3);
  --message-offset: var(--space-half);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-flow: column;
  height: 100%;
}

.admin-mark--chat {
  border-radius: var(--radius);
  background: none !important;
  width: fit-content;
}

.chat .chat__top {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  padding: var(--space-half);
  box-sizing: border-box;
  background-color: var(--grey-light1);
  z-index: 1000;
}
.chat .chat__top__info {
  display: flex;
  margin-left: var(--space-new);
}

.chat__top > div {
  display: flex;
}

.chat .chat__top__info > div {
  margin-right: var(--space-new);
}

.chat__main {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.chat__main::-webkit-scrollbar {
  display: none;
}

.chat__main__content {
  margin-top: auto;
}
</style>
