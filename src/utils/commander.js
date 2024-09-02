const { Command} = require("commander")
const program = new Command()

program
    .option("-p <port>","Puerto", 8080)
    .option("--mode <mode>", "modo de trabajo", "production")
program.parse()


module.exports = program;
