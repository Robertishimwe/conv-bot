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

/////////////////date////////////////////

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const hour = now.getHours();
const minute = now.getMinutes();

const formattedDate = `${day}/${month}/${year}`;
const formattedTime = `${hour}:${minute}`;

const correntDateAndTime = `The current date is ${formattedDate} and the current time is ${formattedTime}.`;

////////////////date time///////////////



function formatConversationHistory(conversationHistory) {
  let formattedHistory = '';
  for (let i = 0; i < conversationHistory.length; i++) {
    const message = conversationHistory[i];
    const timestamp = message.CreatedDate.toISOString();
    formattedHistory += `${message.user}: ${message.message}\n`;
    // formattedHistory += `[${timestamp}] ${message.user}: ${message.message}\n`;
  }
  return formattedHistory;
}





const createChatCompletion = async (prompt, roomId) => {
  const unformated = await findConversation({room: roomId})
  const conversationHistory = formatConversationHistory(unformated.data)
  console.log(conversationHistory)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: `your name is Intellia, you have to answer all asked questions politely with a sanse of humour. create normal conversation. like a real person. ${correntDateAndTime}. be concise. show that you care. act as english Improver. when user says things which is not correct grammaticaly suggest how he shpould say it next time. help user to speak good english`},
      {role: "user", content: `Your name is Intellia. Follow this conversation: ${conversationHistory} and answer the messages from the user as a bot. Ask questions, have fun, suggest topics, and be friendly. sound like a teen..be concise. Message from user: ${prompt}.`},
      // {role: "user", content: `${prompt}`}
      //{role: "system", content: "your name is ishimwe"}
    ], 
  })

  return response.data.choices[0].message.content
}

export { createChatCompletion }
