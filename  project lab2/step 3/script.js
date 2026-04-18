$(function() {
    function addCourseRow() {
        var row = $('<div class="course-row form-row align-items-end mb-3">')
            .append('<div class="col"><label class="sr-only">Course</label><input type="text" name="course[]" class="form-control" placeholder="Course name" required></div>')
            .append('<div class="col-2"><label class="sr-only">Credits</label><input type="number" name="credits[]" class="form-control" placeholder="Credits" min="1" required></div>')
            .append('<div class="col-2"><label class="sr-only">Grade</label><select name="grade[]" class="form-control"><option value="4.0">A</option><option value="3.0">B</option><option value="2.0">C</option><option value="1.0">D</option><option value="0.0">F</option></select></div>')
            .append('<div class="col-auto"><button type="button" class="btn btn-danger remove-course">Remove</button></div>');
        $('#courses').append(row);
    }

    $('#addCourse').on('click', function() {
        addCourseRow();
    });

    $('#courses').on('click', '.remove-course', function() {
        $(this).closest('.course-row').remove();
    });

    $('#gpaForm').on('submit', function(event) {
        event.preventDefault();

        var totalCredits = 0;
        var totalPoints = 0;
        var valid = true;

        $('#courses .course-row').each(function() {
            var credits = Number($(this).find('input[name="credits[]"]').val());
            var grade = Number($(this).find('select[name="grade[]"]').val());

            if (!credits || credits <= 0) {
                valid = false;
                return false;
            }

            totalCredits += credits;
            totalPoints += credits * grade;
        });

        if (!valid || totalCredits === 0) {
            $('#result').removeClass('alert-success').addClass('alert-danger').text('Please enter valid course names and positive credits.').removeClass('d-none');
            return;
        }

        var gpa = totalPoints / totalCredits;
        $('#result').removeClass('alert-danger').addClass('alert-success').text('Your GPA is ' + gpa.toFixed(2)).removeClass('d-none');
    });
});
