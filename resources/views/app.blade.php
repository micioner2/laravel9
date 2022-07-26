<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <title>{{env('APP_NAME')}}</title>
    <link href="{{asset("assets/css/app.css")}}" type="text/css" rel="stylesheet"/>
</head>
@if (Auth::check())
<body class="hold-transition sidebar-mini layout-fixed">
    <script>
        window.Laravel = {!!json_encode([
            'isLoggedin' => true,
            'user' => Auth::user(),
            'csrf_token' => csrf_token()
        ])!!}
    </script>
</body>
@else
<body class="hold-transition login-page">
    <script>
        window.Laravel = {!!json_encode([
            'isLoggedin' => false
        ])!!}
    </script>
</body>
@endif
<div id="app"></div>
<script src="{{asset("assets/js/app.js")}}"></script>

</html>