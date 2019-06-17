<template>
    <nav class="navbar">
        <router-link class="navbar__brand" to="/">
            Vuesplash
        </router-link>
        <div class="navbar__menu">
            <div class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add">
                        Submit a photo
                    </i>
                </button>
            </div>
            <span class="navbar__item">
                username
            </span>
            <div class="navbar__item">
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
