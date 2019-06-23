# Template Guide

## How to work

  Framework `func` will analyze all your classes, distinguish and run `Command` or `Option`,
All dirty work has been replaced by service `func-service`. You just need to focus on development.
  
  Want to learn more？You can try to read document [func](https://github.com/WittBulter/func#guide).

## Development

After running a command `npm start`, you can develop it.

## Bundle

Bundle automatically after running command `npm build`. 

Every time you run command `npm build`, your `bin` points to production, if you need to switch to development mode, run `npm start`.

## Release CLI

You just need to publish the contents of the `dist` folder.



