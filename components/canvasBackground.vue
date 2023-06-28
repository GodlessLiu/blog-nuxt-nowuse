<script setup lang="ts">
const el = ref<HTMLCanvasElement>()
onMounted(() => {
    let parent = document.querySelector(".canvas") as HTMLDivElement
    const canvas = el.value!
    let width = parent.clientWidth
    let height = parent.clientHeight
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgba(125,125,125,.3)"
    let Animation: number;
    const flowers = Array.from(new Array(200)).map(v => {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            speed: Math.random() + 0.5
        }
    })

    const render = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.beginPath()
        flowers.forEach(v => {
            v.y = v.y > height ? 0 : v.y + v.speed
            ctx.rect(v.x, v.y, 3, 3)
        })
        ctx.fill()
        Animation = requestAnimationFrame(render)
    }
    render()
})
</script>
<template>
    <canvas ref="el" id="canvas" class="dark:bg-black transition-all duration-1000">

    </canvas>
</template>


