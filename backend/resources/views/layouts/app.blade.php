<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'WorkDeskClip') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
        integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
    <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
    <script src="https://kit.fontawesome.com/8efc5cc454.js" crossorigin="anonymous"></script>
    <style>
        #app{
            max-width: 100vw;
            min-height: 100vh;
            position: relative;
            padding-bottom: 20vh;
            box-sizing: border-box;
        }
        body{
            background-color: #fff;
            color:#443311;
        }
        a {
            text-decoration: none;
            color:#443311;
            cursor: pointer;
        }
        a:hover{
            color:#443311;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div id="app">
        <header-component></header-component>
        <router-view></router-view>
        <footer-component></footer-component>

    </div>
    <script src="{{ mix('/js/app.js') }}" defer></script>
</body>

</html>