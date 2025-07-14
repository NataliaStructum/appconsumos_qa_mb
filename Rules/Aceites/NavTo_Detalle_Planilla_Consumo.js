/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function NavTo_Detalle_Planilla_Consumo(context) {
    const pageProxy = context.getPageProxy();
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
    let calendario_value = pageProxy.getControl("SectionedTable0").getSection("SectionCalendar0").getSelectedDate();
    let fechaHoy = calendario_value.toISOString().split("T")[0];
    clientData.data_planilla_motor = null
    clientData.data_planilla_hidraulico = null
    clientData.data_planilla_diferencial = null

    //alert(fechaHoy)

    let clientData_user = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let info = clientData_user.info_user;
    let filtro = `$expand=almacen,operario&$filter=cast('${fechaHoy}', Edm.Date) eq fecha and almacen_almacen eq '${clientData.almacen_aceite_planilla}' and almacen_centro eq '${clientData.centro_aceite_planilla}'`;
    clientData.fecha = fechaHoy;


    return context.read('/appconsumos_qa_mb/Services/app_consumos_qa.service', 'PlanillasAceites', [], filtro).then(async (results) => {
        if (results && results.length > 0) {
            let resultados = results;

            // Clasificar por material
            resultados.forEach((item) => {
                const material = item.material;

                if (material === '1546081') {
                    clientData.data_planilla_motor = item;
                } else if (material === '1511617') {
                    clientData.data_planilla_hidraulico = item;
                } else if (material === '1546082') {
                    clientData.data_planilla_diferencial = item;
                }
            });
            // Navegar a la página después de guardar los datos
            if (info.sociedad === 'AI01') {
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
                    "Properties": {
                        "PageToOpen": "/appconsumos_qa_mb/Pages/Aceites/Detalle_Planilla_Consumo_Incauca.page"
                    }
                });
            }
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
                "Properties": {
                    "PageToOpen": "/appconsumos_qa_mb/Pages/Aceites/Detalle_Planilla_Consumo.page"
                }
            });

        } else {
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Sin datos",
                    "Message": "No se encontraron datos para la fecha y almacén seleccionados.",
                    "OKCaption": "Aceptar"
                }
            });
        }
    })
        .catch((error) => {
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Error",
                    "Message": `Error al consultar datos: ${error.message}`,
                    "OKCaption": "Cerrar"
                }
            });
        });

}
