/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Autorizar_Solicitud_Abast(context) {

    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitud_Reabastecimieto').getClientData();
    const signatureObject = context.evaluateTargetPath("#Page:Autorizar_Solicitud_Reabastecimiento/#Control:FormCellInlineSignatureCapture0/#Value");
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
