

<template>
    <div class="card-box-fchat">
        <div class="chat-header" @click="invokeToggleChatbot">
            Chat
            <i class="fa fa-minus minus"></i>
        </div>
        <div class="chat-window" ref="chatWindow">
            <ul class="message-list">
                <!-- Loop through messages and display them -->
                <li v-for="(message, index) in messages" :key="index" class="message">
                    <span v-if="!message.buttons" :class="{ 'custom-table': message.table }" v-html="message"></span>
                    <span v-if="message.buttons">{{ message.text }}</span>
                    <div v-if="message.buttons && message.buttons.length > 0" class="button-list">
                        <button v-for="(button, buttonIndex) in message.buttons" :key="buttonIndex"
                            @click="handleButtonClick(button)">
                            {{ button.title }}
                        </button>
                    </div>
                </li>

            </ul>

        </div>

        <div class="chat-input">
            <input style="font-size: 20px;" v-model="newMessage" type="text" class="message-input" placeholder="Aa"
                @keydown="onKeydown">

            <i @click="startSpeechRecognition" style="cursor: pointer;" class="fa fa-microphone mic"></i>
            <button @click="sendMessage" type="submit" class="send-button">Gửi</button>
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
            buttons: [],
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
    created() {
        this.newMessage = "Xin Chào bạn đã đến với phòng khám của chúng tôi"
        this.messages.push(`Bot : ${this.newMessage}`);
        this.newMessage = ""
        this.scrollToBottom();
    },
    methods: {
        onKeydown(event) {
            // Kiểm tra xem phím được nhấn có phải là "Enter" không (keyCode 13)
            if (event.keyCode === 13) {
                // Gọi hàm xử lý gửi tin nhắn ở đây
                this.sendMessage();
            }
        },
        async sendMessage() {
            const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';
            if (this.newMessage.trim() === '') return;

            this.messages.push(`Bạn : ${this.newMessage}`);
            this.scrollToBottom();
            const youMessage = this.newMessage
            this.newMessage = '';
            const message = {
                sender: this.userID,
                message: youMessage
            };
            const response = await axios.post(chatbotURL, message);
            console.log(response)
            if (response.data[0].buttons) {
                this.messages.push({
                    text: response.data[0].text,
                    buttons: response.data[0].buttons
                });
            } else {
                this.messages.push(`bot: ${response.data[0].text}`);
            }
            this.scrollToBottom();

        },
        async handleButtonClick(button) {
            this.newMessage = button.title
            console.log(this.newMessage)
            const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';
            if (this.newMessage.trim() === '') return;

            this.messages.push(`Bạn : ${this.newMessage}`);
            this.scrollToBottom();
            const youMessage = this.newMessage
            this.newMessage = '';
            const message = {
                sender: this.userID,
                message: youMessage
            };
            const response = await axios.post(chatbotURL, message);
            this.messages.push(`Bot: ${response.data[0].text}`);
            this.scrollToBottom();
            // Implement actions based on the clicked button

            // Add your logic here, such as sending a specific message or triggering an action
        },
        invokeToggleChatbot() {
            // Invoke the toggleChatbot method
            this.toggleChatbot();
        },
        async startSpeechRecognition() {
            // Check if the browser supports the SpeechRecognition API
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

                // Set language (optional)
                recognition.lang = 'vi-VN';

                // Start speech recognition
                recognition.start();

                recognition.onresult = async (event) => {
                    const transcript = event.results[0][0].transcript;

                    this.newMessage = transcript;
                    this.messages.push(`You : ${this.newMessage}`);
                    this.scrollToBottom();
                    const message = {
                        sender: this.userID,
                        message: this.newMessage
                    };
                    const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';
                    const response = await axios.post(chatbotURL, message);
                    this.messages.push(`Bot: ${response.data[0].text}`);
                    this.scrollToBottom();
                };
                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                };
            } else {
                console.error('Speech recognition not supported in this browser.');
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatWindow = this.$refs.chatWindow;
                chatWindow.scrollTop = chatWindow.scrollHeight;
            });
        },
        updated() {
            this.scrollToBottom();
        },
    }
}
</script>

<style scoped>
.custom-table {
    font-size: 20px;
}

.button-list button {
    background: white;
    margin-bottom: 5px;
    border-radius: 10px;
    text-align: center;
}

.card-box-fchat .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tinnhan table {
    border: 1px solid black;
    font-size: 20px;
}

.card-box-fchat .chat-header .minus {
    margin-right: 10px;
    background: 0084ff;
}

.chat-input .mic {
    font-size: 24px;
    margin: 0 10px;
}

.message-list li {
    margin: 10px 10px;
    background-color: #F0F0F0;
    /* Màu nền tin nhắn của người dùng */
    color: white;
    padding: 10px;
    border-radius: 15px;
    /* Góc bo tròn cho tin nhắn */
    max-width: 100%;
    /* Độ rộng tối đa của tin nhắn */
    word-wrap: break-word;
    /* Tự động xuống dòng khi tin nhắn dài */
    margin-bottom: 5px;
    font-size: 20px;
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
    background-color: #039ae3;
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

span {
    color: #050505;
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
    background-color: #039ae3;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 19px;
}

.send-button:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}
</style>