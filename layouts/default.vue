<template>
  <LayoutHeader></LayoutHeader>
  <div class="canvas h-screen fixed pointer-events-none w-screen -z-50">
    <CanvasBackground></CanvasBackground>
  </div>
  <slot />
</template>
