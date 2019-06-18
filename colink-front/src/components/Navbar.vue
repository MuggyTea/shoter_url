<template>
    <nav class="nav-wrapper">
        <router-link class="left brand-logo" to="/">
            Vuesplash
        </router-link>
        <!-- <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a> -->
        <ul class="right hide-on-med-and-down">
            <li class="navbar__item">
                <a class="waves-effect waves-light btn">Create Links page</a>
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
