$(function () {
    $('#datetimepicker1').datetimepicker();
});

$(document).ready(function () {
    $('#dtDynamicVerticalScrollExample').DataTable({
      "scrollY": "50vh",
      "scrollCollapse": true,
    });
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });

