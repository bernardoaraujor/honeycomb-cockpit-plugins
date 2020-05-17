This repository contains [Cockpit](https://cockpit-project.org/) plugins for honeycombOS.

It's designed to work with [nfpm](https://github.com/goreleaser/nfpm) CLI tool to create a `.deb.` package.

```
export HORNEYCOMB_COCKPIT_PLUGINS_VERSION=0.1
nfpm pkg -t honeycomb-cockpit-plugins_0.1_all.deb
```

