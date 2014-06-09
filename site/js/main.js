(function() {
  var boba = document.querySelector(".hero__image");
  var k = new Konami;
  k.code = function () { boba.classList.add("trippy") };
  k.load();

  var tracker = new Boba;

  // Track links with data attributes.
  tracker.trackLinks();

  // Track click in the readme.
  tracker.watch("click", ".readme a", function(event) {
    var linkText = $(event.currentTarget).text();
    return {
      category: "Readme",
      action: "Link click",
      label: linkText
    };
  });
}());

