<div class="row" id="news">
	<div class="col-lg-12">
		<form class="col-lg-8" id="update-news-form">
			<input name="id" type="hidden" value="<?= $news->id ?>" >
		  	<div class="form-group">
			    <label for="title">Title</label>
			    <input type="text" name="title" value="<?= $news->title ?>" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Title">
		  	</div>
		  	<div class="form-group">
			    <label for="feat_img">Featured Image</label>
			    <img style="width: 100%" src="<?= Yii::$app->params['api-url']?>/uploads/news/<?= $news->id?>/<?= $news->feat_img?>">
			    <input type="file" name="feat_img" class="form-control" id="feat_img" placeholder="Featured Image">
		  	</div>
		  	<div class="form-group">
			    <label for="article">Content</label>
			    <div id="article" class="article"><?= $news->article ?></div>
		  	</div>
		  	<div class="form-group">
			    <label for="tags">Tags</label>
			    <input type="text" name="tags"  value="<?= $news->tags ?>" class="form-control" id="tags" aria-describedby="emailHelp" placeholder="Ex. lotto, winner, prize">
		  	</div>
		  	<div class="form-group">
		  		<label for="status">Status</label>
			  	<select class="form-control" id="status" name="art_status">
					<option value="0" <?= $news->art_status == 0?'selected':'' ?> >Draft</option>
					<option value="1" <?= $news->art_status == 1?'selected':'' ?> >Pending</option>
					<option value="2" <?= $news->art_status == 2?'selected':'' ?> >Published</option>
				</select>
			</div>
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>
<link rel="stylesheet" type="text/css" href="/trumbowyg/trumbowyg.min.css">
<?php 
	$this->registerJsFile('/trumbowyg/trumbowyg.min.js',['position' => \yii\web\View::POS_END, 'depends' => 'yii\bootstrap\BootstrapPluginAsset']);
	$this->registerJsFile('/js/news.js',['position' => \yii\web\View::POS_END, 'depends' => '/trumbowyg/trumbowyg.min.js']);
?>