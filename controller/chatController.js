import { findComand } from "../services/commandService.js";
import { createChatCompletion } from "../services/openai.js";
import { createConversation, findConversation } from "../services/conversationService.js"

class chatControllers {
  // chat controller
  static chat = async (req, res) => {
    try {
      const text = req.body.prompt;

      await createConversation("user", text)

      const commandsArray = await findComand(); // use a more descriptive variable name
      // console.Console("chathistory",findConversation())
      // console.log("before extract", commandsArray);
      // res.send(commandsArray)

      const extractCommands = (wordsArray) => {
        if (!Array.isArray(wordsArray)) {
          throw new Error("wordsArray is not an array");
        }
        const extractedCommands = wordsArray.map((obj) => obj.command);
        // console.log("after extract", extractedCommands);
        return extractedCommands; // add a return statement to return the extracted commands
      };

      const findMatchingWord = (text, extractCommands) => {
        const words = text.split(" "); // split text into individual words
        for (let i = 0; i < words.length; i++) {
          if (extractCommands.includes(words[i])) {
            // console.log({ "matching words": words[i] });
            return words[i]; // return the matching word
          }
        }
        // console.log(false);
        return false; // return false if no match is found
      };

      if (findMatchingWord(text, extractCommands(commandsArray?.data))) {
        const myServeResponse = await findComand({
          command: findMatchingWord(text, extractCommands(commandsArray?.data)),
        });
        const response = await createChatCompletion(text);
        const saveData = await createConversation("bot", response)
        return res.status(200).send({
          dbres: myServeResponse.data[0].value,
          saved: saveData,
          bot: `You might be looking for this ${myServeResponse.data[0].value}
     -- 
    ${response}`,
        });
      } else {
        const response = await createChatCompletion(text);
        const saveData = await createConversation("bot", response)
        return res.status(200).send({ bot: response,saved: saveData, });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error || "Something went wrong");
    }
  };
}

export default chatControllers;
