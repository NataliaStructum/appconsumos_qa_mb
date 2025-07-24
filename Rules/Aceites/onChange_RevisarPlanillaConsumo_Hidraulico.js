/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onChange_RevisarPlanillaConsumo_Hidraulico(context) {
    const pageProxy = context.getPageProxy();
    var form_cell = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0")
    var registro_consumo = form_cell.getControl("registro_consumo")
    var orden_obj = form_cell.getControl("orden_obj")
    let registro_consumo_value = context.evaluateTargetPath('#Page:Revisar_Planilla_Aceite_Hidraulico/#Control:registro_consumo/#Value');

    //alert(JSON.stringify(orden_obj.getTargetSpecifier()))
   
    //alert(JSON.stringify(res))
        //alert(JSON.stringify(orden_obj.getTargetSpecifier()))
        
    //alert(target.getType())
    //setTargetSpecifier(,true)
    
    orden_obj.setValue("")
    if(registro_consumo_value.length < 1){
        orden_obj.setEditable(false)
        
        orden_obj.redraw()
        return;
    }else{
        //let equipo = registro_consumo_value[0].BindingObject.equipo_equipo
        //let target = orden_obj.getTargetSpecifier()
        //let res = target.setQueryOptions(`$filter=equipo eq '${equipo}'`)
    
        //orden_obj.setTargetSpecifier(res,true)
        orden_obj.setEditable(true)
        orden_obj.redraw()
        return;
    }
}
