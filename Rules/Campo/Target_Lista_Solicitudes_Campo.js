/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Target_Lista_Solicitudes_Campo(context) {
    let target = context.evaluateTargetPath("#Page:Filtro_Campo/#ClientData/#Property:lista_sol_campo");

    let searchString = context.searchString;

    if (searchString) {
        let searchResult = target.filter(prod => { 
            return prod.orden.includes(searchString) || 
                   prod.or_desc.includes(searchString) ||
                   prod.or_centro_plan.includes(searchString) ||
                   prod.or_grupo_plan.includes(searchString) ||
                   prod.equipo_solicitud.includes(searchString) ||
                   prod.eq_desc_solicitud.includes(searchString) ||
                   prod.reserva.includes(searchString) ||
                   prod.alm_sociedad.includes(searchString)
        });
        target = searchResult;
    }
    return target;
}
