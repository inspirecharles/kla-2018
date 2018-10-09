<div class="row" id="news">
	<div class="col-lg-12">
		<a href="/news/add"><button class="btn btn-primary pull-right">Add News</button></a>
		<table class="table table-striped">
			<thead>
				<th>ID</th>
				<th>Title</th>
				<th>Status</th>
				<th>Date Created</th>
				<th>Actions</th>
			</thead>
			<tbody>

			</tbody>
		</table>
	</div>
</div>
<?php 
	$this->registerJsFile('/trumbowyg/trumbowyg.min.js',['position' => \yii\web\View::POS_END, 'depends' => 'yii\bootstrap\BootstrapPluginAsset']);
	$this->registerJsFile('/js/news.js',['position' => \yii\web\View::POS_END, 'depends' => 'yii\web\JqueryAsset']);
?>