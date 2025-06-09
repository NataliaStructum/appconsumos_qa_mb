/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_List_Abastecimiento(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Inicio_Inventario').getClientData();
    clientData.lista_abast = []

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
        "Properties": {
            "PageToOpen": "/appconsumos_qa_mb/Pages/Inventario/Lista_Solicitudes_Reabastecimiento.page"
        }
    });
}
