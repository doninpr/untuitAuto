/*
Description: пока не ясно

Author: Priney (prineypriney@gmail.com);
*/

var time = 6000;
var rating = 4;
var percent = 80;
var attempts = 0;
var wrong = 0;
var numb_answ_rnd = 20;
array_wrong = [];

for (var i = wrong - 1; i >= 0; i--) {
    array_wrong[i] = Math.floor((Math.random() * numb_answ_rnd) + 1);
    console.log("Номер ошибки: "+array_wrong[i]);
};

//жмем пересдать тест
function re_test(){
    console.log("Ищем кнопку \"просмотреть ответы\":");
    if(document.getElementsByClassName("td eoi-left")[0] != undefined){
        //console.log("---Жмем");
        document.getElementsByClassName("td eoi-left")[0].getElementsByTagName("a")[1].onclick = function() { setTimeout(checked_answers, 1000) };
        if(//+document.getElementById("test-results-table").getElementsByClassName("odd")[2].getElementsByClassName("value")[0].innerText.split("(")[1].split(")")[0] !== rating &&
           //+document.getElementsByClassName("value")[3].innerHTML.split(" ")[0] >= percent &&
           //+document.getElementsByClassName("value")[0].innerHTML <= attempts
           true
           ){
            console.log("Номер попытки: "+document.getElementsByClassName("value")[0].innerHTML);
            console.log("Баллы: "+document.getElementsByClassName("value")[3].innerHTML);
            document.getElementsByClassName("td eoi-left")[0].getElementsByTagName("a")[1].click();
        }
    } else {
        console.log("---Не найдено");
    }

    console.log("Ищем кнопку пересдать тест:");
    if(+document.getElementById("test-results-table").getElementsByClassName("odd")[2].getElementsByClassName("value")[0].innerText.split("(")[1].split(")")[0] >= 3){
        //document.getElementsByClassName("ajax-command-button")[1].click();
        //document.getElementsByClassName("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only command-button")[1].click();
    } else {
        if(document.getElementsByClassName("td eoi-right")[0] != undefined){
            console.log("---Жмем пересдать тест");
            //document.getElementsByClassName("td eoi-right")[0].getElementsByTagName("a")[0].click();
        } else {
            console.log("---Не найдено");
        }
    }
}

//соглашаемся с правилами и начинаем новый тест
function start_test(){
    console.log("Ищем метку лицензионоого соглашения:");
    if(document.getElementsByClassName("option")[0].getElementsByTagName("input")[0] != undefined){
        document.getElementsByClassName("option")[0].getElementsByTagName("input")[0].click();
        document.getElementsByClassName("continue-button ajax-command-button")[0].onclick = function() { setTimeout(get_answer, time) };
        setTimeout(function(){document.getElementsByClassName("continue-button ajax-command-button")[0].click();}, 11*64*1000);
        console.log("---Принимаем соглашение, начинаем тест");
    } else {
        console.log("---Не найдено");
    }
}

//отвечаем на вопрос
function get_answer(){
    console.log("Определяем диалоговое окно...");
    if(document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable")[0].getElementsByClassName("answer")[0] != undefined){
        //определяем id теста
        document.getElementsByClassName("ajax-command-button")[2].onclick = function() { setTimeout(get_answer, time) };

        test_id = document.getElementById("test-task-form").getElementsByTagName("input")[5].value;
        //console.log("id теста: "+test_id);
        //определяем id вопроса
        eoi_id = document.getElementById("edi_eoi_task").value;
        console.log("id вопроса: "+eoi_id);
        mumbr_task = +document.getElementsByClassName("title-ex")[0].innerHTML.split(" ")[1].split("(")[1].split("-")[0];
        //var ar_get = eoi_id;
        //var ar_get_result = [];
        //chrome.storage.local.get(ar_get, function(result) { ar_get_result = result[eoi_id] } );
        //console.log("Получаем данные с storage...");
        ar_get_result = localStorage[eoi_id];
        //проверяем, встречался ли этот вопрос
        //console.log("ищем вопрос в базе...");
        if(ar_get_result != undefined){
            //если да проверяем есть ли ответ на вопрос
            console.log("---Вопрос найден...");
            console.log("---определяем, есть ли ответ на вопрос:");
            if(ar_get_result.match(/^[-\+]?\d+/) === null){
                //если да проставляем верный
                answer_array_click = ar_get_result.split(" ");
                for (var is = answer_array_click.length - 1; is >= 0; is--) {
                    console.log("------Ответ найден: "+answer_array_click[is]);
                    if(answer_array_click[is] !== ""){
                        //document.getElementById(answer_array_click[is]).click();
                        click_answer(answer_array_click[is], mumbr_task);
                        //leave_comment(answer_array_click[is]);
                    }
                };
            } else {
                console.log("------ОТВЕТ НЕ НАЙДЕН");
                
                console.log("------Ответ не найден...подбираем вариант ответа:");
                //если нет, получаем последний отмеченный ответ на вопрос +1
                answer = +ar_get_result+1;

                if(answer === 1235){
                    answer = 1;
                };

                if(answer === 235){
                    answer = 1234;
                };

                if(answer === 135){
                    answer = 234;
                };

                if(answer === 125){
                    answer = 134;
                };

                if(answer === 35){
                    answer = 123;
                };

                if(answer === 25){
                    answer = 34;
                };

                if(answer === 15){
                    answer = 23;
                };

                if(answer === 5){
                    if(document.getElementsByName("test_type")[0].value === "multiple"){
                        answer = 12;
                    } else {
                        answer = 1;
                    }
                };

                localStorage[eoi_id] = answer;
                if(document.getElementsByName("test_type")[0].value === "multiple" && answer >= 12){
                    answer_array = String(answer).split("");
                    for (var i = answer_array.length - 1; i >= 0; i--) {
                        answer_array[i] = "variant_"+answer_array[i];
                        console.log("------Выбран "+answer_array[i]);
                        if(document.getElementById(answer_array[i]) !== null){
                            click_answer(answer_array[i], mumbr_task);
                            //leave_comment(answer_array[i]);
                            //document.getElementById(answer_array[i]).click();
                        }
                    };
                } else {
                    answer = "variant_"+answer;
                    if (document.getElementById(answer) !== null) {
                        click_answer(answer, mumbr_task);
                        //leave_comment(answer);
                        //document.getElementById(answer).click();
                    };
                }
                console.log("------"+answer);
                
            }
        } else {
            console.log("---Вопрос не найден...");
            var new_eoi = 1;
            localStorage[eoi_id] = new_eoi;
            //берем первый ответ
            answer = "variant_1";
            //console.log("---Добавляем в базу");
            console.log("---Подбираем ответ: "+answer);
            click_answer(answer, mumbr_task);
            //leave_comment(answer);
            //document.getElementById(answer).click();
        }
        if(document.getElementById("ui-id-1").innerHTML.split(" ")[0]=="Тест"){
            document.getElementsByClassName("ajax-command-button")[2].click();
        } else {
            //document.getElementsByClassName("ajax-command-button")[2].click(); //убрать когда экзамен
        };
    } else {
        console.log("Не найдено!");
        location.reload(true);
    }
}



function click_answer(id_answ, numb_answ){
    click = true;
    for (var i = array_wrong.length - 1; i >= 0; i--) {
        if(numb_answ !== array_wrong[i] && click ){
            click = true;
        } else {
            click = false;
            i = -1;
        };
    };
    click = true;
    if(click){
        document.getElementById(id_answ).click();
    }
}

function leave_comment(answ){
    answ = +answ.split("_")[1];
    for (var i = document.getElementsByClassName("wrapper").length - 1; i >= 0; i--) {
        if(+document.getElementsByClassName("wrapper")[i].getElementsByTagName("input")[0].value === answ){
            console.log("Оставляем коментарий");
            document.getElementById("leave-comment-for-task").click();
            document.getElementById("comment_text").value = document.getElementById("comment_text").value+document.getElementsByClassName("wrapper")[0].getElementsByClassName("right")[0].innerHTML;
            document.getElementsByClassName("ui-button-text button-center")[0].click();
        }
    };
}

function checked_answers(){
    task_list = document.getElementsByClassName("task_list_item");
    for (var i = task_list.length - 1; i >= 0; i--) {
        if(task_list[i].getElementsByClassName("task_no correct")[0] !== undefined){
            task_id = task_list[i].getElementsByClassName("comment_link")[0].id.split("_")[1];
            answer_numbr = localStorage[task_id];
            if(answer_numbr.match(/^[-\+]?\d+/) === null){
                localStorage[task_id] = answer_numbr;
            } else {
                if(+answer_numbr > 4){
                    answers_array = String(answer_numbr).split("");
                    answer_numbr = "";
                    for (var i = answers_array.length - 1; i >= 0; i--) {
                        answers_array[i] = "variant_"+answers_array[i];
                        answer_numbr = answer_numbr+" "+answers_array[i];
                    };
                    localStorage[task_id] = answer_numbr;
                    console.log("ДОБАВЛЕН: "+task_id+" - "+localStorage[task_id]);
                    //show_notify("Найден ответ:", task_id+" - "+localStorage[task_id]);
                } else {
                    localStorage[task_id] = "variant_"+answer_numbr;
                    console.log("ДОБАВЛЕН: "+task_id+" - "+localStorage[task_id]);
                    //show_notify("Найден ответ:", task_id+" - "+localStorage[task_id]);
                }
            }
        }
    };
}

//BROKEN
function show_notify(header, text){
    var notification = new Notification(header, {
        lang: 'ru-RU',
        body: text,
        icon: "http://storage1.static.itmages.ru/i/15/0130/h_1422651219_1197126_5377815ad8.png"
    });
}

if(document.getElementsByClassName("option")[0] !== undefined){
    start_test();
} else {
    re_test();
}

