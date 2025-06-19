/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_Agregar_Solicitud_Ingenio(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Orden_Ingenio').getClientData();
    clientData.lista_materiales = []
    
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Ingenio/Agregar_Solicitud_Ingenio.page",
            "ModalPage": true,
            "ModalPageFullscreen": true
        }
    });

}
