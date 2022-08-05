<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const signIn = () => signInWithPopup(auth, provider);
</script>

<template>
  <button @click="signIn">Sign In with Google</button>
</template>
