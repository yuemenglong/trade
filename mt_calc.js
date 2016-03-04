var common = require("../yy-common");
var logger = common.logger;
var fs = require("fs");

if (require.main == module) {
    if (process.argv.length !== 3) {
        console.error("Error Argv, Need File Path");
        return;
    }
    var filePath = process.argv[2];
    var content = fs.readFileSync(filePath).toString();
    var lines = content.match(/.+/g);
    var start = 2000;
    var win = 0;
    var loss = 0;
    var winTotal = 0;
    var lossTotal = 0;
    var max = start;
    var cur = start;
    var maxRetrace = 0;
    var curRetrace = 0;
    for (var i = 2; i < lines.length; i++) {
        var line = lines[i];
        var price = parseFloat(line.split(",").slice(-2)[0]);
        cur += price;
        if (cur > max) {
            max = cur;
        }
        curRetrace = 1 - cur / max;
        if (curRetrace > maxRetrace) {
            maxRetrace = curRetrace;
        }
        if (price > 0) {
            win++;
            winTotal += price;
        } else {
            loss++;
            lossTotal -= price;
        }
    }
    console.log("开仓次数");
    console.log(win + loss);
    console.log("胜率");
    console.log(win / (win + loss) * 100);
    console.log("单次盈亏比")
    console.log((winTotal / win) / (lossTotal / loss));
    console.log("盈亏比")
    console.log(winTotal / lossTotal);
    console.log("最大回撤");
    console.log(maxRetrace * 100);
    console.log("盈利");
    console.log((cur - start) / start * 100);
}
