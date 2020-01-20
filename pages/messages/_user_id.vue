<template>
  <div class="chat">
    <div class="chat__top">
      <VButtonBack color="white"></VButtonBack>
      <div class="chat__top__info" v-if="CHAT">
        <VAvatarSmall size="40px" :src="CHAT.user.avatar_src"></VAvatarSmall>
        <div>
          <VP>{{ CHAT.user.name }}</VP>
          <VCaption color="var(--grey-light3)">был в сети вчера</VCaption>
        </div>
      </div>
    </div>
    <div class="chat__main" v-if="CHAT">
      <ul class="chat__main__messages">
        <li class="msg" v-for="(msg, index) in CHAT.messages" :key="msg.id">
          <MessageCloud :message="msg" :me_id="ME.id" />
          <div
            class="chat__main__messages__date"
            v-if="
              CHAT.messages[index + 1] &&
                CHAT.messages[index].date !== CHAT.messages[index + 1].date
            "
          >
            <VCaption>{{ CHAT.messages[index + 1].date }}</VCaption>
          </div>
        </li>
      </ul>
      <div class="chat__main__offset"></div>
    </div>
    <div class="chat__input"></div>
  </div>
</template>

<script>
import { VButtonBack, VAvatarSmall } from '../../components/'
import { MessageCloud } from '../../components/pages/messages/_user_id/'
import { mapGetters } from 'vuex'

export default {
  components: {
    MessageCloud,
    VAvatarSmall,
    VButtonBack
  },
  layout: 'noNavAuth',
  data() {
    return {}
  },
  methods: {
    log() {
      console.log(this.CHAT)
    }
  },
  computed: {
    CHAT() {
      const user_id = this.$route.params.user_id
      return this.$store.getters['chat/GET_CHAT_BY_ID'](user_id)
    },
    ME() {
      return this.$store.getters['user/GET_USER']
    }
  },
  fetch({ store, params }) {
    store.dispatch('chat/FEED_CHAT_WITH_ID', params.user_id)
  },
  mounted() {
    window.scrollTo({
      top: document.body.scrollHeight
    })
  }
}
</script>

<style scoped>
.chat {
  --space-new: calc(var(--space) * 2 / 3);
  --message-offset: var(--space-half);
  height: 100vh;
  display: flex;
  align-items: flex-end;
}
.chat .chat__top {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  padding: var(--space-half) var(--space);
  background-color: var(--grey-light1);
}
.chat .chat__top__info {
  display: flex;
  margin-left: var(--space-new);
}
.chat .chat__top__info > div {
  margin-right: var(--space-new);
}

.chat__input {
  background: var(--grey-light1);
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.chat__main {
  width: 100%;
}

.chat__main__offset {
  height: 30px;
}

.chat__main__messages {
  display: flex;
  flex-direction: column;
}

.chat__main__messages .msg {
  width: 100%;
  margin-bottom: var(--message-offset);
}

.chat__main__messages__date {
  width: 100%;
  text-align: center;
  background: var(--white-trans4);
  margin: var(--message-offset) calc(var(--space) * (-1)) 0
    calc(var(--space) * (-1));
  padding: var(--space-third) var(--space);
}

.chat__main__messages__date p {
  color: var(--white-trans1);
}
</style>
