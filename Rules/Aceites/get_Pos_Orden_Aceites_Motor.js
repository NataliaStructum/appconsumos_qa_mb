/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_Pos_Orden_Aceites_Motor(context) {
    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Detalle_Aceite_Motor').getClientData();
    let materiales = clientDataFiltro.materiales_lista
    return materiales
}
