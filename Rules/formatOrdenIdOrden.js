/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function formatOrdenIdOrden(context) {
    let valor = context.binding.orden;
    let limpio = valor.replace(/^0+/, '');

    return `Orden: ${limpio}`;
}
