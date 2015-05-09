define([
  "hbs!templates/partials/show-more"
], function (ShowMore) {
  return function bootstrapEmbedVideo (register) {
    register("video", /(\.(webm|gifv)$)|(^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*)/i, {
      title: "Videos",
      enabled: true,
      autoplay: { type: "checkbox", value: false },
      loop: { type: "checkbox", value: true },
      volume: { type: "text", value: 0 }
    },
    function (link, settings) {
      var url = link.url;
      var match = new RegExp("^.*(?:youtu.be\\/|v\\/|e\\/|u\\/\\w+\\/|embed\\/|v=)([^#\\&\\?]*).*").exec(url);
      if (match) {
        var id = match[1].replace(" ", "");
        var ytVideo = $("<iframe width=\"600\" height=\"400\" src=\"https://www.youtube.com/embed/" + id + "?html5=1\" frameborder=\"0\" allowfullscreen></iframe>");
        link.div.append(ShowMore({
          icon: "code",
          title: "Toggle Attached Video",
          ele: link.selector,
          show: ".video-holder"
        }));
        link.div.append($(ytVideo).wrap("<div class=\"video-holder\"></div>").parent());
      } else {
        // Special handling for gifv, which should be rewritten to webm as it is not supported by the video tag
        if (String(url).match(/\.gifv$/i)) {
          url = (String(url).replace(/\.gifv$/i, ".webm"));
        }
        var video = $("<video src=\"" + url + "\" style=\"max-width: 600px; max-height: 400px\"></video>");

        video.prop("controls", true)
            .prop("autoplay", settings.autoplay.value)
            .prop("loop", settings.loop.value)
            .prop("volume", settings.volume.value);

        link.div.append(ShowMore({
          icon: "code",
          title: "Toggle Attached Video",
          ele: link.selector,
          show: ".video-holder"
        }));

        link.div.append($(video).wrap("<div class=\"video-holder\"></div>").parent());

      }
    });
  };
});
