<html>
    <head>
        <style>
            .wrapper .site-header{
                background-color: aqua;
            }
            .wrapper .site-footer{
                background-color: aqua;
            }
            .wrapper .container{
                background-color: white;
            }
            .wrapper .title{
                text-align: center;
                
            }
            .wrapper .container .col-sm-4 .button-tag{
                background-color: white;
                border-radius: 5px;
                width: 65px;
                position:absolute;
                top: 120px;
                left: 20px;
            }
            .wrapper .container .col-sm-4 .post-name{
                font-weight: bold;
                font-style: italic;
                color: blue;
            }
            .wrapper .container .col-sm-4 .post-desctiption p{
                display: -webkit-box;
                max-width: 400px;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        </style>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="wrapper">
            <div class="site-header">
                <?php get_header(); ?>
            </div>
            <div class="title">
                <h1>Festivals</h1>
            </div>
            <article class="container">
                <div class="row">
                    <?php
                        if ( have_posts() ) :
                            while( have_posts() ) : the_post() ;
                                $title=get_field('title_festival');
                                $name=get_field('name_festival');
                                $description=get_field('description_festival');
                                $image=wp_get_attachment_image(get_field('featured_image_festival'));
                            ?>
                            <div class="col-sm-4">
                                <div class="button-tag">

                                    <a href="<?php get_permalink(); ?>">view post</a>
                                </div>
                                <div class="post-title">
                                    <h1><?php echo $title;?></h1>
                                </div>
                                <div class="post-name">
                                    <h3><?php echo $name;?></h2>
                                </div>
                                <div class="post-img">
                                    <?php echo $image; ?>
                                </div>
                                <div class="post-description">
                                    <p><?php echo $description; ?></p>
                                </div>
                            </div>
                            <?php
                            endwhile;
                        endif;        
                    ?>
                </div>
            </article>
            <div class="site-footer">
                <?php get_footer(); ?>
            </div>
        </div>
    </body>
</html>
