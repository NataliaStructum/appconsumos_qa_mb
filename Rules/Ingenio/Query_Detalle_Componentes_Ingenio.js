/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Query_Detalle_Componentes_Ingenio(context) {
    let id_solicitud = context.binding.id

    let filtro = `$filter=solicitud_id eq ${id_solicitud}`

    return filtro
}
