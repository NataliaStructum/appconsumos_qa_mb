/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_Agregar_Solicitud_Reabastecimiento(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Lista_Solicitudes_Reabastecimiento').getClientData();
    clientData.lista_materiales = []
 
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Inventario/Agregar_Solicitud_Reabastecimiento.page",
            "ModalPage": true,
            "ModalPageFullscreen": true
        }
    });
 
}
