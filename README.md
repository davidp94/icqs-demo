# icqs_demo

Welcome to your new icqs_demo project and to the internet computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with icqs_demo, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd icqs_demo/
dfx help
dfx config --help
```



### Quick start

```
sh seed.sh
```

Set the administrator to the principal of `whoami` in `icqs_demo` canister.

Set the writer to the principal of `icqs_demo_developer_canister`.

Set the worker to the principal of your worker (folder `/worker`) example `hvlee-by6ir-n75ah-5pxmf-7li2m-hswb4-433bs-3cto5-agelg-rc3et-6ae`


Go on the icqs_demo_developer_canister `candid` interface and register with a nickname and an email.

Set up the worker (see `worker/`)

Run it, you should receive new registration email after some time.