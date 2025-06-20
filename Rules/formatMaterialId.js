/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function formatMaterialId(context) {
    let valor = context.binding.material_material;
    let limpio = valor.replace(/^0+/, '');

    return limpio;

}
