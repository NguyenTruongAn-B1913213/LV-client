<!-- <template>
    <div class="card-box-fchat">
        <div class="chat-header">Chat</div>
        <div class="chat-window">
            <div class="container id-message">
                <div class="row" id="message-server">
                    <div class="message-server">
                        <div>
                            <img class="avatar-server"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQa1BaQudOh3skE-T46emDwzYgmMTX-Ts1Q&usqp=CAU"
                                alt="Avatar">
                        </div>
                        <ul class="message-list-server">
                            <li>Xin Chào Tôi Có Thể Giúp Gì Cho Bạn</li>
                        </ul>
                    </div>
                </div>

                <div class="row" id="message-client">
                    <div class="message-client">
                        <ul class="message-list-client">
                            <li>Bạn Có Thể Giúp Tôi ?</li>
                        </ul>
                        <div>
                            <img class="avatar"
                                src="https://ivcdn.vnecdn.net/giaitri/images/web/2022/08/25/trailer-avatar-4k-1661403190.jpg"
                                alt="Avatar">
                        </div>
                    </div>
                </div>
                <div class="row" id="message-server-2">
                    <div class="message-server">
                        <div>
                            <img class="avatar-server"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQa1BaQudOh3skE-T46emDwzYgmMTX-Ts1Q&usqp=CAU"
                                alt="Avatar">
                        </div>
                        <ul class="message-list-server">
                            <li>Xin Chào Tôi Có Thể Giúp Gì Cho Bạn</li>
                        </ul>
                    </div>
                </div>
                <div class="row" id="message-client">
                    <div class="message-client">
                        <ul class="message-list-client">
                            <li>Bạn Có Thể Giúp Tôi ?</li>
                        </ul>
                        <div>
                            <img class="avatar"
                                src="https://ivcdn.vnecdn.net/giaitri/images/web/2022/08/25/trailer-avatar-4k-1661403190.jpg"
                                alt="Avatar">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="chat-input">
            <input v-model="message" type="text" class="message-input" placeholder="Type your message here">
            <button @click="Chatbot" type="submit" class="send-button">Send</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            usermessages: [], // Lưu trữ tin nhắn
            resmessages: [], // Tin nhắn mới
            message: '',
        }


    },
    computed: {

        ...mapState({

            userID: (state) => state.userID
        }),

    },
    methods: {
        async Chatbot() {
            // API ChatBot
            const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';

            const message = {
                sender: this.userID,
                message: this.message
            };

            try {
                const response = await axios.post(chatbotURL, message);
                console.log(response.data[0].text)
                // Push user and bot messages into separate arrays
                this.usermessages.push(this.message);
                this.resmessages.push(response.data[0].text);

                // Clear the input field after sending the message
                this.message = "";

                console.log("User Messages:", this.usermessages);
                console.log("Bot Messages:", this.resmessages);
            } catch (error) {
                console.error(error);
            }
        }
    }

};
</script>

<style scoped>
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


/* chat client */
#message-client {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    position: absolute;
    bottom: 100px;
    right: 5px;
}

#message-client ul {
    list-style: none;
    margin-top: 10px;
    padding: 0;
}

#message-client ul li {
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 20px;
}

.message-client {
    display: flex;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

/* chat server */

#message-server {
    display: flex;
    justify-content: flex-start;
    margin-left: 5px;
    position: absolute;
    bottom: 170px;
    left: 0px;
}

#message-server-2 {
    display: flex;
    justify-content: flex-start;
    margin-left: 5px;
    position: absolute;
    bottom: 50px;
    left: 0px;
}

#message-server ul {
    list-style: none;
    border-radius: 20px;
    background-color: black;
    margin-top: 10px;
    padding: 0;
}

#message-server-2 ul {
    list-style: none;
    border-radius: 20px;
    background-color: black;
    margin-top: 10px;
    padding: 0;
}

#message-server ul li {
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 20px;
}

#message-server-2 ul li {
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 20px;
}

.message-server {
    display: flex;
}

.avatar-server {
    width: 30px;
    height: 30px;
    border-radius: 50%;
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
</style> -->

<template>
    <div class="card-box-fchat">
        <div class="chat-header">Chat</div>
        <div class="chat-window">
            <ul class="message-list">
                <!-- Loop through messages and display them -->
                <li v-for="(message, index) in messages" :key="index" class="message">{{ message }}</li>

            </ul>
        </div>

        <div class="chat-input">
            <input v-model="newMessage" type="text" class="message-input" placeholder="Type your message here">
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
    computed: {

        ...mapState({

            userID: (state) => state.userID
        }),

    },
    methods: {
        async sendMessage() {
            const chatbotURL = 'http://localhost:5005/webhooks/rest/webhook';
            if (this.newMessage.trim() === '') return;

            this.messages.push(`You: ${this.newMessage}`);
            const message = {
                sender: this.userID,
                message: this.newMessage
            };
            const response = await axios.post(chatbotURL, message);
            console.log(response.data[0].text)
            // Push user and bot messages into separate arrays

            this.messages.push(`bot: ${response.data[0].text}`);

            console.log(this.messages)
            this.newMessage = '';
            // Simulate a response from an assistant after a delay

        },

    }
}
</script>

<style scoped>
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

.message {
    margin-bottom: 10px;
    font-size: 14px;
    background-color: #333;
    color: white;
}
</style>