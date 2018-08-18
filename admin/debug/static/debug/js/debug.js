$(document).ready(function() {
    $("#debug-sql .sql-table tbody tr").click(function() {
        $(this).toggleClass("reduit");
    });
});