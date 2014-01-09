
jheatmap.components.ShortcutsPanel = function(heatmap, container) {

    var actionTips = "";
    for (var key=0; key < heatmap.actions.length; key++) {
        var action = heatmap.actions[key];

        if (action.shortCut != undefined) {
            actionTips += "<dt>"+action.shortCut+"</dt><dd>"+action.title+"</dd>";
        }
    }

    container.append(
        "<div class='shortcuts'><a href='#heatmap-details' data-toggle='details'><i class='fa fa-question-circle'></i></a></div>" +
        "<div class='details hide' id='heatmap-details' tabindex='-1' role='dialog'>" +
        "<div class='details-header'><button type='button' class='close' data-dismiss='details'>&times;</button>" +
        "<h3>Keyboard shortcuts</h3></div>" +
        "<div class='details-body'>" +
        "<dl class='dl-horizontal'>" +
        "<dd><strong>Place the mouse over rows or columns and press the key:</strong></dd>" +
        actionTips +
        "</dl>" +
        "</div>" +
        "<div class='details-footer'>" +
        "<button class='btn' data-dismiss='details'>Close</button>" +
        "</div>" +
        "</div>"
        );

};