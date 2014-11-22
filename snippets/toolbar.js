var jheatmap = require("jheatmap");
$('#heatmap').heatmap(
  {
  data: {
    values: new jheatmap.readers.GctHeatmapReader({ url: "./toolbar/aadac_shrna.gct", colAnnotationUrl: './toolbar/Achilles_v2.4_SampleInfo_small.txt' })
  },

  init: function (heatmap) {

    // Column annotations
    heatmap.cols.decorators["Type"] = new jheatmap.decorators.CategoricalRandom({unknown: "#FFFFFF"});
    heatmap.cols.decorators["Subtype"] = new jheatmap.decorators.CategoricalRandom({unknown: "#FFFFFF"});
    heatmap.cols.annotations = ["Type", "Subtype"];

    // Override default paintCellDetails function
    heatmap.paintCellDetails = paintCellDetails;

    // Hide the keyboard shortcuts link and the cell value selector.
    heatmap.controls.shortcuts = false;
    heatmap.controls.cellSelector = false;

    // Set columns label canvas height
    heatmap.cols.labelSize = 330;

    // Initialize toolbar
    $('#hideSelectedBtn').click( function(e) {
      action = new jheatmap.actions.HideSelected(heatmap);
      action.columns();
    });

    $('#showHiddenBtn').click(function (e) {
      action = new jheatmap.actions.ShowHidden(heatmap);
      action.columns();
    });

    $('#clearSelectionBtn').click(function (e) {
      action = new jheatmap.actions.ClearSelection(heatmap);
      action.rows();
      action.columns();
    });

    $('#clearHighlightBtn').click(function (e) {
      heatmap.search = null;
      heatmap.drawer.paint();
    });

    $('#highlightBtn').click(function (e) {
      heatmap.search = $('#highlightText').val();
      heatmap.drawer.paint();
    });
  }
}
);


function paintCellDetails(row, col, heatmap, boxTop, boxLeft, details) {

  var val = heatmap.cells.getValue(row, col, 0);

  if (!isNaN(val) && (val % 1 != 0)) {
    val = Number(val).toFixed(3);
  }

  var boxWidth;
  var boxHeight;

  var boxHtml = "<dl class='dl-horizontal'>";
  boxHtml += "<dt>Column</dt><dd>" + heatmap.cols.getValue(col, heatmap.cols.selectedValue) + "</dd>";
  boxHtml += "<dt>Row</dt><dd>" + heatmap.rows.getValue(row, heatmap.rows.selectedValue) + "</dd>";
  boxHtml += "<dt>Value</dt><dd>" + val + "</dd>";
  boxHtml += "<hr />";
  for (var i = 0; i < heatmap.cols.header.length; i++) { // use col headers not cell headers as is default
    if (heatmap.cols.header[i] == undefined) {
      continue;
    }
    boxHtml += "<dt title='" + heatmap.cols.header[i] + "'>" + heatmap.cols.header[i] + ":</dt><dd>";
    val = heatmap.cols.getValue(col, i)
    //
    boxHtml += ("&nbsp;" + val);
    boxHtml += "</dd>";
  }
  boxHtml += "</dl>";

  details.html(boxHtml);
  boxWidth = 390;
  boxHeight = 70 + (heatmap.cols.header.length * 20);


  var wHeight = $(document).height();
  var wWidth = $(document).width();

  details.css('left', boxLeft);
  details.css('top', boxTop);
  details.css('width', boxWidth);
  details.css('height', boxHeight);

  details.css('display', 'block');
  details.bind('click', function () {
    $(this).css('display', 'none');
  });
}

