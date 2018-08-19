$(document).ready(function() {
    $("#debug-sql .sql-table tbody tr").click(function() {
        $(".sql", this).toggleClass("etendu");
    });
});