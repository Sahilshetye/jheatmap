/**
 * Set aggregation sorter as default
 *
 * @example
 * new jheatmap.actions.AggregationSort(heatmap);
 *
 * @param heatmap   The target heatmap
 * @class
 */
jheatmap.actions.AggregationSort = function (heatmap) {
    this.heatmap = heatmap;
    this.shortCut = "A";
    this.keyCodes = [97, 65];
    this.title = "Sort by value aggregation";
    this.icon = "fa-sort";
};

jheatmap.actions.AggregationSort.prototype.rows = function() {
    var heatmap = this.heatmap;
    heatmap.cols.sorter.asc = !heatmap.cols.sorter.asc;
    if (heatmap.rows.selected.length == 0) {
        indices = heatmap.rows.order.slice(0);
    } else {
        indices = heatmap.rows.selected.slice(0);
    }
    heatmap.cols.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, heatmap.cols.sorter.asc, true, indices);
    heatmap.cols.sorter.sort(heatmap, "columns");
    heatmap.drawer.paint();
};

jheatmap.actions.AggregationSort.prototype.columns = function() {
    var heatmap = this.heatmap;
    heatmap.rows.sorter.asc = !heatmap.rows.sorter.asc;
    if (heatmap.cols.selected.length == 0) {
        indices = heatmap.cols.order.slice(0);
    } else {
        indices = heatmap.cols.selected.slice(0);
    }
    heatmap.rows.sorter = new jheatmap.sorters.AggregationValueSorter(heatmap.cells.selectedValue, heatmap.rows.sorter.asc, true, indices);
    heatmap.rows.sorter.sort(heatmap, "rows");
    heatmap.drawer.paint();
};

