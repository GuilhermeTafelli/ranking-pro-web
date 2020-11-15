export const fileToBase64 = (file) => {
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
  };
  