/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SyncRevisarIngenio(context) {
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/ClosePage.action",
        "Properties": {
            "NavigateBackToPage": "Lista_Solicitudes_Ingenio"
        }
    }).then(() => {
        return context.executeAction("/appconsumos_qa_mb/Actions/app_consumos_qa/Service/OnlySyncStartedMessage.action")

    });
}
