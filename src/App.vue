<script setup lang="ts">
import { RouterView } from "vue-router";
import GoogleUserSignIn from "@/components/GoogleUserSignIn.vue";
import { useAuth } from "@vueuse/firebase/useAuth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase-bootstrap";
const { isAuthenticated } = useAuth(getAuth(firebaseApp));
</script>

<template>
  <GoogleUserSignIn v-if="!isAuthenticated" />
  <RouterView v-if="isAuthenticated" />
</template>
