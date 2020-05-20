var hornetCtl = {
    init: function () {
        // get hornet version
        var proc = cockpit.spawn(["hornet", "--version"]);
        proc.done((data) => {
            $('#hornetVersion').text(data)
        }).fail((err) => {
            console.log('error')
            console.log(err)
        })
    },
    start: function () {
        var proc = cockpit.spawn("hornetctl", "--start", {superuser:"require"});
        proc.fail((data) => {

        });
    },
    stop: function () {

    },
    networkSelect: function (network) {

    },
    enableDashboard: function () {

    },
    disableDashboard: function () {

    },
    cleanDB: function () {

    },
    cleanSnapshot: function () {

    }
}
