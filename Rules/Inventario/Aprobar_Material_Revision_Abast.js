/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function Aprobar_Material_Revision_Abast(context) {
    const pageProxy = context.getPageProxy();
    let clientData = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitud_Reabastecimieto').getClientData();
    let clientDataMaterial = context.evaluateTargetPathForAPI('#Page:Revision_Solicitud_Reabastecimiento').getClientData();
    let data = clientDataMaterial.infoMaterial

    //   var cantidad = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell1").getControl("FormCellSimpleProperty_Cantidad");
    var cant = context.evaluateTargetPath('#Page:Revision_Sol_Almacenes_Abast/#Control:FormCellSimpleProperty_Cantidad/#Value');
    var almacen = context.evaluateTargetPath('#Page:Revision_Sol_Almacenes_Abast/#Control:almacen/#Value');
    
    if (almacen.length < 1) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `Debes seleccionar un almacen para continuar`
            }
        });
    }

    let dataAlm = almacen[0].BindingObject
    let stock = dataAlm.Labst

    if (!cant || cant < 0) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `Debes ingresar una cantidad válida para continuar`
            }
        });
    }

    if(cant > stock){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `Debes ingresar una cantidad menor para continuar. La cantidad disponible es de ${stock} und y la solicitada es de ${data.cantidad_tomada}`
            }
        });
    }

    if(cant > data.cantidad_tomada){
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Alerta",
                "Message": `Debes ingresar una cantidad menor para continuar. La cantidad disponible es de ${stock} und y la solicitada es de ${data.cantidad_tomada}`
            }
        });
    }
    //var material = data.mat_nuevo || data.material_material || '';

    let material = [data.mat_nuevo, data.material_material].find(v => typeof v === 'string' && v.trim() !== '');

    let material_desc = [data.mat_nuevo_desc, data.material?.material_desc]
        .find(v => typeof v === 'string' && v.trim() !== '');

    let tipo = data.mat_nuevo ? 'Nuevo' : 'Registrado';

    var nuevo = {
        id: data.id,
        material: material,
        material_desc: material_desc,
        cant_sol: data.cantidad_tomada,
        cant_apro: cant,
        almacen: dataAlm.Lgort,
        aprobado: 'Aprobado',
        tipo: tipo
    }
    nuevo["@odata.readLink"] = data["@odata.readLink"]
    const duplicado = clientData.lista_mat_solicitud_abast.filter(m => m.material === nuevo.material).length > 0

    //const duplicado = clientData.lista_mat_solicitud_abast.filter(m => m.mat_nuevo === data.mat_nuevo && m.almacen_almacen === data.almacen_almacen).length > 0
    if (duplicado) {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Material no Agregado",
                "Message": `El material ya fue agregado anteriormente`
            }
        }).then(() => {
            return context.executeAction({
                "Name": "/appconsumos_qa_mb/Actions/ClosePage.action",
                "NavigateBackToPage": "/appconsumos_qa_mb/Pages/Inventario/Revision_Solicitud_Reabastecimiento.page"
            });
        });
    }


    clientData.lista_mat_solicitud_abast.push(nuevo);

    //list_component.redraw()
    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": `Material Rechazado`,
            "Duration": 1,
            "ShowActivityIndicator": true,
        }
    }).then(() => {
        return context.executeAction({
            "Name": "/appconsumos_qa_mb/Actions/ClosePage.action",
            "NavigateBackToPage": "/appconsumos_qa_mb/Pages/Inventario/Revision_Solicitud_Reabastecimiento.page"
        });
    });
}
