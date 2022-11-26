# About

## Why?

We have all heard about NFTs, all those pictures and their sales for impressive amounts. But blockchain is not only and not so much about trading, but about the data registry. Immutable, transparent, decentralized.

So, powerful things happen not only at the moment of sale, but also during ownership of the token.

I believe that at some point our passports will be minted into a blockchain, but now we can think about something more simple: train or conference tickets, online orders...
For all of this you can use blockchain tokens and check their availability when boarding, when pick up an order etc.


## How

Tokenpass provides such a checking tool.

1. The checker specifies the desired token
1. Connect link is generated
1. The checker shares it with his user
1. The user connects with his wallet (use [demo wallet](https://react-auth-wallet.walletconnect.com) to test)
1. Tokenpass checks the balance of the specified token and tells if the user owns the required amount!


### WalletConnect

An important step in the process is to allow the user to authenticate using only their wallet (on the phone or anywhere) without entering keys and passwords on a checking device.

Such feature is provided and framed in a convenient interface by [WalletConnect AuthClient](https://docs.walletconnect.com/2.0/javascript/auth/installation). It's just been released and there is no support from wallets _yet_, but you can test with [demo wallet](https://react-auth-wallet.walletconnect.com) for now.


### Available Chains

The list of available chains is dictated by [Infura provider](https://docs.infura.io/infura/networks/) now. Here's the list:

- :chain{id=1}
- :chain{id=5}
- :chain{id=11155111}
- :chain{id=42220}
- :chain{id=44787}
- :chain{id=137}
- :chain{id=80001}
- :chain{id=43114}
- :chain{id=43113}
- :chain{id=11297108109}
- :chain{id=11297108099}
- :chain{id=10}
- :chain{id=420}
- :chain{id=42161}
- :chain{id=421613}
- :chain{id=1313161554}
- :chain{id=1313161555}

So, yes, there's no BSC yet. But you can fork [the project](https://github.com/voire/tokenpass) and extend the used chains / RPCs, for example.


## See ya!

It was just one demo, but I have some more ideas in my head.

You can follow me by links below, if you want:

:social-link{site=github uri=https://github.com/pyncz}
:social-link{site=twitter uri=https://twitter.com/iampyncz}
