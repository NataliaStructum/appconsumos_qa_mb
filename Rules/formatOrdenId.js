/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function formatOrdenId(context) {
    let valor = context.binding.orden;
    let limpio = valor.replace(/^0+/, '');

    return limpio;

}
