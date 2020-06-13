document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


  var taskModal = document.getElementById('addTaskModal');
  $('#addTaskModal').on('show.bs.modal', function(e) {
    debugger
      var goalId = $(e.relatedTarget).data('goal-id');
      console.log(e);
  });
