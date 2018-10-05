<div class="row" id="news">
	<div class="col-lg-12">
		<form class="col-lg-8" id="add-news-form">
		  	<div class="form-group">
			    <label for="title">Title</label>
			    <input type="text" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Title">
		  	</div>
		  	<div class="form-group">
			    <label for="feat_img">Featured Image</label>
			    <input type="file" name="feat_img" class="form-control" id="feat_img" placeholder="Featured Image">
		  	</div>
		  	<div class="form-group">
			    <label for="article">Content</label>
			    <div id="article" class="article"></div>
		  	</div>
		  	<div class="form-group">
			    <label for="tags">Tags</label>
			    <input type="text" name="tags" class="form-control" id="tags" aria-describedby="emailHelp" placeholder="Ex. lotto, winner, prize">
		  	</div>
		  	<div class="form-group">
		  		<label for="status">Status</label>
			  	<select class="form-control" id="status" name="art_status">
					<option value="0">Draft</option>
					<option value="1">Pending</option>
					<option value="2">Published</option>
				</select>
			</div>
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>
<link rel="stylesheet" type="text/css" href="/trumbowyg/trumbowyg.min.css">
<?php 
	$this->registerJsFile('/trumbowyg/trumbowyg.min.js',['position' => \yii\web\View::POS_END, 'depends' => 'yii\bootstrap\BootstrapPluginAsset']);
	$this->registerJsFile('/trumbowyg/trumbowyg.allowtagsfrompaste.min.js',['position' => \yii\web\View::POS_END, 'depends' => '/trumbowyg/trumbowyg.min.js']);
	//$this->registerJsFile('/trumbowyg/trumbowyg.cleanpaste.min.js',['position' => \yii\web\View::POS_END, 'depends' => '/trumbowyg/trumbowyg.allowtagsfrompaste.min.js']);
	$this->registerJsFile('/js/news.js',['position' => \yii\web\View::POS_END, 'depends' => '/trumbowyg/trumbowyg.min.js']);
?>