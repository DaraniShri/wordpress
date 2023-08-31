<?php
    class loadScripts{

        public static function scriptInitiate(){
            add_action( 'wp_enqueue_scripts', array(get_called_class(),'add_scripts'),20);
            add_action('wp_enqueue_scripts',array(get_called_class(), 'add_styles'));
        }

        public static function add_scripts() {
            wp_enqueue_script( 'samplescriptdependency', get_template_directory_uri() . '/assets/js/jquery.min.js');
            wp_enqueue_script( 'sampledatatablejs', get_stylesheet_directory_uri(). '/assets/js/jquery.dataTables.min.js');
            wp_enqueue_script( 'samplebuttontablejs', get_stylesheet_directory_uri(). '/assets/js/dataTables.buttons.min.js');
            wp_enqueue_script( 'sampleprinttablejs', get_stylesheet_directory_uri(). '/assets/js/buttons.print.min.js');
            wp_enqueue_script( 'samplecustomjs', get_stylesheet_directory_uri(). '/assets/js/script.js');
            wp_enqueue_script( 'sampletrialtablejs', get_stylesheet_directory_uri(). '/assets/js/tables.js');           
        }

        public static function add_styles(){
            wp_enqueue_style( 'dataTableCss', get_stylesheet_directory_uri() . '/assets/css/jquery.dataTables.min.css');
            wp_enqueue_style( 'tableCss.css', get_stylesheet_directory_uri() . '/assets/css/tableCss.css', array(), time(), false );
        }
    }
    loadScripts::scriptInitiate();
?>