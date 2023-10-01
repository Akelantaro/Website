$(document).ready(function () {
    const userLink = $("#user__name").first();
    $.ajax({
        url: '/account/token',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                userLink.text(data.msg);
                $("#prothile_fname").text(data.msg);
                userLink.attr("href", "prothile.html");
            }
        }
    });
});

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
    else {
        $.ajax({
            url: '/account/reg',
            method: 'post',
            dataType: 'json',
            data: {login: login, password: password},
            success: function (data) {
                if (data.success) {
                    alert("Вы успешно зарегистрировались");
                    window.location.href = "/auth.html";
                } else {
                    alert(data.msg);
                }
            }
        });
    }
}

function authication() {
    let form = document.forms[0];
    let login = form.elements.login.value;
    let password = form.elements.password.value;
    if (login === "") alert("Введите имя пользователя");
    else if (password === "") alert("Введите пароль");
    else {
        $.ajax({
            url: '/account/auth',
            method: 'post',
            dataType: 'json',
            data: {login: login, password: password},
            success: function (data) {
                if (data.success) {
                    alert("Вы успешно авторизировались");
                    window.location.href = "/";
                } else alert(data.msg);
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
            if (data.success) {
                alert("Вы вышли из учетной записи");
                window.location.href = "/";
            } else alert(data.msg);
        }
    });
}
