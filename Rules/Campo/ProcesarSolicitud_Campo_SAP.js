/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ProcesarSolicitud_Campo_SAP(context) {
    //1. Enviar los componentes a la orden - hay que validar si ya hay creados materiales con las cantidades solicitadas usar esos campos y no hay que crearlos 
    //   - se debe guardar en los componentes de la solicitud las posiciones en la reserva de los materiales creados o escogidos
    //2. liquidar los componentes de la orden - se debe guardar el numero de documento de material en cada componente y se debe mostrar en el detalle de los items de la solicitud
    let clientData_user = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let info_user = clientData_user.info_user;
    let info_solicitud = context.binding;
    let orden = info_solicitud.orden;
    let id_solicitud = info_solicitud.id;
    let reserva = info_solicitud.reserva;
    let centro = info_solicitud.alm_centro;
    let alm_desc = info_solicitud.alm_desc;
    let pass = context.evaluateTargetPath("#Page:Autorizar_Solicitud_Campo/#Control:pass/#Value");

    let exitosos = [];
    let errores = [];
    let liquidar = [];
    let update = [];
    let filtro = `$expand=material,almacen&$filter=solicitud_id eq ${id_solicitud}`;
    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ComponentesSolicitud', [], filtro).then((results) => {
        if (!results || results.length === 0) {
            alert("No se encontraron componentes para la solicitud");
            return;
        }

        // Crear las promesas para cada componente
        const promesasAddMat = results.map((e) => {
            //alert(e.material_material.replace(/^0+/, ''))
            const data = {
                ReservNo: reserva.replace(/^0+/, ''),
                Material: e.material_material.replace(/^0+/, ''),
                Plant: centro,
                Activity: e.op_number,
                GrRcpt: alm_desc,
                RequirementQuantity: `${e.cantidad_aprobada}`,
                //RequirementQuantityUnit: e.material.und,
                RequirementQuantityUnit: "PZA"
            };

            //Consultar si el material ya existe en alguna posicion de la reserva y tiene disponibilidad para tomar las cantidades de ahí
            let filtro2 = `$filter=reserva eq '${reserva}' and orden eq '${orden}' and material eq '${e.material_material}' and operacion eq '${e.op_number}'`;
            return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'DetalleReserva', [], filtro2).then((results) => {
                if (results && results.length > 0) {
                    let disponibles = results.filter(obj => {
                        return (obj.cant_solicitada - obj.cant_tomada) >= e.cantidad_aprobada;
                    });

                    liquidar.push({
                        Material: e.material_material.replace(/^0+/, ''),
                        MOVE_TYPE: "261",
                        Plant: e.almacen.centro,
                        StgeLoc: e.almacen.almacen,
                        EntryQnt: `${e.cantidad_aprobada}`,
                        EntryUom: "PZA",
                        RES_ITEM: disponibles.getItem(0).posicion,
                        RESERV_NO: reserva
                    })
                    update.push({
                        idComponente: e.id,
                        posicion: disponibles.getItem(0).posicion,
                        doc_material: null
                    })
                } else {
                    //alert("No hay materiales en la orden con esas especificaciones se va a crear los componentes en la reserva");
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/Call_AddMaterialesRes.action",
                        "Properties": {
                            "OnFailure": "",
                            "OnSuccess": "",
                            "Target": {
                                "Service": "/appconsumos_qa_mb/Services/backend_REST.service",
                                "Path": "/AddMaterialRes",
                                "RequestProperties": {
                                    "Method": "POST",
                                    "Body": {
                                        "username": info_user.sapUsr,
                                        "password": "Abaper072025",
                                        "data": data
                                    }
                                }
                            }
                        }
                    }).then((res) => {

                        let resjson = res.data
                        let success = resjson.success
                        let item = resjson.item
                        if (success) {
                            exitosos.push(`${e.material.material_desc}`);
                            liquidar.push({
                                Material: e.material_material.replace(/^0+/, ''),
                                MOVE_TYPE: "261",
                                Plant: e.almacen.centro,
                                StgeLoc: e.almacen.almacen,
                                EntryQnt: `${e.cantidad_aprobada}`,
                                EntryUom: "PZA",
                                RES_ITEM: item,
                                RESERV_NO: reserva
                            })
                            update.push({
                                idComponente: e.id,
                                posicion: item,
                                doc_material: null
                            })
                        } else {
                            errores.push(`${e.material.material_desc}: ${resjson.message}`);
                        }


                    }).catch((error) => {
                        alert(error)
                        errores.push(`${e.material.material_desc}: ${error?.message || error}`);
                    });

                }

            }).catch((error) => {
                alert(`Error ${error.message}`);
            });



        });

        // Ejecutar todas las promesas
        return Promise.allSettled(promesasAddMat).then(() => {
            let mensaje = "";

            if (errores.length === 0) {
                mensaje = 'Solicitud gestionada correctamente. Los materiales fueron añadidos a la reserva.';
            } else if (exitosos.length === 0) {
                mensaje = `Solicitud no gestionada. Fallaron todos los materiales:\n\n${errores.join('\n')}`;
            } else {
                mensaje = `Solicitud parcialmente gestionada.\n\nErrores:\n${errores.join('\n')}`;
            }

            //alert(JSON.stringify(liquidar))
            //alert(JSON.stringify(update))

            // Segunda fase: liquidar
            let exitososLiq = [];
            let erroresLiq = [];
            const promesasLiquidar = liquidar.map((item) => {
                alert(JSON.stringify(item))
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/Call_LiquidarMaterialRes.action",
                    "Properties": {
                        "OnFailure": "",
                        "OnSuccess": "",
                        "Target": {
                            "Service": "/appconsumos_qa_mb/Services/backend_REST.service",
                            "Path": "/LiquidarMaterialRes",
                            "RequestProperties": {
                                "Method": "POST",
                                "Body": {
                                    "username": info_user.sapUsr,
                                    "password": "Abaper072025",
                                    "data": item
                                }
                            }
                        }
                    }
                }).then((res) => {

                    alert(JSON.stringify(res))
                    let resjson = res.data
                    let success = resjson.success
                    let doc_material = resjson.doc_material
                    if (success) {
                        exitososLiq.push(`${item.Material}`);
                        /*update.push({
                            idComponente: e.id,
                            posicion: item,
                            doc_material: null
                        })*/
                        update.forEach(u => {
                            if (u.posicion === item.RES_ITEM) {
                                u.doc_material = doc_material;
                            }
                        });
                    } else {
                        erroresLiq.push(`${item.Material}: ${resjson.message}`);
                    }
                }).catch((err) => {
                    erroresLiq.push(`Error al liquidar material ${item.Material}: ${err.message || err}`);
                });
            });

            return Promise.allSettled(promesasLiquidar).then(() => {
                let mensajeFinal = '';
                if (erroresLiq.length > 0) {
                    mensajeFinal = `Liquidación completada con errores:\n${erroresLiq.join('\n')}`;
                } else {
                    mensajeFinal = 'Todos los materiales fueron liquidados correctamente en SAP.';
                }

                alert(JSON.stringify(update))
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Resultado de la operación",
                        "Message": mensaje
                    }
                }).then(() => {
                    return context.executeAction({
                        "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        "Properties": {

                            "Title": "Resultado de la liquidación",
                            "Message": mensajeFinal
                        }
                    }).then(() => {

                    });
                });
            });
        });




    }).catch((error) => {
        alert(`Error general: ${error.message || JSON.stringify(error)}`);
    });



}