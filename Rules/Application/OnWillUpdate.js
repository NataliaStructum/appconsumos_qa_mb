/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OnWillUpdate(clientAPI) {

    return clientAPI.executeAction('/appconsumos_qa_mb/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            let _app_consumos_qa = clientAPI.executeAction('/appconsumos_qa_mb/Actions/ZBODEGA_AGO_SRV/Service/CloseOffline.action');
            let ZBODEGA_AGO_SRV = clientAPI.executeAction('/appconsumos_qa_mb/Actions/ZBODEGA_AGO_SRV/Service/CloseOffline.action');
            return Promise.all([_app_consumos_qa, ZBODEGA_AGO_SRV]).then(() => {
                Promise.resolve();
            }).catch((err) => {
                Promise.reject('Error al cerrar Odatas sin conexión ' + err.message);
            });
        } else {
            return Promise.reject('User Deferred');
        }
    });


}





