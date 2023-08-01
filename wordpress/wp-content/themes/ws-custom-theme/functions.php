<?php
    function hook_javascript() {
        ?>
            <script>
                alert('Hello world...');
            </script>
        <?php
    }
    add_action('wp_head', 'hook_javascript');
?>