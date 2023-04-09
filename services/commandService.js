// import Command from '../model/commands.js'

// const createCommand = ({command, value}) => {

//   const newCommand = new Command({ command, value});

//   newCommand.save((err, savedCommand) => {
//     if (err) {
//         return {error: true, err}
//     } else {

//         console.log('Command saved successfully:', savedCommand);
//        return {error: false, data: savedCommand}
      
//     }
//   });

// }

// import Command from '../model/commands.js';

// const createCommand = ({ command, value }) => {
//   const newCommand = new Command({ command, value });

//   return new Promise((resolve, reject) => {
//     newCommand.save((err, savedCommand) => {
//       if (err) {
//         reject({ error: true, err });
//       } else {
//         console.log('Command saved successfully:', savedCommand);
//         resolve({ error: false, data: savedCommand });
//       }
//     });
//   });
// };

// const deleteCommand = (commandId) => {
//   return new Promise((resolve, reject) => {
//     Command.findByIdAndDelete(commandId, (err, deletedCommand) => {
//       if (err) {
//         reject({ error: true, err });
//       } else if (!deletedCommand) {
//         reject({ error: true, message: "Command not found" });
//       } else {
//         console.log('Command deleted successfully:', deletedCommand);
//         resolve({ error: false, data: deletedCommand });
//       }
//     });
//   });
// };

// export { deleteCommand, createCommand }

import Command from '../model/commands.js';

const createCommand = async (command, value) => {
  console.log({ command, value })
  const newCommand = new Command({ command, value });

  try {
    const savedCommand = await newCommand.save();
    console.log('Command saved successfully:', savedCommand);
    return { error: false, data: savedCommand };
  } catch (err) {
    return { error: true, err };
  }
};

const deleteCommand = async (commandId) => {
  try {
    const deletedCommand = await Command.findByIdAndDelete(commandId);
    if (!deletedCommand) {
      return { error: true, message: "Command not found" };
    }
    console.log('Command deleted successfully:', deletedCommand);
    return { error: false, data: deletedCommand };
  } catch (err) {
    return { error: true, err };
  }
};

const findComand = async (query) =>{

  try {
    const CommandListe = await Command.find(query);
    if (!CommandListe) {
      return { error: true, message: "No Command found" };
    }
    return { error: false, data: CommandListe };

    
  } catch (error) {
    return { error: true, error };

  }

}

export { deleteCommand, createCommand, findComand };
