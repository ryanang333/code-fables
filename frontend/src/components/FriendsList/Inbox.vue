<template>
  <div ref="talkjs" style="width: 90%; margin: 30px; height: 500px">
    <i>Loading chat...</i>
  </div>
</template>

<script>
import Talk from "talkjs";
import config from "/config";
export default {
  name: "Inbox",
  data() {
    return {
      friend: {},
    };
  },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    username: String,
    friendInfo: Object,
  },
  methods: {
    async filterWords(message) {
      const url = "https://www.purgomalum.com/service/plain";
      try {
        const response = await axios.get(url, {
          params: {
            text: message,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await Talk.ready;
    const me = new Talk.User({
      id: this.currentUser.uid,
      name: this.currentUser.profile_name,
      photoUrl: this.currentUser.profile_pic_ID,
      welcomeMessage: "Hello!",
      //The welcomeMessage is the first message any other user will see when they start a chat with this user
      role: "booker",
    });
    const talkSession = new Talk.Session({
      appId: config.talkJSappID,
      me: me,
    });
    const other = new Talk.User({
      id: this.friendInfo.uid,
      name: this.friendInfo.profile_name,
      photoUrl: this.friendInfo.profile_pic_ID,
      welcomeMessage: "Hello!",
      role: "default",
    });
    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    // const inbox = talkSession.createInbox();
    // inbox.select(conversation);

    // inbox.mount(this.$refs.talkjs);
    const chatbox = talkSession.createChatbox();
    chatbox.onSendMessage(async (msgObj) => {
      const censoredMSG = await this.filterWords(msgObj.message.text);
      if (censoredMSG !== msgObj.message.text) {
        // conversation.sendMessage('Please be mindful of your language when chatting with others')
        conversation.sendMessage("I'm sorry for my language used.");
        alert("Please be mindful of your language when chatting with others");
      }
    });
    chatbox.select(conversation);
    chatbox.mount(this.$refs.talkjs);
  },
};
</script>
