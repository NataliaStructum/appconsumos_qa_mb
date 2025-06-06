/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Target_Lista_Campo(context) {

    let target = context.evaluateTargetPath("#Page:Filtro_Campo/#ClientData/#Property:lista_campo");

    let searchString = context.searchString;

    if (searchString) {
        let searchResult = target.filter(prod => { 
            return prod.orden.includes(searchString) || 
                   prod.orden_desc.includes(searchString) ||
                   prod.centro_plan.includes(searchString) ||
                   prod.grupo_plan.includes(searchString) ||
                   prod.equipo.includes(searchString) ||
                   prod.equipo_desc.includes(searchString) ||
                   prod.reserva.includes(searchString) ||
                   prod.sociedad.includes(searchString)
        });
        target = searchResult;
    }
    return target;
}
