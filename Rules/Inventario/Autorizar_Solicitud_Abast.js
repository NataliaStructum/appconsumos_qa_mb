/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Autorizar_Solicitud_Abast(context) {

    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitud_Reabastecimieto').getClientData();
    const signatureObject = context.evaluateTargetPath("#Page:Autorizar_Solicitud_Reabastecimiento/#Control:FormCellInlineSignatureCapture0/#Value");
    const correo_enviar = context.evaluateTargetPath("#Page:Autorizar_Solicitud_Reabastecimiento/#Control:correo_enviar/#Value");
    clientData.b64Data = ""
    if (!signatureObject) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Pendiente por firmar",
                "Message": "La firma es requerida antes de continuar"
            }
        });
    }

    if (!correo_enviar || correo_enviar.trim() === '') {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Correo Requerido",
                "Message": "Falta ingresar el correo. Verifícalo y vuelve a intentarlo."
            }
        });
    }
    
    // Validación de formato de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo_enviar)) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Correo Inválido",
                "Message": "El correo ingresado no es válido. Verifícalo e inténtalo de nuevo."
            }
        });
    }

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
        "Properties": {
            "Message": "¿Estas seguro que deseas autorizar la solicitud de abastecimiento?",
            "Title": "Autorizar Solicitud",
            "OKCaption": "Aceptar",
            "OnOK": "/appconsumos_qa_mb/Actions/oData/Update_SolicitudesApp_Autorizar_Abast.action",
            "CancelCaption": "Cancelar"
        }
    });


}
