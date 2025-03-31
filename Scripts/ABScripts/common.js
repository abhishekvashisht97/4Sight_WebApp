

$(function () {

    $(":file").filestyle({ input: false, classButton: "btn btn-danger" });

    $(".sidebar-menu li a").click(function () {
        $(this).parent().siblings().removeClass("active");
    });

    /** add active class and stay opened when selected */
    var url = window.location;

    // for sidebar menu entirely but not cover treeview
    $('ul.sidebar-menu a').filter(function () {
        return this.href == url;
    }).parent().addClass('active');

    // for treeview
    $('ul.treeview-menu a').filter(function () {
        return this.href == url;
    }).closest('.treeview').addClass('active');

    //Trim start and end space from all input Type="text"
    $('input[type=text]').change(function () {
        this.value = $.trim(this.value);
    });
});

function alertMessage(popupTitle, message, redirectURL) {
    BootstrapDialog.show({
        title: popupTitle,
        message: message,
        //closable: false,
        buttons: [{
            label: 'OK',
            cssClass: 'btn-primary',
            icon: "glyphicon glyphicon-check",
            action: function (dialogItself) {
                if (redirectURL !== null && redirectURL !== "" && typeof redirectURL !== 'undefined') {
                    window.location.href = redirectURL;
                }
                else {
                    dialogItself.close();
                }
            }
        }]
    });
}

function ExportToExcel(url) {
    window.location.href = url;
    window.location.assign(url);
    window.location = url;
    window.location.replace = url;
}

function validateExcelFile(FileUploadID) {
    var selectedText = $("#" + FileUploadID).val();
    var extension = selectedText.split('.');
    if (extension[1] !== "xlsx" && extension[1] !== "xls") {
        $("#" + FileUploadID).focus();
        displayErrorNotification("Please choose a .xlsx or .xls file");
        $("#" + FileUploadID).val("");
        return;
    }
    //$("#" + FileUploadID).val(selectedText);
}

function validateZIPFile(FileUploadID) {
    var selectedText = $("#" + FileUploadID).val();
    var extension = selectedText.split('.');
    if (extension[1] !== "zip") {
        $("#" + FileUploadID).focus();
        displayErrorNotification("Please choose a .zip file");
        $("#" + FileUploadID).val("");
        return;
    }
    //$("#" + FileUploadID).val(selectedText);
}

function validateDocumentPdfAndImage(file) {
    var selectedText = $("#" + file).val();
    var extension = selectedText.split('.');
    if (extension[1] !== "jpg" && extension[1] !== "png" && extension[1] !== "pdf" && extension[1] !== "gif") {
        $("#" + file).focus();
        displayErrorNotification("Please choose an image or pdf file");
        $("#" + file).val("");
        return false;
    }
    return true;
}

function ImportExcelFile(url, formData, tableIdToRefresh) {    
    $(".se-pre-con").css("display", "block");
    var $btnImport = $("#btnImport");
    $btnImport.button('loading');

    //Empty if datatable already exists
    $("#dvTableError").empty();

    $.ajax({
        url: url,
        data: formData,
        type: 'POST',
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {          
            if (data.msg != "") {                
                if (data.Response == "Success") {
                    $('#' + tableIdToRefresh).DataTable().ajax.reload();
                    displaySuccessNotification(data.msg);
                }
                else {
                    displayErrorNotification(data.msg);
                }
            }
            else {
                displayErrorNotification("Something Went Wrong!");
            }
                       
            //This For All
            if (typeof (data.table) != 'undefined') {
                if (data.table.length > 0) {
                    $("#dvError").removeClass("hidden");

                    ////Empty if datatable already exists
                    //$("#dvTableError").empty();

                    var table = "<table id='tblError' class='table table-responsive table-striped table-bordered'><thead> <tr> <th>Sr.No.</th> <th>RowNo.</th> <th>Error Message</th></thead>";
                    var rows = "";
                    for (var i = 0 ; i < data.table.length; i++) {
                        rows = rows + "<tr><td>" + data.table[i].SrNo + "</td><td>" + data.table[i].RowNo + "</td><td>" + data.table[i].ErrorMsg + "</td></tr>";
                    }
                    table = table + rows + "</table>";
                    $("#dvTableError").append(table);
                    $('#tblError').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                           {
                               extend: 'excelHtml5',
                               text: ' <i class="fa fa-download"></i> Export To Excel',
                               className: 'btn btn-success',
                               titleAttr: 'Export to Excel',
                               title: 'Error List',
                               messageTop: 'Excel.',
                               exportOptions: {
                                   modifier: {
                                       page: 'all',
                                   },
                               },
                               init: function (api, node, config) {
                                   $(node).removeClass('dt-button buttons-excel buttons-html5');
                               },
                               footer: true
                           }
                        ]
                    });
                }
                else {
                    $("#dvError").addClass("hidden")
                }
            }

            //This Only For ClaimUpload
            if (typeof (data.rowsNotUploadedInClaim) != 'undefined') {
                if (data.rowsNotUploadedInClaim.length > 0) {
                    $("#dvError").removeClass("hidden");

                    ////Empty if datatable already exists
                    //$("#dvTableError").empty();

                    var table = "<table id='tblError' class='table table-responsive table-striped table-bordered'><thead> <tr> <th>Case Number</th> <th>Error Message</th></thead>";
                    var rows = "";
                    for (var i = 0 ; i < data.rowsNotUploadedInClaim.length; i++) {
                        rows = rows + "<tr><td>" + data.rowsNotUploadedInClaim[i].CaseNumber + "</td><td>" + data.rowsNotUploadedInClaim[i].Remarks + "</td></tr>";
                    }
                    table = table + rows + "</table>";
                    $("#dvTableError").append(table);
                    $('#tblError').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                           {
                               extend: 'excelHtml5',
                               text: ' <i class="fa fa-download"></i> Export To Excel',
                               className: 'btn btn-success',
                               titleAttr: 'Export to Excel',
                               title: 'Error List',
                               messageTop: 'Excel.',
                               exportOptions: {
                                   modifier: {
                                       page: 'all',
                                   },
                               },
                               init: function (api, node, config) {
                                   $(node).removeClass('dt-button buttons-excel buttons-html5');
                               },
                               footer: true
                           }
                        ]
                    });
                }
                else {
                    $("#dvError").addClass("hidden")
                }
            }
        },
        error: function (xhr, errorType, ex) {
            //Empty if datatable already exists
            $("#dvTableError").empty();
            displayErrorNotification("Error occured while processing your request." + ex.message);
            $btnImport.button('reset');
            $('.se-pre-con').fadeOut(1000);
        },
        complete: function () {
            
            //reset state
            $btnImport.button('reset');
            if(tableIdToRefresh == "tblClaim")
            {
                BatchReload();
            }
            $(".se-pre-con").css("display", "none");
        }
    });
}

function LoadQC(auditorID) {
    
    $.ajax({
        type: "POST",
        url: "/Claim/GetQC",
        data: JSON.stringify({ auditorID: auditorID }),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            
            $("#ddlQC").empty().append('<option value="">--Select QC--</option>'); //remove all child nodes
            $.each(res, function (data, value) {
                
                $("#ddlQC").append($("<option></option>").val(value.Value).html(value.Text));
            })
        }
    });
}
