var hornetCtl = {
    init: function () {
        // get hornet version
        $('#statusLoading').show();
        var proc = cockpit.spawn(["hornet_status"])
        proc.done(function (data) {
            try{
                var statusData = JSON.parse(data)
                console.log(statusData)
                $('#hornetVersion').text(statusData.version)
                $('.hornetNetwork').text(statusData.networkType)
                $('#nodeStatus').text(statusData.node.status)
                $('#nodeSince').text(statusData.node.since)
                $('#hornetDashboardStatus').text(statusData.dashboardStatus)
            } catch (e) {
                console.log(e)
            } finally {
                $('#statusLoading').hide()
            }
        })
        proc.fail(function (err) {
            console.log(err)
        })
    },
    start: function () {
        var proc = cockpit.spawn(['systemctl', 'start', 'hornet'], {superuser:"require"})
        proc.done(function (data) {
            hornetCtl.init()
        })
        proc.fail(function (err) {
            console.log(err)
            $('#alertInfo').text('Something went wrong')
            $('#alertModal').modal()
        })
    },
    stop: function () {
        var check = confirm('Stop Hornet node');
        if(check) {
            var proc = cockpit.spawn(['systemctl', 'stop', 'hornet'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })
        }
    },
    networkSelect: function (network) {
        var check = confirm('Change Network to '+ network);
        if(check) {
            let networkArg = "-m"
            if(network === 'comnet') {
                networkArg = "-c"
            }
            var proc = cockpit.spawn("hornet_network", networkArg, {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })   
        }
    },
    enableDashboard: function () {
        var check = confirm('Enable Dashboard?');
        if(check) {
            var proc = cockpit.spawn("hornet_dashboard", "--on", {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })   
        }

    },
    disableDashboard: function () {
        var check = confirm('Disable Dashboard?');
        if(check) {
            var proc = cockpit.spawn("hornet_dashboard", "--off", {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })   
        }

    },
    cleanDB: function () {
        var check = confirm('Clean database?');
        if(check) {
            var proc = cockpit.spawn("hornet_clean_db", "-m", "-c", {superuser:"require"});
            proc.done(function () {
                console.log('here')
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })   
        }

    },
    snapshot: function () {
        var check = confirm('Snapshot Database?');
        if(check) {
            var proc = cockpit.spawn("hornet_clean_export", {superuser:"require"});
            proc.done(function () {
                console.log('here')
            })
            proc.fail(function (err) {
                console.log(err)
                $('#alertInfo').text('Something went wrong')
                $('#alertModal').modal()
            })   
        }

    }
}
