var allImages = "";
var bottomRImages = "";
var bottomLImages = "";
var featuredImage = "";
var alt_1 = "";
var alt_2 = "";
var alt_3 = "";
var alt_4 = ""; //Featured
var alt_5 = "";
for (var i = 1; i < 5; i++) {
  featuredImage = '<a href="#"><img src="/img/stories/story-00.jpg" alt="Featured-Story-' + i + '"></a>';
  allImages += '<a href="#"><img src="/img/stories/story-0' + i + '.jpg" alt="Stories-' + i + '"></a>';
}
$('#stories-feat').append(featuredImage);
$('#stories').append(allImages);
for (var i = 5; i < 7; i++) {
  bottomLImages += '<a href="#"></img/stories/story-0' + i + '.jpg"></a>';
}
$('#stories-0').append(bottomLImages);
for (var i = 7; i < 9; i++) {
  bottomRImages += '<a href="#"></img/stories/story-0' + i + '.jpg"></a>';
}
$('#stories-1').append(bottomRImages);
