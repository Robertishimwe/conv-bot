import Command from '../model/commands.js'
import {deleteCommand, createCommand, findComand} from '../services/commandService.js'

class commandControllers {

    
    static createCommand = async (req, res) => {

        const {command, value} = req.body;
        const response = await createCommand(command.toLowerCase(),value)
        console.log(response)
        return res.status(200).send(response)


    }

    static findAllCommand = async (req, res) =>{

        const response = await findComand()
        console.log(response)
        return res.status(200).send(response)

    }

    static findCommand =  async (req, res) => {
    const { command } = req.params
    const response = await findComand({command: command})
    return res.status(200).send(response)

    }
}

export default commandControllers;