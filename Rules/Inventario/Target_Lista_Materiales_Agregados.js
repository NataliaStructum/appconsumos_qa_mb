/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Target_Lista_Materiales_Agregados(context) {
    let target = context.evaluateTargetPath('#Page:Lista_Solicitudes_Reabastecimiento/#ClientData/#Property:lista_materiales');

    let searchString = context.searchString;

    if (searchString) {
        let searchResult = target.filter(prod => { 
            return prod.material.includes(searchString) || 
                   prod.material_desc.includes(searchString)
        });
        target = searchResult;
    }
    return target;
}
