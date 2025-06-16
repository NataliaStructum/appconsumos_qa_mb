/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Get_FilterRead_ZBIW_MARDT(context) {
    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();
    return clientDataFiltro.filtroMaterial
}
