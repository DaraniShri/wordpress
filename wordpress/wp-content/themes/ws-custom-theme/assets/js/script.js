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
            $("input").keyup( function(){
                self.searchFunction()
            });
            $('#filter-input').keyup( function(){
                self.filterFunction()
            });
            $('#table-id').append('<table id="data" border="1">' );
                $('#data').append("<tr><th>ID</th><th>DATE</th><th>NAME</th><th>CATEGORY</th><th>DESCRIPTION</th><th>STATUS</th></tr>");
            $('#table-id').append( '</table>' );
            document.getElementById("sort-click").addEventListener("click", function(){
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
                        $('#data').append("<tr><td>"+postid+"</td><td>"+postdate+"</td><td>"+postname+"</td><td>"+postcategory+"</td><td>"+postdescription+"</td><td>"+poststatus+"</td></tr>");
                    });
                },
            });
        },
        searchFunction: function() {
            var search, filter, table, tr, description, name, nameValue, txtValue;
            search = document.getElementById("search-input");
            filter = search.value.toUpperCase();
            table = document.getElementById("data");
            tr = table.getElementsByTagName("tr");
            $.each(tr,function(rows,row){
                name = row.getElementsByTagName("td")[2];
                description = row.getElementsByTagName("td")[4];
                if(isEmpty(name)){
                    document.write("No Festival found");
                }
                else{
                    if (isEmpty(description) ) {
                        document.write("No description found");
                    }
                    else{
                        nameValue = name.textContent;
                        txtValue = description.textContent;
                        if (txtValue.toUpperCase().indexOf(filter) > -1  ||  nameValue.toUpperCase().indexOf(filter) > -1) {
                            row.style.display = "";
                        } else {
                            row.style.display = "none";
                        }
                    }
                }
            });
        },
        filterFunction: function() {
            var search, filter, table, tr, description, name, nameValue, txtValue;
            search = document.getElementById("filter-input");
            filter = search.value.toUpperCase();
            table = document.getElementById("data");
            tr = table.getElementsByTagName("tr");
            $.each(tr,function(rows,row){
                category = row.getElementsByTagName("td")[3];
                if(isEmpty(category)){
                    document.write("No category found");
                }
                else{
                    categoryValue = category.textContent;
                    if (categoryValue.toUpperCase().indexOf(filter) > -1) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }
                }                
            });
        },
        sortFunction: function() {
            console.log("namasthey");
        }
    };
    return self;
}();
CUSTOM.core.load();
