$(function(){

    //date calender
    $(".datepicker input").datetimepicker({
        format: "DD/MM/YYYY",
       
    });
    //$(document).on('dp.change',".datepicker input", function (e) { debugger;  $(this).change(); });;

    //time calender
    $(".timepicker input").datetimepicker({
        format: 'HH:mm:ss'
    });

})