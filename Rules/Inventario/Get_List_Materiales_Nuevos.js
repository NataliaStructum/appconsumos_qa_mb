/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Get_List_Materiales_Nuevos(context) {
    let clientDataFiltro = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Solicitud_Abast').getClientData();
    let materiales = clientDataFiltro.materiales_nuevos

    const resultado = materiales.map(item => ({
        ObjectCell: {
            Title: item.Matnr,
            Subhead: item.Txtmd,
            PreserveIconStackSpacing: true,
            Visible: true
        },
        ReturnValue: item.Matnr
    }));

    return resultado
}
