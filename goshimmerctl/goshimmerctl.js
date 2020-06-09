var goshimmerCtl = {
    init: function () {
        // get goshimmer version
        $('#statusLoading').show();
        var proc = cockpit.spawn(['goshimmerctl', 'status'], {superuser:"require"})
        proc.done(function (data) {
            try{
                var statusData = JSON.parse(data)
                $('#goshimmerVersion').text(statusData.version)
                $('#nodeStatus').text(statusData.node.status)
                $('#nodeSince').text(statusData.node.since)
                $('#goshimmerDashboardStatus').text(statusData.dashboardStatus)
                $('#dashboardLaunchBtn').data('port', statusData.dashboardPort)
                $('#dashboardLaunchBtn').data('status', statusData.dashboardStatus)
            } catch (e) {
                console.log(e)
            } finally {
                $('#statusLoading').hide()
            }
        })
        proc.fail(goshimmerCtl.failHandler) 
    },
    start: function () {
        var proc = cockpit.spawn(['goshimmerctl', 'node', 'on'], {superuser:"require"})
        proc.done(function (data) {
            goshimmerCtl.init()
        })
        proc.fail(goshimmerCtl.failHandler) 
    },
    stop: function () {
        var check = confirm('Stop GoShimmer node. Be patient and wait for Graceful Shutdown.');
        if(check) {
            var proc = cockpit.spawn(['goshimmerctl', 'node', 'off'], {superuser:"require"});
            proc.done(function () {
                goshimmerCtl.init()
            })
            proc.fail(goshimmerCtl.failHandler) 
        }
    },
    restart: function () {
        var check = confirm('Restart GoShimmer node');
        if(check) {
            var proc = cockpit.spawn(['systemctl', 'restart', 'goshimmer'], {superuser:"require"});
            proc.done(function () {
                goshimmerCtl.init()
            })
            proc.fail(goshimmerCtl.failHandler) 
        }
    },
    enableDashboard: function () {
        var check = confirm('Enable Dashboard?');
        if(check) {
            var proc = cockpit.spawn(['goshimmerctl', 'dashboard', 'on'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                goshimmerCtl.init()
            })
            proc.fail(goshimmerCtl.failHandler)    
        }

    },
    disableDashboard: function () {
        var check = confirm('Disable Dashboard?');
        if(check) {
            var proc = cockpit.spawn(['goshimmerctl', 'dashboard', 'off'], {superuser:"require"});
            proc.done(function () {
                console.log('here')
                goshimmerCtl.init()
            })
            proc.fail(goshimmerCtl.failHandler)    
        }

    },
    launchDashboard: function () {
        var dashboardEnabled = $('#dashboardLaunchBtn').data('status')
        var dashboardPort = $('#dashboardLaunchBtn').data('port')
        if(dashboardEnabled) {
            var url = window.location.protocol+'//'+window.location.hostname+':'+dashboardPort
            console.log(url)
            window.open(url)
        } else {
            alert('Dashboard not enabled')
        }

    },
    cleanDB: function () {
        var check = confirm('Clean database?');
        if(check) {
            var proc = cockpit.spawn(['goshimmerctl', 'cleandb'], {superuser:"require"});
            proc.done(function () {
                window.alert('Database clean successful')
            })
            proc.fail(goshimmerCtl.failHandler) 
        }

    },
    failHandler: function (err, data) {
        console.log(err, data)
        $('#alertInfo').text(err.message + "\n" + data)
        $('#alertModal').modal()
    }
}
