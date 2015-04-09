$.getScript("./js/features/map.js", function() {

});

/*
 *  Get cosine similarity value
 *
 */

function getCosineSimilarityValue() {
    var question_1 = document.getElementById("question_1").value;
    var map_1 = questionToVector(question_1);

    var question_2 = document.getElementById("question_2").value;
    var map_2 = questionToVector(question_2);

    var cosineSimilarityValue = calCosineSimilarity(map_1, map_2);
    document.getElementById("cosine").value = cosineSimilarityValue;
}

/*
 *  Convert question to Vector based on
 *  number of times words occurred
 */

function questionToVector(question) {

    var splitted_str = question.split(" ");
    var hashMap = new Map();

    for (var i in splitted_str) {

        if (hashMap.containsKey(splitted_str[i])) {
            var times = hashMap.get(splitted_str[i]).val;
            hashMap.put(splitted_str[i], {
                'key': splitted_str[i],
                'val': times + 1
            });
        } else {
            hashMap.put(splitted_str[i], {
                'key': splitted_str[i],
                'val': 1
            });
        }
    }
    return hashMap;
}

/*
 *  Cosine = numerator/denominator;
 *
 */
function calCosineSimilarity(question_vector_1, question_vector_2) {

    var numerator = calNumerator(question_vector_1, question_vector_2);
    var denominator = calDenominator(question_vector_1, question_vector_2);

    var cosine = numerator / denominator;
    alert("cosine is " + cosine);
    return cosine;
}

/*
 *  Numerator
 *     - get intersection of the words in two questions
 *     - multiply them by number of occurrences
 */
function calNumerator(question_vector_1, question_vector_2) {
    var numerator = 0;

    function iterator(mapEntry) {

        if (question_vector_2.containsKey(mapEntry.key)) {
            //alert(':::mapEntry.val::: ' + mapEntry.val + ' :::mapEntry.key::: ' + question_vector_2.get(mapEntry.key).val);
            numerator += mapEntry.val * question_vector_2.get(mapEntry.key).val;
        }
    }

    question_vector_1.forEach(iterator);
    alert('numerator is: ' + numerator);
    return numerator;
}

/*
 *  Denominator
 *     - sqrt ( |question_vector_1| * |question_vector_2|) 
 *     
 */
function calDenominator(question_vector_1, question_vector_2) {
    var denominator = 0;
    var sum_1 = 0;
    var sum_2 = 0;

    function iterator_1(mapEntry) {
        sum_1 += Math.pow(mapEntry.val, 2);
    }
    question_vector_1.forEach(iterator_1);

    function iterator_2(mapEntry) {
        sum_2 += Math.pow(mapEntry.val, 2);
    }
    question_vector_2.forEach(iterator_2);

    denominator = Math.sqrt(sum_1 * sum_2);

    alert('denominator is: ' + denominator);
    return denominator;
}