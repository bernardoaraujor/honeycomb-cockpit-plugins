var hornetCtl = {
    init: function () {
        // get hornet version
        $('#statusLoading').show();
        var proc = cockpit.spawn(["hornet_status"]);
        proc.done((data) => {
            try{
                var statusData = JSON.parse(data)
                $('#hornetVersion').text(statusData.version)
                $('#hornetNetwork').text(statusData.networkType)
            } catch (e) {
                console.log(e)
            } finally {
                // $('#statusLoading').hide()
            }
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
