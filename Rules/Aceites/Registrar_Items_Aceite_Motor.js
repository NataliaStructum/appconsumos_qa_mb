/**
 * Función para registrar items de aceite de motor en la planilla
 * @param {IClientAPI} context - Contexto de la aplicación MDK
 */
import guid from '../guid'

export default function Registrar_Items_Aceite_Motor(context) {
    try {
        // Obtener valores de los controles
        let equipo = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:equipo_motor/#Value');
        let tipo = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:tipo_motor/#Value');
        let kmh = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:kmh_motor/#Value');
        let operario_motor = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:operario_motor/#Value');
        let cont_inicial = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:cont_inicial_motor/#Value');
        let cont_final = context.evaluateTargetPath('#Page:Registrar_Aceite_Motor/#Control:con_final_motor/#Value');
        let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
        let id_planilla = clientData.data_planilla_motor.id;

        // Obtener controles del formulario
        const pageProxy = context.getPageProxy();
        const form_add = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0");
        const btn_agregar = pageProxy.getControl("SectionedTable0").getSection("SectionButtonTable0");

        // Conversión de datos
        let contadorIniNum = parseFloat(cont_inicial) || 0;
        let contadorFinNum = parseFloat(cont_final) || 0;
        let kilometrajeNum = parseFloat(kmh) || 0;
        let operario_motorString = String(operario_motor) || "";
        let equipoData = null;
        let tipoData = null;
        
        if (equipo && Array.isArray(equipo) && equipo.length > 0 && equipo[0] && equipo[0].BindingObject) {
            equipoData = equipo[0].BindingObject.equipo;
        }
        
        if (tipo && Array.isArray(tipo) && tipo.length > 0 && tipo[0]) {
            tipoData = tipo[0].DisplayValue;
        }


        // Validación de campos obligatorios
        if (!equipoData || !tipoData || !kilometrajeNum || !contadorFinNum) {
            return context.executeAction({
                Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                Properties: {
                    Title: "Error de validación",
                    Message: "Faltan campos obligatorios: " + 
                             (!equipoData ? "Equipo " : "") +
                             (!tipoData ? "Tipo " : "") +
                             (!kilometrajeNum ? "Kilometraje " : "") +
                             (!contadorFinNum ? "Contador Final " : ""),
                    CloseCaption: "Cerrar"
                }
            });
        }

        if (kilometrajeNum < 0 || contadorFinNum  < 0) {
            return context.executeAction({
                Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                Properties: {
                    Title: "Valor Incorrecto",
                    Message: "No se permiten números negativos en los campos de kilometraje ni contadores.",
                    CloseCaption: "Cerrar"
                }
            });
        }
        // Validar contador inicial
        if (contadorIniNum <= 0) {
            return context.executeAction({
                Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                Properties: {
                    Title: "Aceite No disponible",
                    Message: "El contador inicial es cero. No es posible registrar más consumos de aceite.",
                    CloseCaption: "Cerrar"
                }
            });
        }

        // Validar contadores
        if (contadorFinNum >= contadorIniNum) {
            return context.executeAction({
                Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                Properties: {
                    Title: "Error de validación",
                    Message: "El contador inicial debe ser mayor que el contador final",
                    CloseCaption: "Cerrar"
                }
            });
        }

        // Calcular consumo
        let consumo = parseFloat(((contadorIniNum - contadorFinNum) / 4).toFixed(2));
        kilometrajeNum = parseFloat(kilometrajeNum.toFixed(2));
        const filtro = `$filter=planilla_id eq ${id_planilla}`;

        // Validar operario
        return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'Empleados', [], `$filter=ficha eq '${operario_motor}'`)
            .then((results) => {
                if (!results || results.length === 0) {
                    return context.executeAction({
                        Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                        Properties: {
                            Title: "Ficha no Encontrada",
                            Message: "Número de ficha no encontrada. Debes ingresar un número de ficha válido para continuar",
                            CloseCaption: "Cerrar"
                        }
                    });
                }

                const nombre_op = results.getItem(0).nombre;

                // Buscar posición
                return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'ItemPlanillasAceites', [], filtro)
                    .then((items) => {
                        let nueva_pos = 1;
                        if (items && items.length > 0) {
                            const posiciones = items.map(item => parseInt(item.pos)).filter(p => !isNaN(p));
                            nueva_pos = Math.max(...posiciones) + 1;
                        }

                        const nuevoItem = {
                            id: guid(context),
                            pos: nueva_pos,
                            planilla_id: id_planilla,
                            equipo_equipo: equipoData,
                            tipo: tipoData,
                            kilometraje: kilometrajeNum,
                            consumo: consumo,
                            op_ficha: operario_motorString,
                            op_nombre: nombre_op,
                            contador_ini: contadorIniNum,
                            contador_fin: contadorFinNum,
                            observacion: ""
                        };

                        // Crear item
                        return context.executeAction({
                            Name: "/appconsumos_qa_mb/Actions/oData/Create_Items_Planillas_Aceites.action",
                            Properties: {
                                Properties: nuevoItem
                            }
                        }).then(() => {
                            // Mostrar mensaje de éxito
                            return context.executeAction({
                                Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                                Properties: {
                                    Title: "Éxito",
                                    Message:
                                        `Item creado exitosamente:\n` +
                                        `Equipo: ${equipoData}\n` +
                                        `Tipo: ${tipoData}\n` +
                                        `Kilometraje: ${kilometrajeNum}\n` +
                                        `Consumo: ${consumo}\n` +
                                        `Contador inicial: ${contadorIniNum}\n` +
                                        `Contador final: ${contadorFinNum}`,
                                    CloseCaption: "Cerrar"
                                }
                            }).then(() => {
                                // Ocultar formulario y mostrar botón de agregar
                                form_add.setVisible(false);
                                btn_agregar.setVisible(true);
                            });
                        });
                    });
            })
            .catch((error) => {
                return context.executeAction({
                    Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                    Properties: {
                        Title: "Error",
                        Message: `Error al crear el item: ${error.message || 'Error desconocido'}`,
                        CloseCaption: "Cerrar"
                    }
                });
            });

    } catch (error) {
        return context.executeAction({
            Name: "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            Properties: {
                Title: "Error",
                Message: `Error inesperado: ${error.message || 'Error desconocido'}`,
                CloseCaption: "Cerrar"
            }
        });
    }
}
