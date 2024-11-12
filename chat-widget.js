(function (w, d) {
  // Create widget styles
  const styles = `
        .chat-widget-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            z-index: 999999;
        }
        .chat-widget-header {
            padding: 16px;
            background: #075e54;
            color: white;
            border-radius: 12px 12px 0 0;
            cursor: pointer;
        }
        .chat-widget-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: #f0f2f5;
        }
        .chat-widget-message {
            max-width: 70%;
            padding: 8px 16px;
            border-radius: 16px;
            margin: 4px 0;
            word-wrap: break-word;
            font-size: 14px;
        }
        .chat-widget-message.received {
            background: white;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        .chat-widget-message.sent {
            background: #0084ff;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        .chat-widget-input {
            padding: 16px;
            background: white;
            border-radius: 0 0 12px 12px;
            display: flex;
            gap: 8px;
        }
        .chat-widget-input input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 24px;
            outline: none;
            font-size: 14px;
        }
        .chat-widget-input button {
            padding: 12px 24px;
            background: #0084ff;
            color: white;
            border: none;
            border-radius: 24px;
            cursor: pointer;
            font-size: 14px;
        }
        .chat-widget-timestamp {
            font-size: 12px;
            color: #65676b;
            margin-top: 4px;
            text-align: right;
        }
        .chat-widget-message.sent .chat-widget-timestamp {
            color: rgba(255, 255, 255, 0.7);
        }
    `;

  // Create and inject styles
  const styleSheet = d.createElement("style");
  styleSheet.textContent = styles;
  d.head.appendChild(styleSheet);

  // Create widget HTML
  const widgetHTML = `
        <div class="chat-widget-header">
            <h3>Chat Widget</h3>
        </div>
        <div class="chat-widget-messages" id="chatWidgetMessages">
            <div class="chat-widget-message received">
                Welcome! How can I help you today?
                <div class="chat-widget-timestamp">${new Date().toLocaleTimeString(
                  [],
                  { hour: "numeric", minute: "2-digit" }
                )}</div>
            </div>
        </div>
        <div class="chat-widget-input">
            <input type="text" id="chatWidgetInput" placeholder="Type a message...">
            <button id="chatWidgetSend">Send</button>
        </div>
    `;

  // Create widget container
  const widget = d.createElement("div");
  widget.className = "chat-widget-container";
  widget.innerHTML = widgetHTML;

  // Add widget to page
  d.body.appendChild(widget);

  // Get DOM elements
  const messageContainer = d.getElementById("chatWidgetMessages");
  const messageInput = d.getElementById("chatWidgetInput");
  const sendButton = d.getElementById("chatWidgetSend");

  // Add message function
  function addMessage(text, isSent) {
    const messageDiv = d.createElement("div");
    messageDiv.className = `chat-widget-message ${
      isSent ? "sent" : "received"
    }`;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    messageDiv.innerHTML = `
            ${text}
            <div class="chat-widget-timestamp">${timestamp}</div>
        `;

    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Send message function
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      addMessage(message, true);
      messageInput.value = "";

      // Simulate response
      setTimeout(() => {
        const responses = [
          "Thanks for your message!",
          "I got your message 😊",
          "Message received, thank you!",
          "Thanks for reaching out!",
          "Got it, thanks!",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, false);
      }, 1000);
    }
  }

  // Event listeners
  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
})(window, document);
