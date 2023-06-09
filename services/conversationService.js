import Conversation from '../model/conversation.js';

const createConversation = async (user, message, room) => {
  console.log({ user, message, room })
  const newConversation = new Conversation({ user, message, room });

  try {
    const savedConversation = await newConversation.save();
    console.log('message saved successfully:', savedConversation);
    return { error: false, data: savedConversation };
  } catch (err) {
    return { error: true, err };
  }
};



const findConversation = async (query) =>{

  try {
    const ConversationListe = await Conversation.find(query);
    if (!ConversationListe) {
      return { error: true, message: "No Conversation found" };
    }
    return { error: false, data: ConversationListe };

    
  } catch (error) {
    return { error: true, err };

  }

}

export { findConversation, createConversation };
