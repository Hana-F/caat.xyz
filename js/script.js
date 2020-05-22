var aboutOn = false;
var linksOn = false;

var aboutMeString = "";
var linkDivString = "";
var linkStrings = [4];

var welcomeMessage;

var divAbout;
var divLinks;

(function()
{
    $("#mainContent").hide();
})();

$(document).ready(function()
{
    welcomeMessage = Math.floor(Math.random() * 10);
    $.ajax({
        type: "GET",
        url: "xml/aboutme.xml",
        dataType: "xml",
        success: function(xml) {
         //remainder of the code
         $(xml).find("about").each(function()
         {
             $(this).find("links").children().each(function(index, element)
             {
                linkStrings[index] =  $(element).text();
             })
             aboutMeString = $(this).find("info").text();
             buttonRemove();
         })
        },
        error: function() {
            alert("aboutme.xml failed to load.");
            }
        });
});

function buttonRemove()
{
    /* If JS is enabled, it will remove link buttons, and replace them with buttons for the XML doc */
    $("a").remove();
    $("<div id=\"divLinks\"></div>").prependTo("#buttons");
    $("<button id=\"linkButton\">Links</button>").prependTo("#buttons");
    $("<br>").prependTo("#buttons");
    $("<div id=\"divAbout\"></div>").prependTo("#buttons");
    $("<button id=\"aboutMeButtton\">About Me</button>").prependTo("#buttons");
    /* Change header text according to random number */ 
    if(welcomeMessage < 5)
    {
        $("h1").text("ようこそう");
    }
    /* Adding text and classes to the about div */
    addAbout();
    /* Adding links to the divLinks div. */
    addLinks();
    /* This will add an event listener for clicking the buttons*/
    $("#aboutMeButtton").click(aboutMeShow);
    $("#linkButton").click(linkShow);
    /* After everything is done loading is will now show it */
    $("#mainContent").show();
}
function addLinks()
{
    divLinks = $("#divLinks");
    divLinks.hide();
    divLinks.addClass("animate__animated animate__fadeIn");
    divLinks.prepend("<i class=\"fab fa-github-square\"></i> <a href="+"\""+linkStrings[3]+"\""+">Github</a><br>");
    divLinks.prepend("<i class=\"fab fa-steam-square\"></i> <a href="+"\""+linkStrings[2]+"\""+">Steam</a><br>");
    divLinks.prepend("<i class=\"fab fa-discord\"></i> <span>"+linkStrings[1]+"</span><br>");
    divLinks.prepend("<i class=\"fab fa-twitter-square\"></i> <a href="+"\""+linkStrings[0]+"\""+">Twitter</a><br>");
}

function addAbout()
{
    divAbout = $("#divAbout");
    divAbout.hide()
    divAbout.addClass("animate__animated animate__fadeIn");
    divAbout.prepend("<p>"+ aboutMeString +"</p>")
}

function aboutMeShow()
{
    divAbout.toggle();
}

function linkShow()
{
    divLinks.toggle();
}