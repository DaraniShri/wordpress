var TABLES = TABLES || {};
TABLES.core = function () {
    var self = {
        load: function () {
            jQuery(document).ready(self.ready);
        },
        ready: function () {
            self.initTable();
            self.applyDataTables();
        },
        initTable: function () {
            $('#id-container').append('<table id="data-table">');
                $('#data-table').append('<thead><tr><th>ID</th><th>DATE</th><th>NAME</th><th>CATEGORY</th><th>DESCRIPTION</th><th>STATUS</th></tr></thead>');
            $('#id-container').append('</table>');
        },
        applyDataTables: function(){
            self.ajaxResponse();
        },
        ajaxResponse: function(){
            $.ajax({
                url: 'http://localhost/wordpress/wp-json/mypost/api/get-posts/',
                success : function(response) {
                    var table_data = $.parseJSON(response);
                    var postCategory=table_data.post_category;
                    console.log(table_data.post_category);
                    $.each(postCategory,function(categories,category){
                        console.log(category);
                    });
                    $('#data-table').DataTable( {
                        data: table_data,
                        columns: [
                            { data: 'post_id' },
                            { data: 'post_date' },
                            { data: 'post_name' },
                            { data: 'post_category' },
                            { data: 'post_description' },
                            { data: 'post_status' },
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            'print'
                        ]
                    });
                }
            });
        }
    };
    return self;
}();
TABLES.core.load();