/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Color_Tipo_ListaMaterial(context) {
    try {
        var object = context.binding
        var tipo = object.tipo
        
        if(tipo == "Registrado"){
            return "Grey"
        }
        if(tipo == "Nuevo"){
            return "Green"
        }
    } catch (error) {
        console.error("Ocurrió un error al obtener el color del tipo:", error);
        alert("No se pudo obtener el color del tipo: " + error.message);
    }
}
