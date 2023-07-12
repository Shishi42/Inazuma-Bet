const Discord = require("discord.js")

module.exports = {

  name: "refresh-bet",
  description: "Refresh the display of a bet",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: true,
  category: "Admin",
  options: [
    {
      type: "string",
      name: "id",
      description: "Id of the bet to refresh",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "all",
      description: "If you want to refresh all bets",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    let id = args.get("id") == "all" ? true : false

    if(args.get("id") == "all"){
      bets = await bot.Bets.findAll()
      for(bet of bets){
        await require(`../events/.postEmbed.js`).run(bot, bet, message.channel)
      }
    } else {
      let bet = await bot.Bets.findOne({ where: { bet_id: args.get("id").value }})
      if(!bet) return message.editReply("No bet with this ID.")
      require(`../events/.postEmbed.js`).run(bot, bet, null, true)
    }
    return message.reply({content: `Done.`, ephemeral: true})
  }
}