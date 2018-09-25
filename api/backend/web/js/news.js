$(document).ready(function(){
    
    getAllNews();
    
    $.trumbowyg.svgPath = '/trumbowyg/icons.svg';
	$('#news .article').trumbowyg();

	$('#add-news-form').submit(function(e){
		e.preventDefault();
		$.ajax({
			url: window.api_url+'/news/addsubmit',
			method: 'post',
			data: new FormData( this ),
			processData: false,
      		contentType: false,
			success: function(res){
				if(res.type=="success")
					alert('News added successfully.')
			}
		});
	});
})


function getAllNews(){
	$.ajax({
		url: window.api_url+'/news/getallnews',
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