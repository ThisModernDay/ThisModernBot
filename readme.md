# ThisModernBot

ThisModernBot is an opensource twitch bot i started as a project to get me into live stream coding

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```BASH
git clone https://github.com/BrandonLeffew/ThisModernBot
npm install
```

you will also need to setup your own oAuth key for the account you want to run ThisModernBot under
1. Setup a new [Twitch](twitch.tv/signup) account specifically for your bot.
2. Once logged into your new twitch account goto [TMI oAuth Key Generator](https://twitchapps.com/tmi/) to generate an oAuth Key.
3. edit the oAuthPass.js file and paste your oAuth Key into the pass = "" field.

**Note: I use nodemon to make sure the bot stays up during development**

```
npm i nodemon -g
nodemon app.js
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Kudos goto [EddieJauode](https://github.com/eddiejaoude) for the push to start live coding again.
* Thanks to the support of the [TwitchCoders](https://discord.gg/8ffWxjk) discord
