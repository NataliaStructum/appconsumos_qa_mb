/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function getMaterialDesc_Confirmar_Abast(context) {
    var binding = context.binding
    let valor = [binding.material.material_desc, binding.mat_nuevo_desc]
        .find(v => typeof v === 'string' && v.trim() !== '');

    return valor;
}
