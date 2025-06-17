/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function NavTo_RevisionSolicitudCampo(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Campo').getClientData();
    clientData.lista_mat_solicitud_campo = []
    
 
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Campo/Revision_Solicitud_Campo.page",
            "ModalPage": true,
            "ModalPageFullscreen": true
        }
    });
}
