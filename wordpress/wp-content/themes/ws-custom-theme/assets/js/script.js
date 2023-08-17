var CUSTOM = CUSTOM || {};
CUSTOM.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            window.print("<table id='post-table'>");
            var postUrl='http://localhost/wordpress/wp-content/themes/ws-custom-theme/classes/ajaxCall.php';
            jQuery.ajax({
                type : "post",
                dataType : "json",
                url: postUrl,
                success : function (response) {
                    var postcount = response.length;
                    for(var i=0; i<postcount; i++){
                        var postid = response[i].post_id;
                        var postname = response[i].post_name;
                        var postdescription = response[i].post_description;
                        var postdate = response[i].post_date;
                        console.log(postid,postname,postdescription,postdate);
                    }
                },
            });
        }
        
    };
    return self;
}();
CUSTOM.core.load();