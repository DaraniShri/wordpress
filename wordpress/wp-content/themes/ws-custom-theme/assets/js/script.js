var CUSTOM = CUSTOM || {};
CUSTOM.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            $('.div-buttons').append('<button id="reset">Refresh</button>');
            $('.div-search').append('<input type="text" id="search-input" placeholder="search for posts">');
            $('#table-id').append('<table class="table" id="data" border="1">' );
                $('#data').append("<thead><tr><th scope='col' width='60px'>ID<button id='postid'>*</button></th><th>DATE</th><th scope='col'>NAME<button id='postname'>*</button></th><th scope='col' width='140px'>CATEGORY<button id='category'>*</button></th><th>DESCRIPTION</th><th>STATUS</th></tr></thead>");
                $('#data').append('<tbody id="data-body">');
                $('#data').append('</tbody>');
            $('#table-id').append( '</table>' );
            self.clickFunction();
            var ajaxUrl = 'http://localhost/wordpress/wp-json/mypost/api/get-posts/';
            jQuery.ajax({
                url: ajaxUrl,
                type: 'GET',
                success: function (response) {
                    var jsonResponse = JSON.parse(response);
                    var categorynamelist=new Array();
                    $.each(jsonResponse,function(postArray,post){
                        var postcategory = post.post_category;
                        var postid = post.post_id;
                        var postname = post.post_name;
                        var postdescription = post.post_description;
                        var postdate = post.post_date;
                        var poststatus = post.post_status;  
                        var posttermid = post.post_term_id;
                        console.log(posttermid);
                        categorynamelist.push(postcategory);                        
                        $('#data').append("<tr class='data-row'><td>"+postid+"</td><td>"+postdate+"</td><td>"+postname+"</td><td>"+postcategory+"</td><td>"+postdescription+"</td><td>"+poststatus+"</td></tr>");
                    });
                    var categoryname = categorynamelist.filter(function(element, index, self) {
                        return index === self.indexOf(element);
                    });                   
                    $.each(categoryname,function(categories,categorys){
                        var li = $('<li><input type="checkbox" name="' + categories + '" id="' + categorys + '"term-d"'+ '"/>' + '<label for="' + categorys + '"></label></li>');
                        li.find('label').text(categorys);
                        $('.div-buttons').append(li);
                        self.categoryFunction(categorys);                     
                    });
                },
            });
        },

        categoryFunction: function(categorys){
            var count=0;
            $('#'+categorys).change(function() {
                if($('#'+categorys).is(':checked')){    
                   var namecategory =categorys.toUpperCase();
                    $('#data-body  tr').filter(function(){
                        $(this).toggle($(this.children[3]).text().toUpperCase().indexOf(namecategory) > -1); 
                        count =$('.data-row:not([style*="display: none"])').length; 
                    });
                    console.log(count);  
                    $('<h4>No of posts : '+count+'</h4>').insertAfter('#reset');                   
                }
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
        },

        clickFunction: function(){
            $('#reset').click(function(){
                history.go(0);
            });

            $('#search-input').keyup( function(){
                self.searchFunction()
            });
            $('#filter-input').keyup( function(){
                self.filterFunction()
            });

            $('#postname').click(function(){
                self.sortFunction(2,'text')
            });

            $('#postid').click(function(){
                self.sortFunction(0,'number')
            });

            $('#category').click(function(){
                self.sortFunction(3,'text')
            });

            // $('#button-hindu').click(function(){
            //     var rows = $("#data-body").find("tr").hide();
            //     console.log(rows.filter(":contains('Hinduism')").show().length);
            // });

            // $('#button-christian').click(function(){
            //     var rows = $("#data-body").find("tr").hide();
            //     console.log(rows.filter(":contains('Christianity')").show().length);
            // });
            
            // $('#button-islam').click(function(){
            //     var rows = $("#data-body").find("tr").hide();
            //     console.log(rows.filter(":contains('Islam')").show().length);
            // });
        }

    };
    return self;
}();
CUSTOM.core.load();