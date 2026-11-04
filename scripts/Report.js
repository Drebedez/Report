import ScriptConfig from './config.json' with { type: 'json'};
import { 
    ButtonStyle,
    ButtonBuilder,
    Events,
    Client
} from 'discord.js';

import { ReportForm } from './ReportForm.js';

class Report {

    static #clientSet = false;
    static #reportFormHandlers = [];

    /**
     * Manejar interacciones de el systema de reportes.
     * @param {import('discord.js').Interaction} interaction 
     */
    static #ReportInteractionHandler(interaction){
        if(interaction.isButton()){
            if(interaction.customId == ScriptConfig.ButtonReportID){
                interaction.showModal(ReportForm.getDiscordReportForm());
            }
        }
        if(interaction.isModalSubmit()){
            if(interaction.customId == ScriptConfig.FormReportSystemID){
                for(const handlers of this.#reportFormHandlers)
                    handlers();
            }
        }
    }

    /**
     * Menajer envios de formularios de reporte.
     * @param {()=>reportFormLogBuilder} callback 
     */
    static setFormReportHandler(callback){
        if(typeof callback != 'function')
            throw Error(ScriptConfig.Error.NOT_GETTED_FUNCTION);
        this.#reportFormHandlers.push(callback);
    }

    /**
     * Entregar el cliente instanciado de la aplicacion para establecer el handler
     * de interaccion de el sistema de reportes.
     * @param {import('discord.js').Client} client 
     */
    static setClient(client){

        if(this.#clientSet)
            throw Error(ScriptConfig.Error.CLIENT_SETED);

        if(!(client instanceof Client))
            throw Error(ScriptConfig.Error.NOT_INSTANCED_CLIENT);

        client.on(Events.InteractionCreate, this.#ReportInteractionHandler);

        this.#clientSet = true;
    }

    /**
     * Obtener boton que tiene un evento el cual permite a los usuarios reportar.
     * @param {string} label - Frase que describa lo que se esta reportando. 
     * @returns {ButtonBuilder} Boton de discord.
     */
    static getButton(label){
        if(typeof label != 'string')
            throw Error(ScriptConfig.Error.NOT_GETTED_STRING);

        return  new ButtonBuilder()
                .setCustomId(ScriptConfig.ButtonReportID)
                .setLabel(`Reportar: ${label}`)
                .setEmoji(ScriptConfig.Representations.emoji)
                .setStyle(ButtonStyle.Danger);
    }

}

export { Report }