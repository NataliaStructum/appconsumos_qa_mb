/**
 * Describe this function...
 * @param {IClientAPI}  context
 */
export default function OnlySync(context) {

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/ClosePage.action",
        "Properties": {
            "NavigateBackToPage": "Lista_Solicitudes_Campo"
        }
    }).then(() => {
        return context.executeAction("/appconsumos_qa_mb/Actions/app_consumos_qa/Service/OnlySyncStartedMessage.action")

    });

}
