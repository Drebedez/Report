import ScriptConfig from './config.json' with {type:'json'};
import {
    ModalBuilder,
    LabelBuilder,
    TextInputBuilder,
    TextInputStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    FileUploadBuilder
 } from 'discord.js';

class ReportForm{
    
    /**
     * @typedef {Object} optionObject
     * @property {string} label - Etiqueta de la opción.
     * @property {string} description - Descripción corta de la opción.
     * @property {string} value - Valor de la opción.
     */

    /**
     * @type {optionObject[]}
     */
    static #reportOptions = [];

    /**
     * Obtener objeto de discord modal para el sistema de reportes.
     * @returns {ModalBuilder}
     */
    static getDiscordReportForm(){
        const form = new ModalBuilder()
            .setTitle(ScriptConfig.reportForm.title)
            .setCustomId(ScriptConfig.reportForm.id);

        const titleInput = new TextInputBuilder()
            .setCustomId(ScriptConfig.reportForm.inputTitle.id)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(ScriptConfig.reportForm.inputTitle.placeholder)
            .setRequired(true)

        const titleLabel = new LabelBuilder()
            .setLabel(ScriptConfig.reportForm.inputTitle.label)
            .setTextInputComponent(titleInput);

        form.addLabelComponents(titleLabel);

        if(this.#reportOptions.length){
            const typeReportMenuSelect = new StringSelectMenuBuilder()
                .setCustomId(ScriptConfig.reportForm.menuStringOption.id)
                .setPlaceholder(ScriptConfig.reportForm.menuStringOption.placeholder)
                .setRequired(true)
                .addOptions(
                    this.#reportOptions.map(x=>{

                        const option = new StringSelectMenuOptionBuilder()
                        .setLabel(x.label)
                        .setValue(x.value);

                        if(x.description)
                            option.setDescription(x.description);

                        return option; 
                    })
                )

            const menuOptionLabel = new LabelBuilder()
                .setLabel(ScriptConfig.reportForm.menuStringOption.label)
                .setStringSelectMenuComponent(typeReportMenuSelect)

            form.addLabelComponents(menuOptionLabel);
            
        }

        const formInput = new TextInputBuilder()
            .setCustomId(ScriptConfig.reportForm.inputForm.id)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder(ScriptConfig.reportForm.inputForm.placeholder)
            .setRequired(true)
        
        const formInputLabel = new LabelBuilder()
            .setLabel(ScriptConfig.reportForm.inputForm.label)
            .setTextInputComponent(formInput);

        form.addLabelComponents(formInputLabel);

        const fileUpload = new FileUploadBuilder()
            .setCustomId(ScriptConfig.reportForm.fileUpload.id)
            .setMaxValues(ScriptConfig.reportForm.fileUpload.maxFiles)
            .setRequired(false);

        const fileUploadLabel = new LabelBuilder()
            .setLabel(ScriptConfig.reportForm.fileUpload.label)
            .setDescription(ScriptConfig.reportForm.fileUpload.description)
            .setFileUploadComponent(fileUpload);

        form.addLabelComponents(fileUploadLabel);

        return form;
    }

    /**
     * Agregar tipos de reporte en opcines de la forma.
     * @param {...optionObject} options - Lista de opciones a agregar.
     */
    static addReportOption(...options) {
        for(const option of options){
            
            if(typeof option.label != 'string')
                throw Error(ScriptConfig.Error.NOT_GETTED_STRING);
            if(option.label.length < ScriptConfig.reportForm.menuStringOption.minCharts)
                throw Error(ScriptConfig.Error.MIN_CHAR_LENGTH);
            if(option.label.length > ScriptConfig.reportForm.menuStringOption.maxCharts)
                throw Error(ScriptConfig.Error.MAX_CHAR_LENGTH);

            if(typeof option.value != 'string')
                throw Error(ScriptConfig.Error.NOT_GETTED_STRING);
            if(option.value.length < ScriptConfig.reportForm.menuStringOption.minCharts)
                throw Error(ScriptConfig.Error.MIN_CHAR_LENGTH);
            if(option.value.length > ScriptConfig.reportForm.menuStringOption.maxCharts)
                throw Error(ScriptConfig.Error.MAX_CHAR_LENGTH);

            if(option.description !== undefined){
                if(typeof option.value != 'string')
                    throw Error(ScriptConfig.Error.NOT_GETTED_STRING);
                if(option.value.length < ScriptConfig.reportForm.menuStringOption.minCharts)
                    throw Error(ScriptConfig.Error.MIN_CHAR_LENGTH);
                if(option.value.length > ScriptConfig.reportForm.menuStringOption.maxCharts)
                    throw Error(ScriptConfig.Error.MAX_CHAR_LENGTH);
            }

            this.#reportOptions.push(option);

        }
    }
}

export {ReportForm}