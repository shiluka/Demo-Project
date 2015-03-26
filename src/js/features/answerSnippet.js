/* snippets for a given question and retrieve a tagged snippet */

//to store value of tagged snippets
var tagSnippets = [];
//to store all the details about tagged snippets
var tagSnippetsFullDetail = [];

$.getJSON('./draftStorage/tagData.json', function(data) {
    for (var i in data.taggedSnippets) {
        tagSnippets[i] = data.taggedSnippets[i].key;
        tagSnippetsFullDetail[i] = data.taggedSnippets[i];
    }
});


/* snippet answers for questions */

//sample qustion list
$('#questionList').on('change', function() {

    //clear text area
    $('#answer').val('');

    /* TODO currently snippets are shown for the exact given question. Algorithm should be implemented to find similarity between snippets. suggest Levenshtein distance algorithm */

    var ques = $(this).val();
    if (ques == 'why eclipse Luna version is recommended for build Teammates?') {
        $('#sample_question').val('why eclipse Luna version is recommended for build Teammates?');
    }
    if (ques == 'What is meant by Tagging snippets?') {
        $('#sample_question').val('What is meant by Tagging snippets?');
    }

    //to store question data from json file
    var ansSnippets = [];
    $.getJSON('./draftStorage/quesData.json', function(data) {

        var j = 0;
        for (var i in data.snippets_answers) {

            var tempquestion = $('#sample_question').val();

            if (data.snippets_answers[i].samp_ques === tempquestion) {
                alert(tempquestion + ' = ' + data.snippets_answers[i].value);
                ansSnippets[j] = data.snippets_answers[i].value;
                j++;
            }

        }

    });

    //function to retrieve tagged snippets
    var tagEnabled = false;

    //show answers as snippets
    $("#answer")
        .bind("keydown", function(event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 0,
            source: function(request, response) {
                //alert('request term : ' + request.term);
                var TAGGED_KEY = '@';

                if (request.term.slice(-1) === TAGGED_KEY) {
                    response($.ui.autocomplete.filter(
                        tagSnippets, extractLast(request.term)));
                    tagEnabled = true;
                } else {
                    response($.ui.autocomplete.filter(
                        ansSnippets, extractLast(request.term)));
                    tagEnabled = false;
                }


            },
            focus: function() {
                return false;
            },
            select: function(event, ui) {
                var terms = split(this.value);
                terms.pop();
                if (tagEnabled) {


                    //get the value of tagged snippets from key
                    var x = -1;
                    var valueOfKey;

                    for (var i in tagSnippetsFullDetail) {

                        if (tagSnippetsFullDetail[i].key === ui.item.value) {
                            x = i;
                            break;
                        }

                    }

                    if (x >= 0) {
                        valueOfKey = tagSnippetsFullDetail[x].value;
                    }

                    terms.push(valueOfKey);




                } else {
                    terms.push(ui.item.value);
                }
                terms.push("");
                this.value = terms.join(" ");
                return false;
            }
        });




});

//functions ui.autocomplete
function split(val) {
    return val.split(/ \s*/);
}

function extractLast(term) {
    return split(term).pop();
}