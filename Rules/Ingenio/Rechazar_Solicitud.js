/**
 * @param {IClientAPI} context
 */
export default function Rechazar_Solicitud(context) {
    let id_solicitud = context.binding?.id;

    if (!id_solicitud) {
        alert("No se pudo obtener el ID de la solicitud para actualizar.");
        return Promise.resolve();
    }

    alert(`Actualizando solicitud ID: ${id_solicitud} a estado 'Rechazado'`);
/* return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/oData/Update_SolicitudApp.action",
        "Properties": {
            "Target": {
                "ReadLink": context.binding["@odata.readLink"]
            },
            "Properties": {
                "estado": "Rechazado"
            }
        }
    })
        .then(() => {
            alert("Solicitud actualizada a 'Rechazado' correctamente.");

            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/CloseModalPage_Complete.action",
                "Properties": {
                    "NavigateBackToPage": "/appconsumos_qa_mb/Pages/Ingenio/Detalle_Solicitudes_Ingenio.page"
                }
            });
        })
        .then(() => {
            alert("Modal cerrado y navegación completada.");
        })
        .catch((error) => {
            alert(`Error al actualizar solicitud: ${error.message || 'Error desconocido'}`);
        });*/
    
}