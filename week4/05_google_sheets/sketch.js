// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15



// function setup() {
  // var ds = new Miso.Dataset({
  //   importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  //   parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  //   key : "1DWcDbrMCilhR8IfUEb6bJLw9_iBafdvfCeDFPF3pdwc",
  //   worksheet : "1"
  // });


  // ds.fetch({ 
  //   success : function() {
  //     console.log(ds.columnNames());
  //   },
  //   error : function() {
  //     console.log("Are you sure you are connected to the internet?");
  //   }
  // });
// }

  window.onload = function() { init() };
  var url = 'https://docs.google.com/spreadsheets/d/1YQ7js53a5Gdidi3XS5HxkDvHWgmAS1kCCi9NnmH7Uc0/pubhtml';
  var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE&output=html';

  function init() {
    Tabletop.init( { key: url,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    console.log(data);
    console.log(tabletop);
  }