var startDate = '2015-07-06T09:30:46-0700';
var endDate = new Date().toISOString();
// console.log(endDate);
var repoCount = 0;
var commits = [];
callGitHub();
var commitCount = 0;
var count = 0;


$(window).load(function() {
        $('.loader').show();
});


$(window).scroll(function() {
    if ($(document).scrollTop() > 199) {
      $(".navbar-default").addClass("navBarColor");
    } else {
      $(".navbar-default").removeClass("navBarColor");
    }
  });


$(document).on('ready', function() {
    $.ajax ({
        method:  "GET",
        url:  "/github"
    })
    .done(function(msg) {

    });
});


// Github API requirements
function callGitHub () {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
};

    $.ajax({
        url: "https://api.github.com/authorizations",
        method:"POST",
        data: JSON.stringify({
            "client_id":config.client_id,
            "client_secret":config.client_secret,
            "note": "Personal Project",
            "scopes": [
            "public_repo"
            ]
        }),
        dataType: "json",
        headers:{
            Authorization:"Basic " + config.basic_auth
        }
    }).done(function(data){
        localStorage.setItem("token", data.token);
        updateGithubCommits();

    });


    console.log('sanity check!');


function updateGithubCommits() {
    $.ajax({
        // the default for showing count or repoCount is 30. I changed the number to 1000 below.
        url: 'https://api.github.com/user/repos?page=1&per_page=1000',
        headers: {
            Authorization: "token " + localStorage.getItem("token")
        }
    }).done(function(data, cb) {
        repoCount = data.length;
        data.forEach(function(repo) {
            countCommits(repo.name);

        });



    // $('#github p').html("I currently have " + repoCount + " repos and " + addCommits() + " commits on Github.");
        // console.log(count);
        // console.log(repoCount);
    });

}

function countCommits(repoName) {
    $.ajax({
        url: 'https://api.github.com/repos/ChipMorris10/' + repoName + '/commits?since=' + startDate + '&until=' + endDate,
        headers: {
            Authorization: "token " + localStorage.getItem("token")
        },
        async: true
    }).done(function(data) {
        commits.push(data);
        commitCount += data.length;
        count ++;

        if(count === repoCount){
            $('#github p').html("I currently have " + repoCount + " repos and " + commitCount + " commits on Github.");
            $('.loader').hide();
            }


    }).fail(function(data) {
        console.log('no commits');
    });
}





