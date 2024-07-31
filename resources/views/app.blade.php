<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-core@latest/dist/core.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-utility@latest/dist/utility.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-document-normalizer@1.0.12/dist/ddn.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@latest/dist/cvr.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@3.2.0/dist/dce.js"></script>
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
