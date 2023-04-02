import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const createChatCompletion = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "user", content: `${prompt}`}
      //{role: "system", content: "your name is ishimwe"}
    ], 
  })

  return response.data.choices[0].message.content
}

export { createChatCompletion }
