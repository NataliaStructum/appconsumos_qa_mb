/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function set_VisibleBtnAutorizar_Motor(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let info = clientData.info_user;

    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData()
    let info_solicitud = clientDataFiltro.data_planilla_motor;
    let id_solicitud = info_solicitud.id;
    let estado = info_solicitud.estado
    let filtro = `$filter=planilla_id eq ${id_solicitud} and doc_material eq null`;

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ItemPlanillasAceites', [], filtro).then(async (results) => {
        if(results && results.length > 0){
            if (estado === 'Aprobada' && (info.rol === 'Autorizador' || info.rol === 'Auxiliar')){
                return true
            }
        }
        return false
    }) 
}
