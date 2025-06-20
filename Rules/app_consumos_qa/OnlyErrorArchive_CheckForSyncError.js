import get_SolicitudesOrdenesAbiertas from '../Campo/get_SolicitudesOrdenesAbiertas';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function OnlyCheckForSyncError(context) {
    let proxy = context.getPageProxy()
    let caption = proxy.getName()
    //Lista_Solicitudes_Campo
    
    context.count('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/appconsumos_qa_mb/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
                return Promise.reject(false);
            });
        } else {
            if(caption == "Lista_Solicitudes_Campo"){
                return get_SolicitudesOrdenesAbiertas(context)  
            }      
            
            if(caption == "Lista_Solicitudes_Ingenio"){
                
            }

        }
    });
}