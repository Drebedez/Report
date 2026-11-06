import ScriptConfig from './config.json' with {type:'json'};

class ReportFormLogBuilder {

    /**
     * @typedef {Object} userData
     * @property {string} id Id de usuario en discord.
     * @property {string} name Nombre de usuario en discord.
     */
    /**@type {userData} */
    user = {};
    
    /**
     * @typedef {Object} guildData
     * @property {string|null} id Id de usuario en discord.
     * @property {string|null} name Nombre de usuario en discord.
     */
    /**@type {guildData} */
    guild = {};
    
    /**@type {Temporal.PlainDateTime} */
    date;
    
    /**
     * @typedef {Object} formData
     * @property {string} title Titulo de el reporte.
     * @property {any} category Categoria de el reporte.
     * @property {string} message Mensaje que detalla el asunto de el reporte.
     * @property {Map} files Archivos de reportes subidos.
     */
    /**@type {formData} */
    reportForm = {};

    /**
     * @param {import('discord.js').Interaction} interaction 
     */
    constructor(interaction){
        this.user.id = interaction.user.id;
        this.user.name = interaction.user.globalName;

        this.guild.id = interaction.guild?.id;
        this.guild.name = interaction.guild?.name;
    
        this.date = Temporal.Now.plainDateTimeISO();

        this.reportForm.title = interaction.fields.getTextInputValue(ScriptConfig.reportForm.inputTitle.id);
        this.reportForm.category = interaction.fields.getStringSelectValues(ScriptConfig.reportForm.menuStringOption.id);
        this.reportForm.message = interaction.fields.getTextInputValue(ScriptConfig.reportForm.inputForm.id);
        this.reportForm.files = interaction.fields.getUploadedFiles(ScriptConfig.reportForm.fileUpload.id);
    }

}

export {ReportFormLogBuilder}