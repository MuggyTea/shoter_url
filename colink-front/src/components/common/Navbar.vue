<template>
    <nav class="nav-wrapper">
        <router-link class="brand-logo" to="/">
            Co-Links
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li class="navbar__item">
                <router-link class="navbar__item" to="/page">
                <a class="waves-effect waves-light btn">Create Links page</a>
                </router-link>
            </li>
            <li class="navbar__item">
                username
            </li>
            <li class="navbar__item">
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </li>
        </ul>
        <ul class="sidenav" id="mobile-demo">
            <li class="navbar__item">
                <router-link class="navbar__item" to="/page">
                <a class="waves-effect waves-light btn">Create Links page</a>
                </router-link>
            </li>
            <li class="navbar__item">
                username
            </li>
            <li class="navbar__item">
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </li>
        </ul>
    </nav>

</template>
