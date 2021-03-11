<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>TakuWaku</title>
    <!-- Styles -->
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
        integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
    <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
    
    <style>
        html{
            touch-action: manipulation;
        }
        #app{
            max-width: 100vw;
            min-height: 100vh;
            position: relative;
            padding-bottom: 18vh;
            box-sizing: border-box;
        }
        #wrapper{
            margin-top: 2rem;
        }
        body{
            background-color: #fff;
            color:#08415C;
        }
        a {
            text-decoration: none;
            color:#08415C;
            cursor: pointer;
        }
        a:hover{
            color:#08415C;
            text-decoration: none;
        }
        @media(max-width: 1000px){
            *:hover{
                opacity: 1.0;
            }
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