var hornetCtl = {
    init: function () {
        // get hornet version
        $('#statusLoading').show();
        var proc = cockpit.spawn(["hornet_status"])
        proc.done(function (data) {
            try{
                var statusData = JSON.parse(data)
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
        proc.fail(hornetCtl.failHandler) 
    },
    start: function () {
        var proc = cockpit.spawn(['systemctl', 'start', 'hornet'], {superuser:"require"})
        proc.done(function (data) {
            hornetCtl.init()
        })
        proc.fail(hornetCtl.failHandler) 
    },
    stop: function () {
        var check = confirm('Stop Hornet node');
        if(check) {
            var proc = cockpit.spawn(['systemctl', 'stop', 'hornet'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(hornetCtl.failHandler) 
        }
    },
    networkSelect: function (network) {
        var check = confirm('Change Network to '+ network);
        if(check) {
            var proc = cockpit.spawn(['hornet_network', '--'+network], {superuser:"require"});
            proc.done(function () {
                hornetCtl.init()
            })
            proc.fail(hornetCtl.failHandler)    
        }
    },
    enableDashboard: function () {
        var check = confirm('Enable Dashboard?');
        if(check) {
            var proc = cockpit.spawn(['hornet_dashboard', '--on'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(hornetCtl.failHandler)    
        }

    },
    disableDashboard: function () {
        var check = confirm('Disable Dashboard?');
        if(check) {
            var proc = cockpit.spawn(['hornet_dashboard', '--off'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                hornetCtl.init()
            })
            proc.fail(hornetCtl.failHandler)    
        }

    },
    cleanDB: function () {
        var check = confirm('Clean database?');
        if(check) {
            var proc = cockpit.spawn(['hornet_clean_db', '-m', '-c'], {superuser:"require"});
            proc.done(function () {
                window.alert('Database clean successfull')
            })
            proc.fail(hornetCtl.failHandler) 
        }

    },
    snapshot: function () {
        var check = confirm('Snapshot Database?');
        if(check) {
            var proc = cockpit.spawn('hornet_clean_export', {superuser:"require"});
            proc.done(function () {
                window.alert('Snapshot successfull')
            })
            proc.fail(hornetCtl.failHandler)   
        }
    },
    failHandler: function (err, data) {
        $('#alertInfo').text(err.message + "\n" + data)
        $('#alertModal').modal()
    }
}
