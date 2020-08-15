$(document).ready(function () {
    var counter = 1;

    $(".addRow").click(function (e) {
        e.preventDefault()
        counter++
        var newRow = $('<tr class="inputRow">');
        var cols = "";

        cols += '<td><input type="text" class="form-control courseName' + counter + '" name="courseName' + counter + '"/></td>';
        cols += '<td><input type="number" class="form-control courseScore' + counter + '" placeholder="90%" name="courseScore' + counter + '"/></td>';
        cols += '<td><input type="number" class="form-control courseUnit' + counter + '" placeholder="2" name="courseUnit' + counter + '"/></td>';
        cols += '<td class="p-0"><i class="fas fa-times ibtnDel"></i></td>';

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
        $('.btn__wrap').html('<a class="btn submit submit__btn bg-white ml-2" id="loading"></a>')
        let data = JSON.stringify($('form').serializeArray())

        $.ajax({
            url: $('#dataBank').attr('process-url'),
            method: "POST",
            data: {
                'data': JSON.stringify(extractData()),
                'csrfmiddlewaretoken': $('#dataBank').attr('csrf')
            },

            success: function(data){

                $('#form').remove()
                $('.result__section').show()
                $('.inputRow').hide()

                data.courses.forEach(data => {
                    var resultRow = $('<tr class="resultRow">');
                    var cols = "";
                    console.log(data)

                    cols += '<td>' + data.name + '</td>';
                    cols += '<td>' + data.score + '</td>';
                    cols += '<td>' + data.units + '</td>';
                    cols += '<td>' + data.points + '</td>';
                    cols += '<td>' + data.grade + '</td>';

                    resultRow.append(cols);
                    $("table.order-list").append(resultRow);
                })

                $('#totalUnits').html(data.total_units)
                $('#totalPoints').html(data.total_points)
                $('#gp').html(data.gp)

                
            }
        })
    })

});
