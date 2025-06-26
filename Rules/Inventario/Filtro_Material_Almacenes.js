/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Filtro_Material_Almacenes(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Almacen_Inventario').getClientData();
    let almacenesSeleccionados = clientData.almacen_inventario;

    if (almacenesSeleccionados && almacenesSeleccionados.length > 0) {
        // Tomar el centro desde el primer almacén
        let centro = almacenesSeleccionados[0].BindingObject.centro;

        // Iniciar filtro
        let filtro = `$filter=Werks eq '${centro}' and Spras eq 'ES' and contains(Txtmd, 'BORRADO') eq false and contains(Txtmd, 'BORRAR') eq false and contains(Txtmd, 'BORRAD_') eq false and (`;

        // Agregar cada almacén con OR
        almacenesSeleccionados.forEach(item => {
            filtro += `Lgort eq '${item.BindingObject.almacen}' or `;
        });

        // Quitar el último " or " y cerrar
        filtro = filtro.slice(0, -4) + `)&$orderby=Matnr`;

        // Puedes guardar este filtro en ClientData si lo deseas
        clientData.filtroMaterial = filtro;

        alert(filtro);
        return filtro;
        
    } else {
        alert("Error: No se seleccionaron almacenes.");
    }
}
