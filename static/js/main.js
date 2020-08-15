$(document).ready(function () {
    var counter = 1;

    $(".addRow").click(function (e) {
        e.preventDefault()
        counter++
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input type="text" class="form-control courseName' + counter + '" name="courseName' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control courseScore' + counter + '" name="courseScore' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control courseUnit' + counter + '" name="courseUnit' + counter + '"/></td>';
        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';

        newRow.append(cols);
        $("table.order-list").append(newRow);
    });

    $("table.order-list").on("click", ".ibtnDel", function (event) {
        counter -= 1
        $(this).closest("tr").remove();       
    });

    // functions
    let extractData = function(){
        //exrtract data from all the dynamic fields
        dataArr = []
        for (let i=1; i <= counter; i++){
            var courseName = $('.courseName' + i).val()
            var courseScore = $('.courseScore' + i).val()
            var courseUnits = $('.courseUnit' + i).val()
    
            dataArr.push({
                'courseName': courseName,
                'courseScore': courseScore,
                'courseUnits': courseUnits
            })
        }
        return dataArr
    }

    $('.submit').click(function(e){
        e.preventDefault
        let data = JSON.stringify($('form').serializeArray())

        $.ajax({
            url: $('#dataBank').attr('process-url'),
            method: "POST",
            data: {
                'data': JSON.stringify(extractData()),
                'csrfmiddlewaretoken': $('#dataBank').attr('csrf')
            },

            success: function(data){
                console.log(data)
            }
        })
    })

});
