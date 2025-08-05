/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidarAutorizar_Aceites(context) {    
    const pass = context.evaluateTargetPath("#Page:Aprobar_Aceite_Motor/#Control:pass/#Value")


    if (!pass || pass == '') {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Contraseña Requerida",
                "Message": "Falta ingresar la contraseña. Verifícala y vuelve a intentarlo."
            }
        });
    }

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
        "Properties": {
            "Message": "¿Estás seguro de que deseas autorizar la planilla? Al autorizarla, generará el movimiento correspondiente en el ERP.",
            "Title": "Autorizar Solicitud",
            "OKCaption": "Aceptar",
            "OnOK": "/appconsumos_qa_mb/Rules/Aceites/LiquidarSolicitud_Motor_SAP.js",
            "CancelCaption": "Cancelar"
        }
    });
}
