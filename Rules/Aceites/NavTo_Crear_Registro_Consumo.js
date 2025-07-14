/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import fechaFormateada from '../get_Now_DateTime_Col';
export default function NavTo_Crear_Registro_Consumo(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
    const almacen_aceites = context.evaluateTargetPath('#Page:Filtro_Aceites/#Control:almacen_aceites/#Value');
    clientData.centro_aceite_registro = almacen_aceites[0].BindingObject.centro
    clientData.almacen_aceite_registro = almacen_aceites[0].BindingObject.almacen
    clientData.sociedad_aceite_registro = almacen_aceites[0].BindingObject.sociedad
    clientData.data_planilla_motor = null
    clientData.data_planilla_hidraulico = null
    clientData.data_planilla_diferencial = null
    let clientData_user = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let info = clientData_user.info_user;


    const dataAlmacen = almacen_aceites[0].BindingObject;
    const fechaHoy = fechaFormateada(context);
    const filtro = `$expand=almacen,operario&$filter=cast('${fechaHoy}', Edm.Date) eq fecha and almacen_almacen eq '${dataAlmacen.almacen}' and almacen_centro eq '${dataAlmacen.centro}'`;
    

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

            //alert("Motor: " + JSON.stringify(clientData.data_planilla_motor));
            //alert("Hidráulico: " + JSON.stringify(clientData.data_planilla_hidraulico));
            //alert("Diferencial: " + JSON.stringify(clientData.data_planilla_diferencial));

            // Navegar a la página después de guardar los datos
            if (info.sociedad === 'AI01'){
                return context.executeAction({
                    "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
                    "Properties": {
                        "PageToOpen": "/appconsumos_qa_mb/Pages/Aceites/Registrar_Planilla_Consumo_Incauca.page"
                    }
                });
            }
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/GenericNavigation.action",
                "Properties": {
                    "PageToOpen": "/appconsumos_qa_mb/Pages/Aceites/Registrar_Planilla_Consumo.page"
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

