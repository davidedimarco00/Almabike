/*Questa classe è il maanger della mappa stessa*/

export class AjaxHandler {
  constructor(map) {
    this.map = map;
  }

  callAjax(url, type, data, cache, onSuccess) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        cache: cache,
        success: onSuccess, //PRATICAMENTE QUI GLI DEVO PASSARE IL CORPO DELLA FUNZIONE
  
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Chiamata fallita");
          console.log(textStatus, errorThrown);
        },
      });
  }
}
