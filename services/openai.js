import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import { findConversation } from "../services/conversationService.js"

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)


// function formatConversationHistory(history) {
//   let result = "";
//   for (let i = 0; i < history.length; i++) {
//     const message = history[i];
//     result += `${message.user}: ${message.message}\n`;
//   }
//   return result;
// }


function formatConversationHistory(conversationHistory) {
  let formattedHistory = '';
  for (let i = 0; i < conversationHistory.length; i++) {
    const message = conversationHistory[i];
    const timestamp = message.CreatedDate.toISOString();
    formattedHistory += `[${timestamp}] ${message.user}: ${message.message}\n`;
  }
  return formattedHistory;
}





const createChatCompletion = async (prompt) => {
  const unformated = await findConversation()
  const conversationHistory = formatConversationHistory(unformated.data)
  console.log(conversationHistory)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "your name is bot, you have to answer all asked questions politely with a sanse of humour"},
      {role: "user", content: `Your name is Bot. Follow this conversation: ${conversationHistory} and answer the messages from the user as a bot. Ask questions, have fun, suggest topics, and be friendly. Message from user: ${prompt}.`},
      // {role: "user", content: `${prompt}`}
      //{role: "system", content: "your name is ishimwe"}
    ], 
  })

  return response.data.choices[0].message.content
}

export { createChatCompletion }
