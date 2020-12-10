export const fileToBase64 = (file) => {
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
};

export const orderTypes = [
    { name: "Solicitar Medalha Primeiro Feedback em video", value: "MEDAL_FIRST_VIDEO_FEEDBACK" },
    { name: "Solicitar Registro de novo cliente", value: "REGISTRY_NEW_CUSTOMER" },
    { name: "Solicitar Registro de novo cliente em teste", value: "REGISTRY_NEW_CUSTOMER_TEST" },
    { name: "Solicitar Atualização de faturamento mensal", value: "UPDATE_MONTHLY_INVOICING" },
]