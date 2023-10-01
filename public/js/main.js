const trainers = ["Спартак", "Юлия", "Анатолий", "Анизоро"];
const headerHeight = "80px";
const groupPrograms = ["Йога", "Атлетика", "Здоровая спина"];
let groups = [false, false, false];
let individual = [false, false, false, false];
let individualUser = "";
let tokenLogin = "";
let groupsNumbers = [3, 3, 3];
$(document).ready(function () {
    const sodMenuLink = $(".sod_menu");
    const headerSodLink = $(".header_links_sod");
    const introLink = $(".intro");
    const headerLink = $(".header");
    const trainerLink = [$("#trainer1"), $("#trainer2"), $("#trainer3"), $("#trainer4")]
    const groupNumberLink = [$("#group_nubmer_1"), $("#group_nubmer_2"), $("#group_nubmer_3")]
    const groupProgramLink = [$("#group_program1"), $("#group_program2"), $("#group_program3")]
    const navLink = $('.nav');
    const introInfoIconsLink = $('.introInfoIcons');
    const introInfoImageLink = $('.introInfoImage');
    const userLink = $("#user__name");
    $("body").children().children().css("display", "none");
    $("body").children().children().fadeIn(1000);
    introLink.attr("id", "top");
    headerSodLink.hover(function () {
            sodMenuLink.stop();
            sodMenuLink.fadeIn(500);
        },
        function () {
            sodMenuLink.stop();
            sodMenuLink.fadeOut(500);
        });

    function HeaderWidth() {
        if ($(window).width() < 1054) {
            navLink.css("display", "none");
            headerSodLink.fadeIn(1000);
            introInfoIconsLink.css("display", "none");
            introInfoImageLink.css("width", "100%");
        } else {
            headerSodLink.css("display", "none");
            navLink.fadeIn(1000);
            introInfoIconsLink.css("display", "flex");
            introInfoImageLink.css("width", "50%");
        }
    }

    HeaderWidth();
    $(window).bind('resize', function () {
        HeaderWidth()
    });

    $(".scroll").on("click", "a", function (event) {
        event.preventDefault();
        const id = $(this).attr('href');
        const top = $(id).offset().top - 20 - headerHeight.replace("px", "");
        $('body,html').animate({scrollTop: top}, 1000);
    });
    sodMenuLink.css("top", headerHeight)
    headerLink.css("height", headerHeight);
    introLink.css("margin-top", headerHeight);
    $(".Reg").css("margin-top", headerHeight);
    $.ajax({
        url: '/programs/programNumbers',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i <= 2; i++) {
                groupsNumbers[i] -= data.msg[i];
                groupNumberLink[i].text("Количество оставшихся мест:   " + groupsNumbers[i]);
                if (groupsNumbers[i] <= 0) {
                    groupProgramLink[i].attr("value", "  Мест нет  ");
                    groupProgramLink[i].css("background-color", "#D7D7D7");
                    groupProgramLink[i].css("color", "#FFA812");
                }
            }
        }
    });
    $.ajax({
        url: '/trainers/getTrainers',
        method: 'post',
        dataType: 'json',
        data: {trainers: trainers},
        success: function (data) {
            individual = data.msg;
            for (let i = 0; i <= trainers.length - 1; i++) if (individual[i]) {
                trainerLink[i].attr("value", "  Тренер занят  ");
                trainerLink[i].css("background-color", "#D7D7D7");
                trainerLink[i].css("color", "#FFA812");
            }
        }
    });
    $.ajax({
        url: '/account/token',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                tokenLogin = data.msg;
                userLink.text(tokenLogin);
                userLink.attr("href", "prothile.html");
                $("#username").text(tokenLogin);
                $.ajax({
                    url: '/programs/programRecordCheck',
                    method: 'post',
                    dataType: 'json',
                    data: {login: tokenLogin},
                    success: function (data1) {
                        for (let i = 0; i <= 2; i++) if (data1.msg[i]) {
                            groups[i] = true;
                            groupProgramLink[i].attr("value", "  Отменить запись  ");
                            groupProgramLink[i].css("background-color", "#FFA812");
                            groupProgramLink[i].css("color", "white");
                            $("#profileGroup").css("display", "flex");
                            $("#profileGroup").append("<a>" + groupPrograms[i] + "</a>");
                            $("#profileGroup a").attr("href", "groupprogramms.html");
                        }
                    }
                });
                $.ajax({
                    url: '/trainers/trainerRecordCheck',
                    method: 'post',
                    dataType: 'json',
                    data: {user: tokenLogin},
                    success: function (data1) {
                        if (data1.success) individualUser = data1.msg
                        for (let i = 0; i <= 3; i++) if (trainers[i] === individualUser) {
                            trainerLink[i].attr("value", "  Отменить запись  ");
                            trainerLink[i].css("background-color", "#FFA812");
                            trainerLink[i].css("color", "white");
                            $("#profileTrainer").css("display", "flex");
                            $("#profileTrainer").append("<a>" + trainers[i] + "</a>");
                            $("#profileTrainer a").attr("href", "trainersinfo.html");
                        }
                    }
                })
            }
        }
    })
})


function registration() {
    let form = document.forms[0];
    let login = form.elements.login.value;
    let password = form.elements.password.value;
    let password_2 = form.elements.password_2.value;
    if (login === "") alert("Введите имя пользователя");
    else if (login.length < 3 || login.length > 20) alert("Имя пользователя должно содержать от 3 до 20 символов");
    else if (password === "") alert("Введите пароль");
    else if (password.length < 5 || password.length > 20) alert("Пароль должен содержать от 5 до 20 символов");
    else if (password !== password_2) alert("Пароли должны совпадать");
    else $.ajax({
            url: '/account/registration',
            method: 'post',
            dataType: 'json',
            data: {login: login, password: password},
            success: function (data) {
                alert(data.msg);
                if (data.success) window.location.href = "auth.html";
            }
        });
}

function authentication() {
    let form = document.forms[0];
    let login = form.elements.login.value;
    let password = form.elements.password.value;
    if (login === "") alert("Введите имя пользователя");
    else if (password === "") alert("Введите пароль");
    else {
        $.ajax({
            url: '/account/authentication',
            method: 'post',
            dataType: 'json',
            data: {login: login, password: password},
            success: function (data) {
                alert(data.msg);
                if (data.success) window.location.href = "/";
            }
        });
    }
}

function Logout() {
    $.ajax({
        url: '/account/logout',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            alert(data.msg);
            if (data.success) window.location.href = "/";
        }
    });
}

function RecordProgram(number) {
    if (tokenLogin === "") {
        alert("Вы не авторизованны");
        window.location.href = "auth.html";
    } else if (groups[number]) RemoveProgram(number)
    else if (groupsNumbers[number] <= 0) alert("Мест нет")
    else {
        $.ajax({
            url: '/programs/recordProgram',
            method: 'post',
            dataType: 'json',
            data: {login: tokenLogin, number: number},
            success: function (data) {
                if (data.success) location.reload();
                alert(data.msg)
            }
        });
    }
}

function RemoveProgram(number) {
    $.ajax({
        url: '/programs/removeProgram',
        method: 'post',
        dataType: 'json',
        data: {number: number, user: tokenLogin},
        success: function (data) {
            alert(data.msg)
            location.reload()
        }
    });
}

function RecordTrainer(trainer) {
    if (tokenLogin === "") {
        alert("Вы не авторизованны");
        window.location.href = "auth.html";
    } else if (individualUser === trainers[trainer]) removeTrainer(trainers[trainer])
    else if (individual[trainer]) alert("Тренер занят")
    else if (individualUser !== "") alert("Можно записаться максимум к 1 тренеру")
    else {
        $.ajax({
            url: '/trainers/RecordTrainer',
            method: 'post',
            dataType: 'json',
            data: {trainer: trainers[trainer], user: tokenLogin},
            success: function (data) {
                alert(data.msg)
                location.reload()
            }
        });
    }
}

function removeTrainer(trainer) {
    $.ajax({
        url: '/trainers/removeTrainer',
        method: 'post',
        dataType: 'json',
        data: {trainer: trainer},
        success: function (data) {
            alert(data.msg)
            location.reload()
        }
    });
}

function addTrainers() {
    $.ajax({
        url: '/trainers/addTrainers',
        method: 'post',
        dataType: 'json',
        data: {trainers: trainers},
        success: function (data) {
            alert(data.msg);
        }
    })
}