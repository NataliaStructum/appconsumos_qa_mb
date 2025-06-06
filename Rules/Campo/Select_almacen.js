/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Select_almacen(context) {
    let almacen = context.evaluateTargetPath('#Page:Filtro_Campo/#Control:almacen_campo/#Value');
    const pageProxy = context.getPageProxy();
    var btn_component = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0").getControl("FormCellButton0")

    if (almacen.length > 0) {
        btn_component.setEnabled(true)
    }else{
        btn_component.setEnabled(false)
    }

}
