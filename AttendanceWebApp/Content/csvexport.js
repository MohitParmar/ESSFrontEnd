//Ref: https://www.datatables.net/release-datatables/extensions/TableTools/examples/select_multi.html

var tableRows=[];
var tableHeadings=[];
$('#example thead th').each(function() {
  tableHeadings.push($(this).text());
});

tableRows.push(tableHeadings.join(','));


$('#example tbody tr.selected').each(function() {
  var row=[];
  
  $(this).find('td:not(.hidden)').each(function() {
    row.push($(this).text());
  });

  if(row.length>0) {
    tableRows.push(row.join(','));
  }
});

var csv=tableRows.join("\r\n");
var newWin=window.open();
$(newWin.document.body).text(csv);