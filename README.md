# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

To connect the chat, replace the example `WORKER_URL` at the top of
`script.js` with your deployed class Cloudflare Worker's URL. The frontend
sends a `messages` array and displays the reply from
`data.choices[0].message.content`. If the example URL is unchanged, the chat
will ask you to configure it before sending a request.

Do not add an OpenAI API key to this project. The Cloudflare Worker holds the
key and makes the request on the frontend's behalf.

Enjoy building your L’Oréal beauty assistant! 💄
