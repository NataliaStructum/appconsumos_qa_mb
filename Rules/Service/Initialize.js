export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _app_consumos_qa = context.executeAction('/appconsumos_qa_mb/Actions/app_consumos_qa/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_app_consumos_qa]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/appconsumos_qa_mb/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Servicio de la aplicación inicializado",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1,
                "OnSuccess": "/appconsumos_qa_mb/Actions/app_consumos_qa/Service/UploadOffline.action",
            }
        });
    }).catch(() => {
        return false;
    });
}