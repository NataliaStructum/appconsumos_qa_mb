/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function formatOrdenId(context) {

    let page = context.getPageProxy();
    let titulo = page.getName();

    if (titulo == "Agregar_Solicitud_Campo" || titulo == "Detalle_Solicitudes_Campo") {
        let valor = context.binding.orden;
        let limpio = valor.replace(/^0+/, '');

        return `Orden: ${limpio}`;
    }

    if (titulo == "Detalle_Orden_Campo" || titulo == "Lista_Ordenes_Campo" || titulo == "Lista_Solicitudes_Campo" || titulo == "Detalle_Solicitudes_Campo") {
        let valor = context.binding.orden;
        let limpio = valor.replace(/^0+/, '');

        return limpio;

    }




}
