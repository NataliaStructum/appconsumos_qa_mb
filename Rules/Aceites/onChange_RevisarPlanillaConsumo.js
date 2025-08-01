/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function onChange_RevisarPlanillaConsumo(context) {

    const pageProxy = context.getPageProxy();
    var form_cell = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0")
    
    //var registro_consumo = form_cell.getControl("registro_consumo")
    var orden_obj = form_cell.getControl("orden_obj")
    var pos_obj = form_cell.getControl("pos_obj")

    let clientData = context.evaluateTargetPathForAPI('#Page:Filtro_Aceites').getClientData();
    let material = clientData.data_planilla_motor.material

    let registro_consumo_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Motor/#Control:registro_consumo/#Value');

    //alert(JSON.stringify(orden_obj.getTargetSpecifier()))
   
    //alert(JSON.stringify(res))
        //alert(JSON.stringify(orden_obj.getTargetSpecifier()))
        
    //alert(target.getType())
    //setTargetSpecifier(,true)
    
    orden_obj.setValue("")
    if(registro_consumo_value.length > 0){
        
        orden_obj.redraw()
        pos_obj.redraw()

        if ( registro_consumo_value[0].BindingObject.tipo === "Cambio"){
           //poner el lp de pos visible
            //let tipo = tipo_consumo_value[0].ReturnValue
            pos_obj.setVisible(true);
            orden_obj.setVisible(false);
            pos_obj.redraw()
            //obtener el filtro para la orden
            let orden = registro_consumo_value[0].BindingObject.orden_orden
            alert(material)
            /*
            let target = pos_obj.getTargetSpecifier()
            let res = target.setQueryOptions(`$filter=Aufnr eq '${orden}' and Matnr eq '${material}'`)
        
            pos_obj.setTargetSpecifier(res,true)
             */
            //orden_obj.setEditable(true)
            pos_obj.redraw()
            return;
        }else{
            pos_obj.setVisible(false);
            orden_obj.setVisible(true);
        } 
        return;
    }else{
        //let equipo = registro_consumo_value[0].BindingObject.equipo_equipo
        //let target = orden_obj.getTargetSpecifier()
        //let res = target.setQueryOptions(`$filter=equipo eq '${equipo}'`)
    
        //orden_obj.setTargetSpecifier(res,true)
        //orden_obj.setEditable(false)
        pos_obj.setVisible(false);
        orden_obj.setVisible(false);
        orden_obj.redraw()
        pos_obj.redraw()
        
        return;
    }

}
