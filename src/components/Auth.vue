<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuth } from "@vueuse/firebase/useAuth";

const app = initializeApp({
  /* config */
});

const { isAuthenticated, user } = useAuth(getAuth(app));

const provider = new GoogleAuthProvider();
const signIn = () => signInWithPopup(provider);
</script>

<template>
  <pre v-if="isAuthenticated">{{ user }}</pre>
  <div v-else>
    <button @click="signIn">Sign In with Google</button>
  </div>
</template>
