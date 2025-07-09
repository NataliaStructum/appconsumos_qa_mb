//import * as fs from '@nativescript/core/file-system';
//import { isAndroid } from "@nativescript/core/platform";

export default function Rule_openDocumentoAnd(context) {

    let clientDataAutorizar = context.evaluateTargetPathForAPI('#Page:Detalle_Solicitud_Reabastecimieto').getClientData();
    const fs = context.nativescript.fileSystemModule;
    //const platform = context.nativescript.platformModule;  
    //let actionResult = context.getActionResult("GetArchivo");
    //let b64Data = actionResult.data.Archivo;
    //let formato = actionResult.data.FormatoArc.toLowerCase();
    let b64Data = clientDataAutorizar.b64Data
    let formato = "pdf"

    //Para generar un nombre aleatorio al documento
    function generateRandomWithSpecialChars() {
        const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', '<', '>', '?', '/', '.', ',', '`', '~'];
        const randomIndex1 = Math.floor(Math.random() * specialChars.length);
        const randomIndex2 = Math.floor(Math.random() * specialChars.length);

        const randomNumber = Math.floor(Math.random() * 1001);  // Genera un número entre 0 y 1000

        return specialChars[randomIndex1] + randomNumber + specialChars[randomIndex2];
    }

    //Para convertir un data buffer a native byte array
    let _Cover = function (byteArray) {
        let array = android.util.Base64.decode(byteArray, android.util.Base64.DEFAULT);

        /*if (platform.isAndroid) {
            array = android.util.Base64.decode(byteArray, android.util.Base64.DEFAULT);
        } else if(platform.isIOS){
            alert("entro");
            array = NSData.dataWithBytesLength(byteArray, byteArray.byteLength);
        }*/
        return array;
    }

    let mimeType="";

    switch(formato){
        case "pdf":
            mimeType = "application/pdf"
        break;
        case "png":
            mimeType = "image/png"
        break;
        case "jpg":
            mimeType = "image/jpeg"
        default:
            mimeType = "text/plain"
    };

    let docConver = _Cover(b64Data);
    

    let filename = `${generateRandomWithSpecialChars()}.${formato}`;
    var tempDir = fs.knownFolders.documents();
    var folder = "Files";

    if (!fs.Folder.exists(fs.path.join(tempDir.path, folder))) {
        fs.Folder.fromPath(fs.path.join(tempDir.path, folder));
    }

    var filePath = fs.path.join(tempDir.path, folder, filename);
    var productFile = fs.File.fromPath(filePath);
    //alert("Saving the file at: " + filePath);

    try {
        productFile.writeSync(docConver);
    } catch (err) {
        productFile.remove();
        alert("WRITE SYNC FAILED: " + err);
    }

    return context.executeAction({
        "Name": "/appconsumos_qa_mb/Actions/openDocument.action",
        "Properties":{
            "Path": filePath,
            "MimeType": mimeType,
            "OnSuccess":""
        }
    });
}
