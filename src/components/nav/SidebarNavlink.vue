<script setup>
const props = defineProps({
    // Image asset for navlink
    navAsset: String,
    // Content for text
    textContent: String
})
</script>

<template>
  <div>
    <img :src="props.navAsset" :alt="props.textContent" />
    <a href="#">{{ props.textContent }}</a>
  </div>
</template>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 12px;
    &:hover {
        background-color: rgb(44, 44, 44);
        border-radius: 8px;
        cursor: pointer;
    }
    img {
        filter: invert(100%) grayscale(100%);
        height: 26px;
        width: auto;
    }
}
a {
    color: rgb(149, 149, 149);
    text-decoration: none;
    font-size: 20px;
    font-weight: 200;
}
</style>