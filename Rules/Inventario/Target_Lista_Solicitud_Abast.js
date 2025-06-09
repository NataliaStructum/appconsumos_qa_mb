/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Target_Lista_Solicitud_Abast(context) {
    //let clientData = context.evaluateTargetPathForAPI('#Page:Lista_Solicitudes_Reabastecimiento').getClientData();
     //   clientData.lista_abast = []
    let target = context.evaluateTargetPath("#Page:Inicio_Inventario/#ClientData/#Property:lista_abast");

    let searchString = context.searchString;

    if (searchString) {
        let searchResult = target.filter(prod => {
            return prod.fecha_creacion.includes(searchString) ||
                prod.operario_ficha.includes(searchString) ||
                prod.observaciones_tec.includes(searchString) ||
                prod.almacen_sociedad.includes(searchString) ||
                prod.almacen_centro.includes(searchString) ||
                prod.estado.includes(searchString)
        });
        target = searchResult;
    }
    /*

  */
    return target;
}
