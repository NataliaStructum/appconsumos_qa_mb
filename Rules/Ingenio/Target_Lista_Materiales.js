/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Target_Lista_Materiales(context) {
    let target = context.evaluateTargetPath("#Page:Detalle_Orden_Ingenio/#ClientData/#Property:lista_materiales");

    let searchString = context.searchString;

    if (searchString) {
        let searchResult = target.filter(prod => { 
            return prod.Matnr.includes(searchString) || 
                   prod.Txtmd.includes(searchString)
        });
        target = searchResult;
    }
    return target;
}
