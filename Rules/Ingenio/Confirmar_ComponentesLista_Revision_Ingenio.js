/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Confirmar_ComponentesLista_Revision_Ingenio(context) {
    const pageProxy = context.getPageProxy();
    var materiales = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell1")

    let id_solicitud = context.binding.id;
    //let filtro = `$expand=almacen&$filter=solicitud_id eq ${id_solicitud}`;
    let filtro = `$filter=solicitud_id eq ${id_solicitud}`;
    let materialesTotales = [];
    let exitosos = [];
    let errores = [];
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitudes_Ingenio').getClientData();
    let listaDeAgregados = clientData.lista_mat_solicitud_ing;


    if (materiales.getVisible()) {
        //validar que si se hayan agregado todos los materiales a la solicitud
        return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ComponentesSolicitud', [], filtro).then(async (results) => {
            if (results && results.length > 0) {
                let totalComponentes = results.length;

                if (listaDeAgregados.length == totalComponentes) {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        "Properties": {
                            "Title": "Confirmación",
                            "Message": "¿Estás seguro de que deseas confirmar la solicitud aprobada por ítems?",
                            "OKCaption": "Aceptar",
                            "OnOK": "",
                            "CancelCaption": "Cancelar"
                        }
                    })

                } else if (listaDeAgregados.length < totalComponentes) {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        "Properties": {
                            "Title": "Solicitud No Confirmada",
                            "Message": "No puedes confirmar la solicitud hasta que se hayan agregado todos los materiales."
                        }
                    })
                }


            } else {
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Error",
                        "Message": "Error al tratar de traer los componentes de la solicitud"
                    }
                })
            }

            /*
            let promises = materialesRechazados.map(material => {
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/oData/Update_ComponentesSolicitudApp.action",
                    "Properties": {
                        "Target": {
                            "ReadLink": material.readLink
                        },
                        "Properties": {
                            "id": material.id_componente,
                            "cantidad_aprobada": 0,
                            "aprobado": false,
                            "confirmacion_tec": false
                        }
                    }
                }).then(() => {
                    exitosos.push(`${material.material} - ${material.descripcion}`);
                }).catch((error) => {
                    alert(`Error updating material ${material.material}:`, error);
                    errores.push(`${material.material} - ${material.descripcion}`);
                });
            });
    
            // Procesar los resultados
            return Promise.allSettled(promises).then(() => {
                let mensaje = '';
    
                if (errores.length === 0) {
                    mensaje = 'Solicitud Rechazada correctamente. Todos los materiales de la solicitud fueron rechazados exitosamente.';
                } else if (exitosos.length === 0) {
                    mensaje = `Solicitud rechazada. Falló el rechazo de todos los materiales:\n${errores.join('\n')}`;
                } else {
                    mensaje = `Solicitud rechazada parcialmente. Algunos materiales fueron rechazados con éxito.\n\nErrores:\n${errores.join('\n')}`;
                }
    
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Resultado",
                        "Message": mensaje
                    }
                }).then(() => {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/CloseModalPage_Complete.action",
                        "NavigateBackToPage": "/appconsumos_qa_mb/Pages/Ingenio/Detalle_Solicitudes_Ingenio.page"
                    });
                });
            });
    
            
            */


        }).catch((error) => {
            alert(`Error ${error.message}`);
        });

    } else {

        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Confirmación",
                "Message": "¿Estás seguro de que deseas confirmar la solicitud con las cantidades originales solicitadas?",
                "OKCaption": "Aceptar",
                "OnOK": "",
                "CancelCaption": "Cancelar"
            }
        })

    }


}
