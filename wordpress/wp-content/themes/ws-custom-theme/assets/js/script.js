var CUSTOM = CUSTOM || {};
CUSTOM.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            $('.div-buttons').append('<button id="button-hindu">Hinduism</button>');
            $('.div-buttons').append('<button id="button-christian">Christianity</button>');
            $('.div-buttons').append('<button id="button-islam">Islam</button>');
            $('.div-buttons').append('<button id="reset">x</button>');
            $('#reset').click(function(){
                // $("#data-body").find("tr").show();
                var trcount=$("#data-body").find("tr").length;
                console.log(trcount);
                var table=$('#data');
                if (table.hasClass('more')) {
                    table.removeClass('more');
                    $(this).text($(this).data('more'));
                }
                else {
                    $("#data-body").find("tr").show();
                }
            });
            $('.div-buttons').append('');

            $('.div-search').append('<input type="text" id="search-input" placeholder="search for posts">');
            $('#search-input').keyup( function(){
                self.searchFunction()
            });
            $('#filter-input').keyup( function(){
                self.filterFunction()
            });
            $('#table-id').append('<table class="table" id="data" border="1">' );
                $('#data').append("<thead><tr><th scope='col'>ID<button id='postid'>*</button></th><th>DATE</th><th scope='col'>NAME<button id='postname'>*</button></th><th scope='col'>CATEGORY<button id='category'>*</button></th><th>DESCRIPTION</th><th>STATUS</th></tr></thead>");
                $('#data').append('<tbody id="data-body">');
                $('#data').append('</tbody>');
            $('#table-id').append( '</table>' );
            $('#postname').click(function(){
                                self.sortFunction(2,'text')
                            });
            $('#postid').click(function(){
                                self.sortFunction(0,'number')
                            });
            $('#category').click(function(){
                                self.sortFunction(3,'text')
            });
            $('#button-hindu').click(function(){
                var rows = $("#data-body").find("tr").hide();
                console.log(rows.filter(":contains('Hinduism')").show().length);
            });
            $('#button-christian').click(function(){
                var rows = $("#data-body").find("tr").hide();
                console.log(rows.filter(":contains('Christianity')").show().length);
            });
            $('#button-islam').click(function(){
                var rows = $("#data-body").find("tr").hide();
                console.log(rows.filter(":contains('Islam')").show().length);
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

        sortFunction: function(column, type) {
            var order = $('.table thead tr>th:eq(' + column + ')').data('order');
            order = order === 'ASC' ? 'DESC' : 'ASC';
            $('.table thead tr>th:eq(' + column + ')').data('order', order);
            $('.table tbody tr').sort(function(a, b) {
                a = $(a).find('td:eq(' + column + ')').text();
                b = $(b).find('td:eq(' + column + ')').text();
                switch (type) {
                    case 'text':
                        return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
                        break;
                    case 'number':
                        return order === 'ASC' ? a - b : b - a;
                        break;
                }
            }).appendTo('.table tbody');            
        }
    };
    return self;
}();
CUSTOM.core.load();