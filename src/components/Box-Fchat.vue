

<template>
    <div class="card-box-fchat">
        <div class="chat-header" @click="invokeToggleChatbot">
            Chat
            <i class="fa fa-minus minus"></i>
        </div>
        <div class="chat-window">
            <ul class="message-list">
                <!-- Loop through messages and display them -->
                <li v-for="(message, index) in messages" :key="index" class="message">{{ message }}</li>
            </ul>
        </div>

        <div class="chat-input">
            <input v-model="newMessage" type="text" class="message-input" placeholder="Type your message here">
            <i class="fa fa-microphone mic"></i>
            <button @click="sendMessage" type="submit" class="send-button">Send</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            messages: [],
            newMessage: '',
        };
    },
    props: {
        isChatbotEnabled: Boolean,
        toggleChatbot: Function,
    },
    computed: {
        ...mapState({
            userID: (state) => state.userID
        }),

    },
    methods: {
        async sendMessage() {
            const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';
            if (this.newMessage.trim() === '') return;

            this.messages.push(`You : ${this.newMessage}`);
            const youMessage = this.newMessage
            this.newMessage = '';
            const message = {
                sender: this.userID,
                message: youMessage
            };
            const response = await axios.post(chatbotURL, message);
            console.log(response.data[0].text)
            // Push user and bot messages into separate arrays

            this.messages.push(`bot: ${response.data[0].text}`);

            console.log(this.messages)

            // Simulate a response from an assistant after a delay
        },
        invokeToggleChatbot() {
            // Invoke the toggleChatbot method
            this.toggleChatbot();
        },
    }
}
</script>

<style scoped>
.card-box-fchat .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-box-fchat .chat-header .minus {
    margin-right: 10px;
}

.chat-input .mic {
    font-size: 24px;
    margin: 0 10px;
}

.message-list li {
    margin: 10px 10px;
    background-color: #0084ff;
    /* Màu nền tin nhắn của người dùng */
    color: white;
    padding: 10px;
    border-radius: 15px;
    /* Góc bo tròn cho tin nhắn */
    max-width: 70%;
    /* Độ rộng tối đa của tin nhắn */
    word-wrap: break-word;
    /* Tự động xuống dòng khi tin nhắn dài */
    margin-bottom: 5px;
}

.card-box-fchat {
    width: 400px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    right: 0px;
    bottom: 10px;
    z-index: 999;
}


.chat-header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.chat-window {
    height: 300px;
    overflow-y: scroll;
}


.message-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
}

.message-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 5px;
    font-size: 14px;
}

.send-button {
    border: none;
    outline: none;
    background-color: #333;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
}

.send-button:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}
</style>