define(["require", "exports"], function (require, exports) {
    exports.styles = ".ListView-cell.odd .DetailRow{background:#EBF5FF}.DetailRow{overflow:hidden;height:30px;line-height:30px;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.DetailRow.isSelected{background:#0072c6;color:#fff}.DetailRow.isSelected .DetailRow-rowCheck{background-color:#0072c6;left:-2px}.DetailRow.isSelected .DetailRow-rowCheck:before{display:none}.DetailRow.isSelected .DetailRow-rowCheck:after{content:'\\e041';color:#fff;font-size:12px;position:absolute;left:4px;top:9px}.DetailRow.isSelected .icon{color:#fff}.DetailRow:not(.isSelected):hover{background:#f4f4f4}.DetailRow:not(.isSelected):hover .DetailRow-rowCheck:after{content:'\\e041';color:#eaeaea;font-size:12px;position:absolute;left:2px;top:9px}.DetailRow-cell{cursor:pointer;display:inline-block;vertical-align:top;padding:0 10px;outline:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.DetailRow-cell.icon{padding:0;height:30px;position:relative;color:#0072c6}.DetailRow-cell.icon:after{position:absolute;font-size:18px;top:6px}.DetailRow-cell.icon.folder:after{content:'\\e014'}.DetailRow-cell.icon.file:after{content:'\\e182'}.DetailRow:hover .DetailRow-rowCheck,.anySelected .DetailRow-rowCheck{opacity:1}.DetailRow-rowCheck{display:inline-block;opacity:0;width:20px;height:30px;position:relative;padding:0!important;margin:0 10px}.DetailRow-rowCheck:before{background:#fff;border:1px solid #a6a6a6;content:'';display:block;height:14px;left:0;position:absolute;top:6px;width:14px}";
});
