var CUSTOM = CUSTOM || {};
CUSTOM.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            self.createFrontPage();
            self.clickFunction();
            var ajaxUrl = 'http://localhost/wordpress/wp-json/mypost/api/get-posts/';
            var termdetails=[];
            jQuery.ajax({
                url: ajaxUrl,
                type: 'GET',
                success: function (response) {
                    var jsonResponse = JSON.parse(response);
                    $.each(jsonResponse,function(postArray,post){
                        var postid = post.post_id;
                        var postname = post.post_name;
                        var postdescription = post.post_description;
                        var postdate = post.post_date;
                        var poststatus = post.post_status;  
                        var posttermid = post.post_term_id;
                        var postcategory = post.post_category;
                        if(termdetails[post.post_term_id]===undefined){
                            var termid=post.post_term_id;
                            var termname=post.post_category
                            termdetails[termid]=termname;
                          
                        $('#data').append("<tr class='data-row' data-id='"+posttermid+"'><td>"+postid+"</td><td>"+postdate+"</td><td>"+postname+"</td><td>"+postcategory+"</td><td>"+postdescription+"</td><td>"+poststatus+"</td></tr>");
                    });   
                    $.each(termdetails,function(key,value){
                        if(typeof value  !== "undefined"){
                            var li = $('<li><input type="checkbox" name="' + key + '" id="' + key +  '"/>' + '<label for="' + key + '">'+value+'</label></li>');
                            li.find('label').text(value);
                            $('.div-buttons').append(li);
                            self.categoryFunction(key);
                        }                                             
                    });
                    self.paginationFunction();
                },
            });
        },

        createFrontPage: function(){
            $('.div-buttons').append('<button id="reset">Refresh</button>');
            $('.div-search').append('<input type="text" id="search-input" placeholder="search for posts">');
            $('#table-id').append('<table class="table" id="data" border="1">' );
                $('#data').append("<thead><tr><th scope='col' width='60px'>ID<button id='postid'>*</button></th><th>DATE</th><th scope='col'>NAME<button id='postname'>*</button></th><th scope='col' width='140px'>CATEGORY<button id='category'>*</button></th><th>DESCRIPTION</th><th>STATUS</th></tr></thead>");
                $('#data').append('<tbody id="data-body">');
                $('#data').append('</tbody>');
            $('#table-id').append( '</table>' );
            $('#table-id').append('<button id="export-csv">Export CSV</button>');
        },

        paginationFunction: function(){
            var pageSize = 4;
            var total_posts = $('#data').find('.data-row').length;
            var number_pages = Math.ceil(total_posts/pageSize);
            $('#table-id').append('<ul id="pagination">');
            for(var i=1; i<=number_pages; i++){
                $('#pagination').append('<li><a href="#">'+i+'</a></li>');
            }
            $('#table-id').append('</ul>');
            showPage = function(page) {
                $('.data-row').hide();
                $('.data-row').each(function(n) {
                    if (n >= pageSize * (page - 1) && n < pageSize * page)
                        $(this).show();
                });        
            }
            showPage(1);
            $('#pagination li a').click(function() {
                $('#pagination li a').removeClass('current');
                $(this).addClass('current');
                showPage(parseInt($(this).text()));
            });
        },

        categoryFunction: function(key){
            var count=0;
            $('#'+key).change(function() {
                if($('#'+key).is(':checked')){    
                    $('#data-body  tr').filter(function(){
                        $(this).toggle($(this).attr('data-id').indexOf(key) > -1);
                        count =$('.data-row:not([style*="display: none"])').length; 
                    });
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
            $('#export-csv').click(function(){
                self.exportTableToCsv();
            })
        },

        exportTableToCsv: function(){
            var arrayCSVData = [];
            var cellValue = '';
            $("#data").find("tr").each(function () {
                if ($(this).find("th").length) {
                    var arrayDataHeader = [];
                    $(this).find("th").each(function () {
                        cellValue = $(this).text();
                        arrayDataHeader.push('"' + cellValue + '"');
                    });
                    arrayCSVData.push(arrayDataHeader.join(';'));
                }
                if ($(this).find("td").length) {
                    var arrayData = [];
                    $(this).find("td").each(function () {
                        cellValue = $(this).text();
                        arrayData.push('"' + cellValue + '"');
                    });
                    arrayCSVData.push(arrayData.join(';'));
                }
            });
            var csvData = arrayCSVData.join('\n');
            var downloadURL= 'data:application/csv;charset=UTF-8,' 
            + encodeURIComponent(csvData);
            window.open(downloadURL);

        }
    };
    return self;
}();
CUSTOM.core.load();