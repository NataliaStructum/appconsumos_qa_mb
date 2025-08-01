/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function get_Cantidad_Disponible_Aceite(context) {
    try {
        var object = context.binding;
        var solicitada = parseFloat(object.Bdmng) || 0;
        var tomada = parseFloat(object.Enmng) || 0;
        var unidad = object.Erfme || "";
    
        let disponible = solicitada - tomada;
    
        if (disponible > 0) {
            return `Disponible: ${disponible} ${unidad}`;
        } else {
            return "No hay cantidad disponible";
        }

    } catch (error) {
        alert("No se pudo obtener el valor: " + error.message);
    }
}
