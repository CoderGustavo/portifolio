$(window).on('load', function(){
    let theme = sessionStorage.getItem("theme");
    let menu_lateral = sessionStorage.getItem("menu_lateral");
    if(theme == "dark"){
        $("#theme_switch").prop("checked", true);
        $("body").addClass("dark");
    }else if(theme == "light"){
        $("#theme_switch").prop("checked", false);
        $("body").addClass("light");
    }
    if(menu_lateral == "opened"){
        open_menu();
    }else{
        close_menu();
    }
});

$(".btn-toggle").on('click', function(e){
    e.preventDefault();
    if($(".menu-lateral").width() == 234){
        close_menu();
    }else{
        open_menu();
    }
});

function open_menu(){
    $(".menu-lateral").css("width","250");
    $(".btn-toggle > div > i").removeClass("fa-align-left");
    $(".btn-toggle > div > i").addClass("fa-times");
    setTimeout(() => {
        $(".menu-lateral a > div > span").removeClass("tooltip_style");
        $(".menu-lateral a > div").removeClass("tooltip_active");
    }, 400);
    $(".menu-lateral a.logo > div > img").width("150px");
    $(".menu-lateral a.logo > div").css("margin-top", "20px");
    $(".menu-lateral a.logo > p").css("display", "block");
    sessionStorage.setItem('menu_lateral', 'opened');
    if(window.innerWidth <= 700){
        $(".menu-lateral").addClass("mobile");
    }
}

function close_menu(){
    $(".menu-lateral").css("width","64");
    $(".btn-toggle > div > i").addClass("fa-align-left");
    $(".btn-toggle > div > i").removeClass("fa-times");
    $(".menu-lateral a > div > span").addClass("tooltip_style");
    $(".menu-lateral a > div").addClass("tooltip_active");
    $(".menu-lateral a.logo > div > img").width("45px");
    $(".menu-lateral a.logo > div").css("margin-top", "45px");
    $(".menu-lateral a.logo > p").css("display", "none");
    sessionStorage.setItem('menu_lateral', 'closed');
    if(window.innerWidth <= 700){
        $(".menu-lateral").removeClass("mobile");
    }
}

$("#theme_switch").on('click', function(){
    if($("body").hasClass("dark")){
        $("body").addClass("light");
        $("body").removeClass("dark");
        sessionStorage.setItem('theme', 'light');
    }else{
        $("body").addClass("dark");
        $("body").removeClass("light");
        sessionStorage.setItem('theme', 'dark');
    }
});

var texto_digitacao = document.querySelector(".efeito-digitacao");
var element = texto_digitacao.innerHTML;

function digitar(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    
    textoArray.forEach(function(letra, i){   
        setTimeout(function(){
            elemento.innerHTML += letra;
        }, 80 * i)
    });
    
    setTimeout(function(){
        var aa = elemento.innerHTML;
        textoArray.forEach(function(letra, i){   
            setTimeout(function(){
                elemento.innerHTML = aa.slice(0, -i-1);
            }, 80 * i)
        });
        setTimeout(function(){
            mudartexto(elemento);
        }, 1500)
    }, 2000);
}

function mudartexto(elemento){
    if(element == "Front-End"){
        elemento.innerHTML = "Back-End";
    }else{
        elemento.innerHTML = "Front-End";
    }
    element = elemento.innerHTML;
    digitar(elemento);
}

digitar(texto_digitacao);

const menu_int = document.querySelectorAll("a[href^='#']");
const sections = document.querySelectorAll("div[id]");
const itens_page = document.querySelectorAll("[data-animation]");

const onScroll = () => {
    const top = window.pageYOffset + window.innerHeight*0.85;
    itens_page.forEach(element =>{
        if(top > element.offsetTop){
            element.classList.add("animate");
        }else{
            element.classList.remove("animate");
        }
    });
    sections.forEach(element =>{
        console.log(element.offsetTop)
        if(top > element.offsetTop){
            $("a[href='#"+$(element).attr("id")+"']").addClass("activate");
            $("a[href='#"+$(element).attr("id")+"']").siblings().removeClass("activate");
        }else{
            $("a[href='#"+$(element).attr("id")+"']").removeClass("activate")
        }
    })
}
onScroll();

menu_int.forEach(element =>{
    $(element).on('click', (e) => {
        e.preventDefault();
        let section = document.querySelector($(element).attr("href"));
        $(element).addClass("activate");
        $(element).siblings().removeClass("activate");
        $("html, body").animate({
            scrollTop: section.offsetTop
        }, 500, 'swing')
    });
});


$(window).on("scroll", ()=>{
    onScroll();
})
