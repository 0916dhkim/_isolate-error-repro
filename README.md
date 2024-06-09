#### How to reproduce:

1. Run `pnpm i` at project root.
1. `cd packages/to-be-isolated`
1. `pnpm isolate`
1. `cd isolate`
1. `pnpm i` : This step is necessary for repro because we don't want packages to be resolved from `node_mdules` in parent directories.
1. `node main.js` : This results in `ERR_MODULE_NOT_FOUND`.

#### How to make it run correctly:

1. Run `pnpm i` at project root.
1. `cd packages/to-be-isolated`
1. `pnpm isolate`
1. `cd isolate`
1. Edit `/packages/to-be-isolated/isolate/pnpm-lock.yaml` file to be like this:

   ```yaml
   lockfileVersion: "9.0"

   importers:
     .:
       dependencies:
         "@internal/first":
           specifier: workspace:*
           version: link:./packages/first

     packages/first:
       dependencies:
         "@internal/second":
           specifier: workspace:*
           version: link:../second # FIXING THIS LINE.

     packages/second: {}
   ```

1. `pnpm i`
1. `node main.js` : This runs correctly.
