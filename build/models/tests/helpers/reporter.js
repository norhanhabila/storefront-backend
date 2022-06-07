"use strict";
const JasmineConsoleReporter = require("jasmine-console-reporter");
const reporter = new JasmineConsoleReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4,
    listStyle: "indent",
    timeUnit: "ms",
    timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
    activity: false,
    emoji: true,
    beep: true,
});
// pass the initialized reporter to whichever task or host...
jasmine.env.clearReporters();
jasmine.addReporter(reporter);
jasmine.execute();
