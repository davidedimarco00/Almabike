<div class="mycontainer-private">
  <div class="title-container">
        <h1 class="title">I miei percorsi</h1>
        <div class="info-icon">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
        </div>
  </div>

  <small text="muted">Questa è la tua area riservata. In questa pagina puoi visualizzare i dati di tuo interesse.</small>
  <div class="container-description">

    <h4 class="alert-heading">Ciao <?php echo $_SESSION['Nome']?>, la tua bici è equipaggiata con il sensore <?php echo $dbh->getSensorAssociatedWithUser($_SESSION['Nome'].".".$_SESSION["Cognome"])[0]['deviceName'] ?> </h4>
    <p>Ecco una panoramica delle ultime attività:</p>
    <h6>Qui puoi ricercare le parole chiave nei tuoi percorsi  <span><i class="fa fa-info-circle custom-tooltip" title="Clicca su una riga della tabella per visualizare il percorso sulla mappa"aria-hidden="true"></i></span></h6>
    <input class="form-control" id="search-routes" type="text" placeholder="Cerca...">
   

  </div>


  
<div class="container-table mt-2">
<table class="table table-bordered" id="routes-table">
  <thead>
    <tr>
      <th>Data</th>
      <th>Ora di Partenza</th>
      <th>Ora di Arrivo</th>
      <th>Rumore Medio</th>
      <th>Stato del Viaggio</th>
    </tr>
  </thead> <!-- da qui in giu ci deve essere del codice PHP che mi riempie le righe della tabella affinche questa  si riempia in base alla situazione dei dati raccolti dal sensore e dai relativi percorsi raccolti--->
  <tbody>
    
</table>
</div>
  
</div>