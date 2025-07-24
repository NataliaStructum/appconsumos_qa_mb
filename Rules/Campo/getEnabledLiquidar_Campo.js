/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function getEnabledLiquidar_Campo(context) {

    let info_solicitud = context.binding;
    let id_solicitud = info_solicitud.id;
    let filtro = `$expand=material,almacen,material/und&$filter=solicitud_id eq ${id_solicitud} and posicion ne null and aprobado eq true and doc_material eq null`;

    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ComponentesSolicitud', [], filtro).then(async (results) => {
        if(results && results.length > 0){
            return true
        }
        return false
    })
}
