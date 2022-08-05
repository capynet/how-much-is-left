<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@/firebase-bootstrap";
import { useAuth } from "@vueuse/firebase/useAuth";

const auth = getAuth(firebaseApp);
const { user } = useAuth(getAuth(firebaseApp));

const signOutHandler = () => signOut(auth);
</script>

<template>
  <div>
    {{ user.displayName }}
    <a href="#" @click.prevent="signOutHandler">Sign Out</a>
  </div>
</template>
