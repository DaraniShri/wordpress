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
            .button-tag{
                background-color: white;
                border-radius: 5px;
                width: 65px;
                height: ;
                position:absolute;
                top: 70px;
                left: 20px;
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
                            ?>
                            <div class="col-sm-4">
                                <div class="button-tag">
                                    <a href="single-festival.php">view post</a>
                                </div>
                                <h2><?php the_title();?></h2>
                                <?php the_content();?>
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
