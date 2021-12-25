 const dbRef = firebase.database().ref();
 const listShowsRef = dbRef.child('list_shows');
 listShowsRef.on("child_added", snap => {
     $("table tbody").append(
         `<tr data-id=` + snap.key + `> 
                    <td>` + snap.val().OTT + `</td>
                    <td>` + snap.val().show + `</td>
                    <td>
                        <a href="#editOTTModal" class="edit" data-toggle="modal">
                            <i class="material-icons edit_icon" data-toggle="tooltip" title="Edit">&#xE254;</i>
                        </a>
                        <a href="#deleteOTTModal" class="delete" data-toggle="modal">
                            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                        </a>
                    </td>
                </tr>`
     )
 });
 $(document).ready(function () {
     $(".add_data .submit").on("click", function () {
         const OTT_name = $(".add_data .OTT_name").val();
         const show_name = $(".add_data .show_name").val();
         const new_data = {
             OTT: OTT_name,
             show: show_name
         }
         listShowsRef.push(new_data, function () {
             console.log("new data added");
         });
         $(".add_data .OTT_name").val("");
         $(".add_data .show_name").val("");
     });
     $(".save_edited_data").on("click", function () {
         var edited_OTT_name = $(".edit_modal .edit_OTT_name").val();
         var edited_show_name = $(".edit_modal .edit_show_name").val();
         var edited_key = $(".edit_modal .edit_key").val();
         const editedData = {
             OTT: edited_OTT_name,
             show: edited_show_name
         }
         var listShowRef = dbRef.child('list_shows/' + edited_key).update(editedData);

     })
 })
 $(document).on("click", ".edit", function () {
     var key = $(this).parent().parent().data("id");
     var listShowRef = dbRef.child('list_shows/' + key);
     listShowRef.on("value", snap => {
         $(".edit_modal .edit_OTT_name").val(snap.val().OTT);
         $(".edit_modal .edit_show_name").val(snap.val().show);
         $(".edit_modal .edit_key").val(snap.key);
     })
 })
 $(document).on("click", ".delete", function () {
     var delete_key = $(this).parent().parent().data("id");
     var listShowRef = dbRef.child('list_shows/' + delete_key).remove();
     var element = $(this).parent().parent().hide();
 })