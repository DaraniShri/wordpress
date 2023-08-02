<h1>hello world!</h1>
<?php
    wp_head();
    the_content();
    $addMetaValues=apply_filters('writeMeta',1,'meta_description','post meta value',false);
?>