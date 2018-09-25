$(document).ready(function(){
    
    getAllNews();
    
    $.trumbowyg.svgPath = '/trumbowyg/icons.svg';
	$('#news .article').trumbowyg();

	$('#add-news-form').submit(function(e){
		e.preventDefault();
		$.ajax({
			url: 'http://api.kla-uk.lan/news/addsubmit',
			method: 'post',
			data: new FormData( this ),
			processData: false,
      		contentType: false,
			success: function(res){
				console.log(res);
			}
		});
	});
})


function getAllNews(){
	$.ajax({
		url: 'http://api.kla-uk.lan/news/getallnews',
		method: 'get',
		success: function(res){
			res.forEach(function(row, index){
				var html = '<tr>'
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.title+'</td>';
				html += '<td>'+row.art_status+'</td>';
				html += '<td>'+row.date_submitted+'</td>';
				html += '</tr>';
				$('#news tbody').append(html);
			})
		}
	});
}