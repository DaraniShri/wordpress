var CUSTOM = CUSTOM || {};
CUSTOM.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            $('#table-id').append('<input type="text" id="filter-input" placeholder="filter for posts">');
            $('#table-id').append('<input type="text" id="search-input" placeholder="search for posts">');
            $('#table-id').append('<button id="sort-click">Sort</button>');
            $('#search-input').keyup( function(){
                self.searchFunction()
            });
            $('#filter-input').keyup( function(){
                self.filterFunction()
            });
            $('#table-id').append('<table id="data" border="1">' );
                $('#data').append("<tr><th>ID</th><th>DATE</th><th>NAME</th><th>CATEGORY</th><th>DESCRIPTION</th><th>STATUS</th></tr>");
                $('#data').append('<tbody id="data-body">');
                $('#data').append('</tbody>');
            $('#table-id').append( '</table>' );
            $('button').click(function(){
                                self.sortFunction()
                            });
            var ajaxUrl = 'http://localhost/wordpress/wp-json/mypost/api/get-posts/';
            jQuery.ajax({
                url: ajaxUrl,
                type: 'GET',
                success: function (response) {
                    var jsonResponse = JSON.parse(response);
                    $.each(jsonResponse,function(postArray,post){
                        var postcategory = post.post_category;
                        var postid = post.post_id;
                        var postname = post.post_name;
                        var postdescription = post.post_description;
                        var postdate = post.post_date;
                        var poststatus = post.post_status;
                        $('#data').append("<tr class='data-row'><td>"+postid+"</td><td>"+postdate+"</td><td>"+postname+"</td><td>"+postcategory+"</td><td>"+postdescription+"</td><td>"+poststatus+"</td></tr>");
                    });
                },
            });
        },
        searchFunction: function() {
            $('#search-input').on("keyup", function() {
                var search = $(this).val().toUpperCase();
                $('#data-body  tr').filter(function(){
                    $(this).toggle($(this).text().toUpperCase().indexOf(search) > -1);
                })
            });
        },

        filterFunction: function() {
            $('#filter-input').on("keyup", function() {
                var filter = $(this).val().toUpperCase();
                var category= $('#data-body  tr');
                category.filter(function(){
                    $(this).toggle($(this.children[3]).text().toUpperCase().indexOf(filter) > -1);
                });
            });
        },

        // filterFunction: function() {
        //     var search, filter, table, tr, category, categoryValue;
        //     search = $('#filter-input');
        //     filter = search.value.toUpperCase();
        //     table = $('#data');
        //     tr = table.$('tr');
        //     $.each(tr,function(rows,row){
        //         category = row.$('td')[3];
        //         if( category!=null){
    //                 categoryValue = category.textContent;
    //                 console.log(categoryValue);
    //                 if (categoryValue.toUpperCase().indexOf(filter) > -1) {
    //                     row.style.display = "";
    //                 } else {
    //                     row.style.display = "none";
    //                 }
    //             }
                
    //     });
    // },

        sortFunction: function() {
            var compare_rows = function (a,b){
                var a_val = $(a).text().toLowerCase();
                var b_val = $(b).text().toLowerCase();
                if (a_val>b_val){
                  return 1;
                }
                if (a_val<b_val){
                  return -1;
                }
                return 0;
            };
            $('#data .data-row').sort(compare_rows).appendTo('#data');
        }
    };
    return self;
}();
CUSTOM.core.load();