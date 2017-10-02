function render(data) { 
    var html = "<div class='commentBox'><div class='leftPanelImage'><img src='http://via.placeholder.com/70x70' /></div><div class='rightPanel'><span>" + data.name + "</span><div class='date'>" + data.date + "</div><p><br>" + data.body + "<br></p></div><div class='clear'></div></div>";
    
     $('#container').append(html);
}

$(document).ready(function () {
    var comment = [
        { "name": "You-Ree kim", "date": "Oct, 1, 2017", "body": "This is a comment" }
        ];

        for (var i = 0; i < comment.length; i++) {
            render(comment[i]); 
            
        }
    $('#addComment').click(function(){
        var addObj={
            "name": $('#name').val(), 
            "date": $('#date').val(), 
            "body": $('#bodyText').val()
        };
      
        comment.push(addObj); 
        render(addObj); 
        $('#name').val(''); 
        $('#date').val('dd/mm/yyyy'); 
        $('#bodyText').val('');


    }); 

});


