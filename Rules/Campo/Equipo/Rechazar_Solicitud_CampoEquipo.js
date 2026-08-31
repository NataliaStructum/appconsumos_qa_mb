/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Rechazar_Solicitud_CampoEquipo(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Campo').getClientData();
    clientData.id_de_solicitud = context.binding.id;

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
        "Properties": {
            "Title": "Confirmación",
            "Message": "¿Estás seguro de que deseas rechazar la solicitud?",
            "OKCaption": "Aceptar",
            "OnOK": "/appconsumos_qa_mb/Actions/oData/Equipo/Update_SolicitudesApp_Rechazar_CampoEquipo.action",
            "CancelCaption": "Cancelar"
        }
    })

}
