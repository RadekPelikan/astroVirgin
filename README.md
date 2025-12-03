# AstroVirgin project

A demo project for learning [Astro.build](https://astro.build/)


## Development

### 1. Setup pocketbase

> Download [pocketbase](https://pocketbase.io/docs/) <br/>
> Unzip pocketbase zip and put the executable in [db](./db) folder
> Start pocketbase server
> ```sh
> ./db/pocketbase serve 
> ```

### 2. Run astro dev server

> Change to [app](./app) folder
> ```sh
> cd app
> ```
> [Download bun](https://bun.com/docs/installation) if you don't have bun in shell
> Download npm dependencies
> ```sh
> bun ci
> ```
> > [Read here for explanation](https://github.com/oven-sh/bun/issues/5283)
>
> Run db server
> ```sh
> bun dev
> ```

