$( document ).ready(function()
  {
    setCookies();
    const firstname = localStorage.getItem("firstname");//получение переменной имя
    const secondname = localStorage.getItem("secondname");//получение переменной фамилия
    const email = localStorage.getItem("email");//получение переменной имя
    const phone = localStorage.getItem("phone");//получение переменной фамилия
    const about = localStorage.getItem("about");//получение переменной имя
    const userLink = $("#user__name").first();//созданние указателя на гиперссылку
    const prothile_fname = $("#prothile_fname").first();
    const prothile_sname = $("#prothile_sname").first();
    const prothile_email = $("#prothile_email").first();
    const prothile_phone = $("#prothile_phone").first();
    const prothile_about = $("#prothile_about").first();
    if (firstname)
    {
        userLink.text(firstname + ' ' + secondname);
        userLink.attr("href", "prothile.html");
        prothile_fname.text(firstname);
        prothile_sname.text(secondname);
        prothile_email.text(email);
        prothile_phone.text(phone);
        prothile_about.text(about);
    }
  });

function setCookies() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const firstname = urlParams.get("firstname");
  const secondname = urlParams.get("secondname");
  const email = urlParams.get("email");
  const phone = urlParams.get("phone");
  const about = urlParams.get("about");
  if (firstname != null)
  {
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('secondname', secondname);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('about', about);
  }
}

function logout()
{
  localStorage.clear();
  window.location.href="/";
}
