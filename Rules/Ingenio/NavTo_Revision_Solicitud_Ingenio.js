/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function NavTo_Revision_Solicitud_Ingenio(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Ingenio').getClientData();
    clientData.lista_mat_solicitud_ing = []

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Ingenio/Revision_Solicitud_Ingenio.page",
            "ModalPage": true,
            "ModalPageFullscreen": true
        }
    });
}
