
    $(document).ready(function () {
        $('.table').on("click", ".loadPopup", function () {
            $("#myModal .modal-body").html('<div id="Overlay"><div class="overlay"><i class="fa fa-spinner fa-pulse"></i> </div> </div>');
            var title = $(this).data('ss-title');
            var url = $(this).data('ss-url');
            $("#myModal-label").text(title);
            $("#myModal .modal-body").load(url);
            $('#myModal').modal('show');
        });
        $('.loadPopups').click(function () {
            $("#myModal .modal-body").html('<div id="Overlay"><div class="overlay"><i class="fa fa-spinner fa-pulse"></i> </div> </div>');
            var title = $(this).data('ss-title');
            var url = $(this).data('ss-url');
            $("#myModal-label").text(title);
            $("#myModal .modal-body").load(url);
            $('#myModal').modal('show');
        });
    });