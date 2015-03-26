/* when instructor typing without using snippets
       gets help from snippet words */
var tempSnippets = [];

$.getJSON('./draftStorage/data.json', function(data) {

    //put snippets to jstorage
    for (var i in data.snippets) {
        $.jStorage.set(i, data.snippets[i]);
    }
    //get snippets from jStorage
    for (var j = 0; j < $.jStorage.numberofSnippets(); j++) {
        tempSnippets[j] = $.jStorage.get(j).value;
    }

});

//show snippets (words) in feedback textarea
$("#feedback")
    .bind("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete("instance").menu.active) {
            event.preventDefault();
        }
    })
    .autocomplete({
        minLength: 0,
        source: function(request, response) {
            response($.ui.autocomplete.filter(
                tempSnippets, extractLast(request.term)));
        },
        focus: function() {
            return false;
        },
        select: function(event, ui) {
            var terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            terms.push("");
            this.value = terms.join(" ");
            return false;
        }
    });

function split(val) {
    return val.split(/ \s*/);
}

function extractLast(term) {
    return split(term).pop();
}

//function to add snippet 
function addSnippet() {

    var tempText = document.getElementById("inputSnippet").value;
    var size = $.jStorage.numberofSnippets();
    document.getElementById("inputSnippet").value = "";
    $.jStorage.set(size, tempText);
    tempSnippets[size] = tempText;
    alert('adding snippet: ' + tempText + '  jstorage size: ' + size);

}