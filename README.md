# Rallybus

This document is for getting started with the setup of the `React-Native` development environment

## Index
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Dependencies](#dependencies)


## Introduction
This product is based on `React-Native` by [Facebook](https://facebook.github.io/react-native). The stack comprises of `React-Native`, `React`, `Redux` and `Android SDK` and is geared towards the housekeeping staff for **Hostmaker**

## Prerequisites
To begin with you need to have the following depedencies installed

* [__NodeJs__](https://nodejs.org)
* __React-Native CLI__ (`npm install -g react-native-cli`)
* __Android SDK__ (_Refer to the [Getting started with Android](https://facebook.github.io/react-native/docs/getting-started.html#content) section_)
* __Android Emulator / Device__ ([_Genymotion_](https://www.genymotion.com/thank-you-freemium/)) Note: a hostmaker login exists in lastpass

### Installing Gapps

In order to install the app, you'll have to install gapps.  On Linux Mint,
the x86 version from (OpenGapps)[http://opengapps.org/] worked.  You may need
to additionally install a
(translation service)[https://filetrip.net/dl?4SUOrdcMRv] for ARM > x86/x86_64,
but for newer versions of andoird this should not be neccesary.

## Installation

* clone this repo: `git clone `
* Change to the project directory `cd rallybus`
* Install all the dependencies by doing `npm install`
* Connect a physical device, or boot up the emulator
* Make sure the emulator has __play services__ enabled ( [Get supported versions from OpenGapps](http://opengapps.org/) )
* Once the emulator / device is connected, do `npm run debug` from the project root

## Quick commands

* `npm start` or `react-native start`: Will start the React Native packager, wont do an android build
* `npm run debug` or `react-native run-android`: Starts the debug build process, will run the packager if not already running
* `npm run build`: Will build the app for release and will produce an APK under the `android/app/build/outputs/apk/app-release.apk`
* `npm run release`: Will install the already built release `apk` to the connected device or simulator.

## Dependencies

* [__Redux__](https://redux.js.org) for _App state management_
* [__Google play services__](http://opengapps.org/) for _Google Signin_
* [__React native google signin__](https://github.com/devfd/react-native-google-signin) for _Google login_
* [__React native vector icons__](https://github.com/oblador/react-native-vector-icons) for _Iconography_
* [__React native maps__](https://github.com/lelandrichardson/react-native-maps) for _Displaying maps_
* [__React native material kit__](https://github.com/xinthink/react-native-material-kit) for _material design form elements_
* [__React native popup menu__](https://www.npmjs.com/package/react-native-popup-menu) for _Dropdown and popup menus_
* [__React native image picker__](https://github.com/marcshilling/react-native-image-picker) for _accessing camera and gallery_