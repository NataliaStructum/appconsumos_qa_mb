/**
 * Describe this function...
 * @param {context} clientAPI
 */
export default function Select_Almacen_Ingenio(context) {
    let almacen_ingenio = context.evaluateTargetPath('#Page:Filtro_Ingenio/#Control:FormCellListPicker_Almacen_O/#Value');
    const pageProxy = context.getPageProxy();
    var btn_component = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0").getControl("FormCellButton_Buscar")

    if (almacen_ingenio.length > 0) {
        btn_component.setEnabled(true)
    }else{
        btn_component.setEnabled(false)
    }
}
