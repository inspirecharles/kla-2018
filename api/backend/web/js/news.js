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

	$('#update-news-form').submit(function(e){
		e.preventDefault();
		$.ajax({
			url: window.api_url+'/news/updatesubmit',
			method: 'post',
			data: new FormData( this ),
			processData: false,
      		contentType: false,
			success: function(res){
				if(res.type=="success")
					alert('News updated successfully.')
			}
		});
	});

	$(document).on('click', '#news .btn-delete', function(e){
		var id = $(this).parents('tr').data('id');
		var self = $(this);
		if( confirm("Are you sure you want to delete this news?") ){
			$.ajax({
				url: window.api_url+'/news/deletenews',
				method: 'post',
				data: { id: id },
				success: function(res){
					if(res.type=="success"){
						alert('News deleted successfully.')
						self.parents('tr').fadeOut();
					}
					else
						alert('Something went wrong.')
				}
			});
		}
	})
})


function getAllNews(){
	$.ajax({
		url: window.api_url+'/news/getallnews',
		method: 'get',
		success: function(res){
			res.forEach(function(row, index){
				var html = '<tr data-id="'+row.id+'">'
				html += '<td>'+row.id+'</td>';
				html += '<td>'+row.title+'</td>';
				html += '<td>'+row.art_status+'</td>';
				html += '<td>'+row.date_submitted+'</td>';
				html += '<td>';
				html += '<a href="/news/update/'+row.id+'"><button class="btn btn-info btn-xs">Update</button></a> ';
				html += '<button class="btn btn-danger btn-xs btn-delete">Delete</button>';
				html += '</td>';
				html += '</tr>';
				$('#news tbody').append(html);
			})
		}
	});
}