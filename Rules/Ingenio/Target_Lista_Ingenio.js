/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Target_Lista_Ingenio(context) {
    let target = context.evaluateTargetPath("#Page:Filtro_Ingenio/#ClientData/#Property:lista_ingenio");

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
