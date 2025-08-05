/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_Info_Usuario(context) {
    let email = context.evaluateTargetPath('#Application/#AppData/UserId').toUpperCase();
    let clientData = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    clientData.info_user = {}

    //Syncroniza el servicio de datos del ERP
    //context.executeAction( "/appconsumos_qa_mb/Actions/ZBODEGA_AGO_SRV/Service/UploadOffline.action");

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'EmpleadosApp', [], `$filter=correo eq '${email}'`).then(async (results) => {
        if (results && results.length > 0) {
            //alert(JSON.stringify(results.getItem(0)))
            clientData.info_user = results.getItem(0)
        } 
    }).catch((error) => {
        alert(`Error info usuario sincroniza ${error.message}`)
        //return context.executeAction( "/appconsumos_qa_mb/Actions/app_consumos_qa/Service/UploadOffline.action");
        
    });

}
