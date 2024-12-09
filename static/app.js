class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector(".chatbox__button"),
            chatBox: document.querySelector(".chatbox__support"),
            sendButton: document.querySelector(".send__button"),
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        // Toggle chatbox visibility
        openButton.addEventListener("click", () => this.toggleState(chatBox));

        // Handle send button click
        sendButton.addEventListener("click", () => this.onsendButton(chatBox));

        // Handle "Enter" key in the input field
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onsendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // Show or hide the box based on the state
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onsendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        let text1 = textField.value;

        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };

        // Append user message
        this.messages.push(msg1);

        // Send user message to Flask for prediction
        fetch($SCRIPT_ROOT + "/predict", {
            method: "POST",
            body: JSON.stringify({ message: text1 }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                let msg2 = { name: "Glo", message: response.answer };
                // Append bot response
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = ''; // Clear the input field
            })
            .catch((error) => {
                console.error("Error:", error);
                this.updateChatText(chatbox);
                textField.value = ''; // Clear the input field
            });
    }

    updateChatText(chatbox) {
        let html = ""; // Declare HTML variable

        // Append messages in reverse order
        this.messages.slice().reverse().forEach((item) => {
            if (item.name === "Glo") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

// Initialize Chatbox
const chatbox = new Chatbox();
chatbox.display();