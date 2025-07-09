/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Query_Confirmar_Componentes_Abast(context) {
    let id_solicitud = context.binding.id
    let filtro = `$expand=material,almacen&$filter=solicitud_id eq ${id_solicitud}`

    return filtro
}
