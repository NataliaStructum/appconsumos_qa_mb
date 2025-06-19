/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function RechazarSolicitudCampo(context) {

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
        "Properties": {
            "Title": "Confirmación",
            "Message": "¿Estás seguro de que deseas rechazar la solicitud completa? Todos los materiales serán rechazados.",
            "OKCaption": "Aceptar",
            "OnOK": "",
            "CancelCaption": "Cancelar"
        }
    })

}
