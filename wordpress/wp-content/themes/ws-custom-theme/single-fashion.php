<?php
    $title=get_field('title_fashion');
    $description=get_field('description_fashion');
    $image=wp_get_attachment_image(get_field('image_fashion'));
?>
<html>
    <head>
        <style>
            .wraper .container{
                width:400px;
                border:solid black 2px;
                border-radius: 5px;
            }
            .wrapper .site-header{
                background-color: aqua;
            }
            .wrapper .site-footer{
                background-color: aqua;
            }
            .wrapper .container{
                background-color: white;
            }
        </style>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="wrapper">
            <div class="site-header">
                <?php get_header(); ?>
            </div>
            <article class="container">
                <h1><?php echo $title;?></h1>
                <div class="post-img">
                    <?php echo $image; ?>
                </div>
                <p><?php echo $description; ?></p>
            </article>
            <div class="site-footer">
                <?php get_footer(); ?>
            </div>
        </div>
    </body>
</html>
