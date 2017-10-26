$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: '/js/stories.json',
    data: "",
    async: true,
    dataType: 'json',
    success: function(data) {
      // load categories of stories into arrays
      var builtStories = {};

      $.each(data.stories, function(category, stories){
        builtStories[category] = [];
        stories.forEach(function(story){
          builtStories[category].push('<a href="' + story.link + '"><img src="/img/stories/' + story.photo + '" alt="' + story.alt + '"></a>');
        });
      });


      // data.stories.community.forEach(function(story){
      //   stories.push('<a href="' + story.link + '"><img src="/img/stories/' + story.photo + '" alt="' + story.alt + '"></a>');
      // });

      // Put the first story in featured area, rest in other area
      $('#stories-feat').append(builtStories['community'][0]);
      $('#stories').append(builtStories['community'].slice(1).join(""));
    }
  });
});

