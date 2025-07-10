/**
 * Describe this function...
 * @param {IClientAPI} context
 */
import fechaFormateada from '../get_Now_DateTime_Col';

export default async function Select_Almacen_Aceites(context) {
    let clientData = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
    let info_user = clientData.info_user.sociedad;
    alert(info_user)
    const pageProxy = context.getPageProxy();
 
    const btn_crear = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0").getControl("btn_crear");
    const btn_registrar = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0").getControl("btn_registrar");
    const btn_validar = pageProxy.getControl("SectionedTable0").getSection("SectionFormCell0").getControl("btn_validar");
 
    const almacen_aceites = context.evaluateTargetPath('#Page:Filtro_Aceites/#Control:almacen_aceites/#Value');
 
    // Si no hay nada seleccionado, deshabilita todo y termina
    if (!almacen_aceites || almacen_aceites.length === 0) {
        btn_crear.setEnabled(false);
        btn_registrar.setEnabled(false);
        btn_validar.setEnabled(false);
        return;
    }
 
    const dataAlmacen = almacen_aceites[0].BindingObject;
    const fechaHoy = fechaFormateada(context);
 
    const filtro = `$filter=cast('${fechaHoy}', Edm.Date) eq fecha and almacen_almacen eq '${dataAlmacen.almacen}' and almacen_centro eq '${dataAlmacen.centro}'`;
 
    // Habilita boton validar por defecto
    //btn_registrar.setEnabled(true);
    btn_validar.setEnabled(true);
 
    try {
        const results = await context.read(
            '/appconsumos_qa_mb/Services/app_consumos_qa.service',
            'PlanillasAceites',
            [],
            filtro
        );
        const tieneDatos = results && results.length > 0;
        btn_crear.setEnabled(!tieneDatos); 
        btn_registrar.setEnabled(tieneDatos);
 
    } catch (error) {
        btn_crear.setEnabled(false);
        btn_registrar.setEnabled(false);
        btn_validar.setEnabled(false);
        alert(`Error al leer planillas: ${error.message}`);
    }
}
