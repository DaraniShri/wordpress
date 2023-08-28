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
            var dataSet = [
                {                  
                    "Name": "Tina Mukherjee",
                    "Designation":"BPO member",
                    "City": "Pune"    
                },
                {
                    "Name":"Gaurav",
                    "Designation":"Teacher",
                    "City": "Pune"     
                },
                {
                    "Name":"Ashtwini",     
                    "Designation":"Junior engineer",
                    "City": "mumbai"    
                },
                {
                    "Name":"Celina",     
                    "Designation":"Javascript Developer",
                    "City":  "tellapur"     
                },
                {
                    "Name":"Aisha",     
                    "Designation":"Nurse",
                    "City":  "Delhi"     
                },
                {
                    "Name":"Brad henry",     
                    "Designation":"Accountant",
                    "City": "Kolkatta"     
                },
                {
                    "Name": "Harry",    
                    "Designation": "Salesman",
                    "City":  "Navi mumbai"    
                },
                {
                    "Name":"Rhovina",
                    "Designation":"Amazon supporter",
                    "City": "hyderabad"
                },
                {
                    "Name":"Celina",
                    "Designation":"Senior Developer",
                    "City": "pune"  
                },     
                {
                    "Name":"Glenny",
                    "Designation":"Administrator",
                    "City": "Maharashtra"    
                },
                {
                    "Name":"Brad Pitt",
                    "Designation":"Engineer",
                    "City": "Delhi"  
                },
                {
                    "Name":"Deepa",    
                    "Designation":"Team Leader",
                    "City": "Chennai"    
                },                 
                {
                    "Name":"Angelina",     
                    "Designation":"CEO",
                    "City": "Aundh pune"
                    
                },
                {                  
                    "Name":"Shakthi Varma",
                    "Designation":"BPO member",
                    "City":  "Chennai"    
                },
                {
                    "Name":"Gurunav",
                    "Designation":"Teacher",
                    "City": "Pune"     
                },
                {
                    "Name":"Chandini",     
                    "Designation":  "Junior engineer",
                    "City":   "mumbai"    
                },
                {
                    "Name":  "Olivia",     
                    "Designation":  "Javascript Developer",
                    "City":   "tellapur"     
                },
            ];

            self.ajaxResponse();

            // $('#data-table').DataTable( {
            //     data: dataSet,
            //     columns: [
            //         { data: 'Name' },
            //         { data: 'Designation' },
            //         { data: 'City' }
            //     ],
            // });

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